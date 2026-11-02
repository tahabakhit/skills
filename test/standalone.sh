#!/bin/sh
# Offline payload checks, including independent single-skill copies.
set -eu
root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
cd "$root"
scratch=$(mktemp -d)
trap 'rm -r -- "$scratch"' 0
trap 'exit 130' INT
trap 'exit 143' TERM
fail() { printf 'FAIL: %s\n' "$1" >&2; exit 1; }

check_folder() {
  folder=$1
  name=$2
  record="$folder/PROVENANCE.json"
  jq -e --arg name "$name" '.schemaVersion==1 and .name==$name
    and (.files|length)>0 and (.licenses|length)>0
    and ([.files[].path]|length)==([.files[].path]|unique|length)
    and all(.files[]; (.path|test("^[A-Za-z0-9_./-]+$"))
      and (.path|startswith("/")|not)
      and (.path|split("/")|index("..")|not)
      and (.gitBlob|test("^[0-9a-f]{40}$"))
      and (.sha256|test("^[0-9a-f]{64}$")))
    and all(.licenses[]; (.file|test("^[A-Za-z0-9_.-]+$")))' "$record" >/dev/null || fail "invalid provenance: $name"
  [ -z "$(find "$folder" -type l -print)" ] || fail "symlink in selectable folder: $name"
  jq -r '.files[].path' "$record" | sort > "$scratch/recorded"
  find "$folder" -type f | while IFS= read -r file; do
    path=${file#"$folder/"}
    [ "$path" = PROVENANCE.json ] || printf '%s\n' "$path"
  done | sort > "$scratch/actual"
  cmp "$scratch/recorded" "$scratch/actual" >/dev/null || fail "unrecorded/missing payload: $name"
  jq -r '.files[]|[.path,.sha256,.gitBlob]|@tsv' "$record" | while IFS="$(printf '\t')" read -r path sha blob; do
    [ "$(sha256sum "$folder/$path" | cut -d ' ' -f1)" = "$sha" ] || fail "SHA-256 mismatch: $name/$path"
    [ "$(git hash-object "$folder/$path")" = "$blob" ] || fail "Git blob mismatch: $name/$path"
  done
  jq -r '.licenses[]|[.file,.copyright]|@tsv' "$record" | while IFS="$(printf '\t')" read -r path copyright; do
    grep -Fq "$copyright" "$folder/$path" || fail "copyright missing: $name/$path"
    grep -Fq 'Permission is hereby granted, free of charge' "$folder/$path" || fail "MIT grant incomplete: $name/$path"
    grep -Fq 'THE SOFTWARE IS PROVIDED "AS IS"' "$folder/$path" || fail "MIT disclaimer missing: $name/$path"
  done
  find "$folder" -name '*.md' -type f | while IFS= read -r file; do
    links=$(grep -oE '\]\([^)]*\)' "$file" | cut -c 3- | tr -d ')' || true)
    for link in $links; do
      case "$link" in http:*|https:*|'#'*) continue ;; /*) fail "absolute Markdown target: $name/$link" ;; esac
      link=${link%%#*}
      [ -f "$(dirname "$file")/$link" ] || fail "missing isolated Markdown target: $name/$link"
      parent=$(CDPATH= cd -- "$(dirname "$file")/$(dirname "$link")" && pwd)
      case "$parent/" in "$folder/"*) ;; *) fail "Markdown target escapes folder: $name/$link" ;; esac
    done
  done
}

jq -r '.skills[].name' catalog.json | while IFS= read -r name; do
  folder="$root/$(jq -r --arg name "$name" '.skills[] | select(.name==$name) | .path' catalog.json)"
  check_folder "$folder" "$name"
  mkdir -p "$scratch/$name/skills"
  cp -R -- "$folder" "$scratch/$name/skills/"
  check_folder "$scratch/$name/skills/$name" "$name"
done
printf '%s independently copied skill folders passed file, SHA-256/blob, notice and Markdown-closure checks.\n' "$(jq '.skills | length' catalog.json)"
