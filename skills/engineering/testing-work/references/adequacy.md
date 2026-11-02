# Adequacy, properties and mutations

## Audit the claim, not the badge

For each material test claim, inspect its name, exercised path, substitutes and assertions. Identify a realistic defect that should make it fail. Then check whether that defect could still pass.

Common false confidence:

- A loop asserts properties of each row but never establishes that any row exists.
- Any exception is accepted, so an unrelated setup failure passes a rejection test.
- Expected output comes from the same helper or fake return value as actual output.
- The test replaces the database logic that its name claims to verify.
- An asynchronous assertion is not awaited or is conditional on the desired state already existing.
- A test checks a string in source while the claimed runtime behavior is never exercised.

A negative assertion against a synthetic secret in actual output tests leakage behavior. A semantic configuration policy can also be valuable when it expresses an independently required trust or routing constraint. Avoid mere mirrors of current literals, but do not discard useful policy or runner-integration tests solely because their input is YAML or JSON.

Report what the test does prove. A shallow presence test is not automatically vacuous. A mocked boundary may still cover its caller's branching. Distinguish insufficient proof, redundant proof, unreliable execution and no relevant assertion.

Do not delete similar tests until checking whether they exercise different routes, wiring, platforms or persistence guarantees. Sixty routes rejecting missing credentials are sixty boundary checks, even if one table can express them more clearly.

## Property testing

Choose a property with a meaningful restriction on behavior. State valid inputs and how the generator reaches them. Construct correlated valid inputs directly when possible. Excessive filtering can hide empty or rare execution.

Useful relations depend on the domain: sorted output preserves the input multiset, a parser consumes precisely the encoded value, or repeating a write with the same operation identity has one durable effect. Check that an incorrect implementation cannot satisfy the relation trivially.

Roundtrip alone can pass when an encoder and decoder swap the same fields. Idempotence alone accepts an identity function. Pair these properties with independent literal/specification fixtures and known edges. Track nonempty or otherwise required case execution so a generator cannot pass by avoiding the interesting domain.

Preserve the seed and minimized failure. Classify the counterexample before editing production code: invalid generator, false property, ambiguous specification or actual implementation defect. A shrinker can reveal an invalid assumption in the test.

## Mutation testing

Start with a bounded set of defects appropriate to the promised behavior. Examples include a reversed boundary comparison, dropped final item, omitted tenant filter or retry executed once too often. A general mutation engine is optional.

Check that the test fails for the intended reason on the defective variant and passes the known-correct variant. Collection failure or patch failure invalidates the experiment. A timeout is unresolved until its cause is understood.

For a surviving mutation, inspect types, reachability, callers and downstream use. Try a distinguishing valid input. If no observable behavior differs, record an equivalent or out-of-scope mutation with evidence instead of inflating the missing-coverage count. Uncertainty remains uncertainty.

## Output

Return the claim, tested boundary, independent expectation, defect rejected, execution evidence and remaining gap. Keep audit findings read-only unless changes were requested. A coverage percentage, assertion count or mutation score alone is not an acceptance decision.
