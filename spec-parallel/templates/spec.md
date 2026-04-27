## ADDED Requirements

### Requirement: <!-- requirement name -->
<!-- Normative behavior. Use SHALL/MUST. Keep user-visible behavior testable and unambiguous. -->

#### Scenario: <!-- scenario name -->
- **WHEN** <!-- condition or trigger -->
- **THEN** <!-- expected observable outcome -->

**Implementation Details**

- **File Modification Plan:** <!-- Files/modules to change, why each is touched, and files/modules to avoid. -->
- **Core Code Landing:** <!-- Primary functions, services, state/data flows, API handlers, or integration points where the behavior lands. -->
- **Component / Module Split:**
  - **Reuse:** <!-- Existing components/modules to reuse, with generic reason and constraints. -->
  - **New / Modified:** <!-- Components/modules to create or change, with responsibilities. -->
  - **Split / Merge:** <!-- Existing components/modules to split or merge, with boundary and rationale. -->
  - **Ownership Boundary:** <!-- Which component/module owns props, events, state, API calls, side effects, rendering, or shared logic. -->
  - **Dependency Direction:** <!-- Allowed dependency direction; avoid circular, sibling, or reverse dependencies. -->
  - **Task Slicing:** <!-- How the split maps to single-responsibility tasks without writing checkbox tasks here. -->
- **Impact Surface:** <!-- Affected APIs, data, state, compatibility, dependencies, users, operations, UI, tests, and regression areas where applicable. -->
- **Task Breakdown Guidance:** <!-- How this requirement should split into single-responsibility tasks. Do not write executable checkbox tasks here. -->

## MODIFIED Requirements

<!-- Copy the full existing requirement block, then edit it to reflect the new behavior. Add or update Implementation Details for the changed behavior. Remove this section if unused. -->

## REMOVED Requirements

<!-- Include Reason, Migration, File Modification Plan, Impact Surface, and Task Breakdown Guidance for each removed requirement. Remove this section if unused. -->

## RENAMED Requirements

<!-- Use FROM:/TO: format for name-only changes. Include Impact Surface if code, docs, tests, or references must change. Remove this section if unused. -->
