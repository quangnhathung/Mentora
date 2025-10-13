# Architecture Overview

Generated from a Gemini codebase analysis of this repository.

## Summary

- Stack: React Native + Expo (TypeScript), NativeWind/Tailwind, PNPM, ESLint/Prettier.
- Architecture: Feature-Sliced Design (FSD) with clear layering for app/pages, widgets, features, entities, shared.
- Tooling: Jest (unit/component), Maestro (E2E), EAS (build/deploy), Expo Router, Husky + lint-staged, Commitlint.

## Key Structure

- App shell and routing: `src/app/_layout.tsx`, `src/app/(auth)`, `src/app/(tabs)`, `src/app/[...missing].tsx`
- Layers: `src/features`, `src/widgets`, `src/entities`, `src/shared`
- Native projects: `android/`, `ios/`
- Config: `app.config.ts`, `eas.json`, `metro.config.js`, `tailwind.config.js`, `tsconfig.json`, `babel.config.js`
- Scripts: `scripts/`
- Assets: `assets/`
- Docs: `README.md`

## Navigation

- Expo Router with filesystem-based routes.
- Tabs and auth route groups under `src/app/(tabs)` and `src/app/(auth)`.

## State and Data

- Likely Zustand stores per-entity (naming pattern: `use<Entity>Store.ts`).
- API client in `src/shared/api/`; entity-scoped API modules (e.g., `src/entities/<entity>/api.ts`).

## Build and CI/CD

- EAS profiles and build configuration in `eas.json`.
- App configuration and plugins in `app.config.ts`.
- GitHub Actions workflows for build, test, lint, and E2E (conventional setup).

## Native Integrations

- Bare workflow present (`android/`, `ios/`).
- Typical modules used: fast storage (MMKV), animations (Rive/Lottie), keyboard handling, safe area.

## Environment and Configuration

- Multiple `.env.*` variants loaded via `env.js`.
- Expo app config reads env for metadata and plugins via `app.config.ts`.

## Testing

- Unit/component: Jest (`jest.config.js`, `jest-setup.ts`).
- E2E: Maestro flows under `.maestro/` (e.g., auth scenarios in YAML).
- Static checks: TypeScript + ESLint + CI workflows.

## Scripts and Automation

- Package scripts in `package.json` (start, test, lint, build, etc.).
- Helper scripts in `scripts/` (e.g., APK generation, i18n syntax validation).
- Husky hooks and lint-staged pre-commit; Commitlint for commit messages.

## Risks and Considerations

- FSD learning curve for new contributors.
- Native dependency and Expo SDK upgrade coordination required.
- Distributed configuration surface across EAS, env files, and app config.
- CI workflows require maintenance to remain fast and reliable.

## Onboarding Steps

1. Install dependencies: `pnpm install`.
2. Configure env: copy `.env.development` to a local env and fill secrets.
3. Run the app: `pnpm start` (Metro + Expo).
4. Explore routes starting at `src/app/_layout.tsx`.
5. Review FSD layers under `src/` (`features`, `entities`, `widgets`, `shared`).
6. Run tests: `pnpm test`; set up Maestro for E2E when needed.

## Source Deep Dive (src)

### Source Layout

- `src/app`: App shell, providers, Expo Router routes and layouts.
- `src/widgets`: High-level UI composites (auth, mission, leaderboard, community, etc.).
- `src/features`: User-facing functionality slices (auth, checkin, onboarding, profile, mission, etc.).
- `src/entities`: Business entities + stores + APIs (user, post, mission, lesson, topic, unit, etc.).
- `src/shared`: UI kit, API client, utils, constants, context/providers, theme, types.

### Main Libraries (Main Pack)

- Routing: `expo-router` (filesystem routes under `src/app`).
- Client state: `zustand` (+ optional `immer`), persisted with `react-native-mmkv`.
- Server state: `@tanstack/react-query` and its wrapper react-query-kit@v3.3.1 (query client provided at app root).
- Styling: `nativewind` + `tailwindcss` (see `tailwind.config.js`).
- UI kit: Custom components under `src/shared/ui` (buttons, inputs, cards, typography, screen wrappers).
- i18n: `i18next` + `react-i18next` (init under `src/shared/lib/i18n`).
- Animation: `moti` (mocked for tests in `__mocks__`).

### Key Components and Modules

- App composition: `src/app/_layout.tsx`
- Auth: `src/features/auth`, `src/widgets/auth`, routes under `src/app/(auth)`
- Tabs/Main area: `src/app/(tabs)/_layout.tsx` (+ screens within `src/app/(tabs)`)
- Missions/Feed: `src/widgets/mission`, `src/entities/mission`, `src/entities/post`
- Shared UI kit: `src/shared/ui` (buttons, inputs, cards, typography, wrappers)
- API client: `src/shared/api` (base client, interceptors); entity APIs co-located (e.g., `src/entities/<entity>/api.ts`)

### State and Data Flow

- Client state: Entity-scoped Zustand stores (e.g., `useUserStore`, `useMissionStore`), persisted to MMKV.
- Server state: React Query hooks call entity APIs (e.g., `src/entities/post/api.ts`) and cache results.
- Composition: Widgets/features consume hooks + stores; screens under `src/app` assemble pages.

