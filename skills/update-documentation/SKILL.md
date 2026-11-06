---
name: update-documentation
description: Maintain engineering documentation by extracting durable, repository-wide principles from implementation work. Use when adding, revising, or reviewing coding guides, architecture notes, contribution docs, or other software-engineering documentation.
---

# Update Documentation

Update documentation to preserve reusable engineering knowledge, not a narrative of the current change.

## Workflow

1. Read the surrounding section and search for existing guidance on the same topic.
2. Identify the durable problem the change revealed and the general principle that prevents it.
3. Write the smallest actionable rule that applies beyond the current feature.
4. Match the repository's existing terminology, tone, headings, and naming conventions.
5. Remove implementation-specific details unless they are required to apply the rule.
6. Check that the new guidance does not duplicate, contradict, or over-specify nearby guidance.
7. Review the final diff as documentation: it should remain useful if the current implementation is replaced.

## Generalization test

Before adding a note, ask:

- Would this still be true for a different feature or implementation?
- Does it describe a principle, or merely record what we happened to do?
- Could a future engineer apply it without knowing this conversation?
- Is the wording broad enough to remain useful, but specific enough to change behavior?

If the note fails these tests, generalize it or do not add it.

## Naming and organization

- Use the vocabulary already established by adjacent documentation and code.
- Keep names consistent with surrounding abstractions.
- Name files after the primary logic or object they contain.
- Split documentation only when the responsibilities are meaningfully distinct.

## Quality bar

Prefer short rules with clear consequences. Use examples only when they clarify a principle that prose cannot. Do not add speculative architecture, temporary debugging details, or a changelog entry disguised as guidance.
