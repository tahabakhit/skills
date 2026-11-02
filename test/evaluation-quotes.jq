def norm: gsub("\\s+"; " ") | sub("^ "; "") | sub(" $"; "");
[
  $packet[0][] as $p |
  $grades[0][] | select(.id==$p.answerId) | . as $g |
  {id:$g.id,
   validShape: (($g.met|length)==($p.expected_observations|length) and
     ($g.evidence|length)==($p.expected_observations|length) and
     ($g.failure|length)==($p.failure_checks|length) and
     ($g.failureEvidence|length)==($p.failure_checks|length) and
     all($g.met[]; type=="boolean") and all($g.failure[]; type=="boolean")),
   badQuotes: [range(0; $g.met|length) as $i |
     select(($g.met[$i] and (($g.evidence[$i]//"")|length)==0) or
       ((($g.evidence[$i]//"")|length)>0 and (($p.answer|norm)|contains($g.evidence[$i]|norm)|not))) |
     {kind:"observation",index:$i,quote:$g.evidence[$i]}] +
     [range(0; $g.failure|length) as $i |
     select(($g.failure[$i] and (($g.failureEvidence[$i]//"")|length)==0) or
       ((($g.failureEvidence[$i]//"")|length)>0 and (($p.answer|norm)|contains($g.failureEvidence[$i]|norm)|not))) |
     {kind:"failure",index:$i,quote:$g.failureEvidence[$i]}]
  }
]