### Critical Coding Flows

- Authentication: Root layout checks auth store → unauthenticated routes in `src/app/(auth)` → login widgets/features → persist token → navigate to tabs.
- Onboarding: `src/app/onboarding.tsx` + `src/features/onboarding` → mark complete → navigate to main tabs.
- Feed/Missions: Tabs layout → screen hooks trigger React Query → render widgets with cached data → optimistic updates via stores where needed.
- Profile: `src/features/profile` + `src/widgets/profile` use user store and update APIs.

### Cross-Cutting Concerns

- Theme: Providers/hooks under `src/shared/context` and `src/shared/lib` integrate with NativeWind for light/dark.
- Internationalization: Init and resources under `src/shared/lib/i18n` consumed across features/widgets.
- Error handling and logging: Error boundary from app layout; Reactotron devtools under `devtools` (including Zustand tracking).
- API abstraction: Centralized HTTP in `src/shared/api` with entity-specific modules; components stay data-source agnostic.

### Developer Workflow Pointers

- Follow FSD boundaries: place code in `entities` → `features` → `widgets` → `app` layers appropriately.
- Client state in entity stores; server data via React Query + entity API modules.
- Create reusable primitives in `src/shared/ui`, compose in features/widgets, render via routes in `src/app`.
- Cover new modules with Jest tests; model critical user journeys with Maestro E2E flows.

## UI Reuse Guide (src/shared/ui)

### How To Reuse Components

- Import from the aggregator: `import { Button, Input, Modal, List, Text } from '@/shared/ui'` (`src/shared/ui/index.tsx`).
- Buttons (`src/shared/ui/button.tsx`): `label`, `variant` (`default|secondary|outline|destructive|ghost|link`), `size` (`default|lg|sm|icon`), `loading`, `disabled`, `fullWidth`.
  - Example: `<Button label="Save" variant="default" size="lg" onPress={...} />`
- Inputs (`src/shared/ui/input.tsx`):
  - Uncontrolled: `<Input label="Email" icon="email" onChangeText={...} error={...} />`
  - With RHF: `<ControlledInput name="email" control={control} rules={{ required: '...' }} />`
- Text + i18n (`src/shared/ui/text.tsx`, `src/shared/lib/i18n/i18n.ts`): `<Text tx="profile.title" />` or `txRich` for links.
- Lists (`src/shared/ui/list.tsx`): `<List data={items} renderItem={...} estimatedItemSize={56} />`; use `EmptyList`/`EmptyData` for states.
- Modal bottom sheet (`src/shared/ui/modal.tsx`): `const { ref, present, dismiss } = useModal(); <Modal ref={ref} title="...">...</Modal>`.
- Progress (`src/shared/ui/progress-bar.tsx`): `ref.setProgress(percent)`.
- Compound controls (`src/shared/ui/checkbox.tsx`): `<Checkbox label="Accept" checked={v} onChange={setV} />` (also `Radio`, `Switch`).
- Screen wrapper (`src/shared/ui/screen.tsx`): Wrap new screens for safe areas, error boundary, toast.

### Add or Extend a Shared Component

1. Create file under `src/shared/ui/<name>.tsx`.
2. Define props; expose variants via `tailwind-variants` (`tv`) with `variants/defaultVariants` and slots.
3. Style via NativeWind classes; merge external classes with `twMerge`.
4. Composition: prefer compound pattern for complex widgets (see `checkbox.tsx`).
5. Accessibility: add `accessibilityRole`, `accessibilityLabel`, `hitSlop`, focus/disabled states.
6. i18n: route user-facing strings through `<Text tx>` or `translate()`.
7. Export from `src/shared/ui/index.tsx`.
8. Tests: add `<name>.test.tsx` (see existing `button.test.tsx`, `input.test.tsx`).

### Do / Don't

- Do import only from `@/shared/ui` to keep callsites consistent.
- Do add variants instead of forking near-duplicate components.
- Do wrap screen roots with `Screen` and compose UI from `features`/`widgets`.
- Do use `ControlledInput` with `react-hook-form` for forms and `zod` for schema.
- Don't use inline styles; prefer `className` with NativeWind.
- Don't introduce ad-hoc colors; extend `src/shared/ui/colors.js` and Tailwind config.
- Don't bypass dark mode; verify classes handle `dark:` states.

### Checklist

- Import via `@/shared/ui` aggregator.
- Props and variants defined with `tv`; `className` supported and merged.
- a11y labels/roles set; dark mode verified.
- i18n covered (`Text tx` / `translate`).
- Exported in `src/shared/ui/index.tsx`; tests added.

### Quick References

- Aggregator: `src/shared/ui/index.tsx`
- Buttons: `src/shared/ui/button.tsx`
- Inputs: `src/shared/ui/input.tsx`
- Lists: `src/shared/ui/list.tsx`
- Modal: `src/shared/ui/modal.tsx`
- Text/i18n: `src/shared/ui/text.tsx`, `src/shared/lib/i18n/i18n.ts`
- Screen: `src/shared/ui/screen.tsx`
- Colors: `src/shared/ui/colors.js`
- Icons: `src/shared/ui/icons/index.tsx`
