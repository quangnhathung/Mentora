# Junior Mobile Dev Guide — mtt-mobile-app

This guide is tailored to this React Native/Expo repo. It summarizes how the app is structured, how to add features safely, platform gotchas (web vs native), and concrete patterns pulled from the codebase.

---

## Project Overview

- Runtime: Expo SDK 52, React Native 0.76
- Router: `expo-router`
- Styling: `nativewind` + Tailwind utilities
- State: `zustand` (persisted to MMKV) + `@tanstack/react-query` (via `react-query-kit`)
- Animations: `react-native-reanimated`
- Gestures: `react-native-gesture-handler`
- Audio: `expo-audio` (iOS background audio enabled)
- i18n: `i18next` + `react-i18next`
- Testing: Jest + Maestro

Useful files:

- package.json: scripts, libs
- app.config.ts: app metadata and iOS background audio
- tailwind.config.js, global.css: design system integration

---

## Folder Structure (Feature‑Sliced)

- `src/app`: Routed screens (expo-router). Compose widgets/features here only.
- `src/entities`: Domain models, types, API modules, and state stores.
- `src/features`: Business interactions that combine entities (e.g., onboarding flow).
- `src/widgets`: Reusable UI compositions rendered by screens.
- `src/shared`: Shared UI kit, API client, hooks, utils, i18n, storage, theming.

Read:

- docs/architecture.md — explains entities → features → widgets → app flow

---

## State & Data

- Client state: per-entity Zustand stores, persisted with MMKV
  - Example store: `src/entities/path/usePathStore.tsx`
- Server state: React Query hooks (often created with `react-query-kit`)
  - Example query: `src/entities/path/model.ts`
- API client: centralized under `src/shared/api/**`

Tips:

- Keep store state minimal; derive UI state inside widgets when possible.
- Don’t put large data blobs in MMKV; use React Query cache.

---

## UI & Styling

- Use `className` with NativeWind for styling; avoid inline styles unless dynamic platform rules.
- Merge external classes via `twMerge` when composing components.
- Shared UI components live in `src/shared/ui`. Import from `@/shared/ui` (aggregator in `index.tsx`).
- New shared component: `PagingDots` (progress dots for pagers)
  - File: `src/shared/ui/PagingDots.tsx`
  - Exported via `@/shared/ui`
  - Provides scrollable dots if steps > 8, 40×40 hit targets, a11y labels

---

## Navigation & Layout Patterns

- Screen wrapper: `src/shared/ui/screen.tsx` handles SafeArea, error boundary, toast.
- Two‑section pages: `src/shared/ui/layouts/sections/TwoSectionHeader.tsx` renders a header and a body.
  - It can optionally wrap Body with a vertical `ScrollView` when `scrollable` is true.

---

## Lists, Scrolling, and Web Differences

Common issues are double nested scroll and absolute footers on web.

- Avoid double vertical scroll (ScrollView wrapping another vertical scroller). It breaks footer positioning on web.
- For sticky footers:
  - Native: `position: absolute` inside the screen container
  - Web: use `position: fixed` (viewport anchored) and add bottom padding to the scroller to prevent overlap
- If an inner list shouldn’t capture page scroll on web, set its `scrollEnabled={Platform.OS !== web}` and let the page scroll.

References:

- Lesson page: `src/app/(tabs)/(lesson)/[lid].tsx:1`
- Pager: `src/widgets/lesson/ExercisePager.tsx:1`
- Dialog list: `src/widgets/exercise/ExerciseDialog.tsx:1`

---

## Audio

- Player: `expo-audio`. A single player instance per pager page is used.
- Background audio (iOS) is enabled in `app.config.ts`.
- When playing TTS or clips, replace the source, `seekTo(0)`, and track `currentTime` into a shared value for karaoke word highlighting.

Reference:

- `src/widgets/lesson/ExercisePager.tsx:1` (sets up the player and play function)

---

## Internationalization

- Libraries: `i18next`, `react-i18next`
- Use `<Text>` from shared UI and `translate()` helper
- Keep translation strings under `src/translations` (lint available: `lint:translations`)

References:

- `src/widgets/**` usage of `translate()`

---

## Performance Tips

- Prefer FlatList/FlashList for large vertical lists; avoid ScrollView with many children.
- Memoize heavy render items; avoid recreating anonymous callbacks deep in trees.
- Reanimated for frequent color/opacity updates (e.g., karaoke highlighting).
- React Query: keep keys stable and minimal; consider cache time and stale time.

---

## Testing

- Unit tests with Jest (`pnpm test` / `test:watch`)
- E2E with Maestro (`pnpm e2e-test`) — includes device automation flows
- Use feature flags for experimental endpoints and UI

---

## Adding a New Feature — Checklist

1. Define types and (if needed) API DTOs in `src/entities/<entity>/types.ts` and `src/entities/<entity>/api.ts`.
2. Add React Query hooks to fetch/post data in `src/entities/<entity>/model.ts`.
3. If you need client state, create a small Zustand store under `src/entities/<entity>/use<Entity>Store.tsx` and persist if appropriate.
4. Build UI under `src/widgets/<area>` using shared components and NativeWind classes.
5. Compose into a screen under `src/app/**` via expo-router.
6. i18n: route user-facing strings through translation keys.
7. Web: verify scroll and footer behavior; add bottom padding if using a sticky footer.
8. Tests: add Jest test; if the user journey is important, a Maestro flow.

---

## Common Pitfalls & Fixes

- Symptom: Footer button disappears or scrolls away on web
  - Fix: use `position: fixed` on web and add bottom padding to the scroll container; keep `absolute` on native.
- Symptom: Page does not scroll on web
  - Fix: ensure only one vertical scroller is active; disable inner list scroll on web when the outer page should scroll.
- Symptom: Content stretches taller than items
  - Fix: remove `contentContainerStyle={{flex: 1}}` or `flexGrow` forcing height; let content size dictate height.

---

## Code References (start lines)

- Lesson screen with header/body layout: `src/app/(tabs)/(lesson)/[lid].tsx:1`
- Pager (horizontal) + footer button: `src/widgets/lesson/ExercisePager.tsx:1`
- Exercise dialog (words + translation buttons): `src/widgets/exercise/ExerciseDialog.tsx:1`
- Shared Screen wrapper: `src/shared/ui/screen.tsx:1`
- TwoSectionHeader layout: `src/shared/ui/layouts/sections/TwoSectionHeader.tsx:1`
- PagingDots component: `src/shared/ui/PagingDots.tsx:1`
- Zustand store example: `src/entities/path/usePathStore.tsx:1`
- React Query example: `src/entities/path/model.ts:1`

---

## Developer Workflow

- Scripts: `pnpm start`, `pnpm web`, `pnpm android`, `pnpm ios`
- Lint/type/test: `pnpm check-all`
- E2E: `pnpm e2e-test` (requires Maestro)
- Env: use `APP_ENV` variants for dev/staging/prod builds

---

## Final Advice

- Keep logic where it belongs (entities → features → widgets → app). Reuse shared UI.
- Be mindful of platform differences (web vs native) with scroll and positioning.
- Keep client light; stream heavy AI results from a backend; cache smartly with React Query.
- Always test a screen on Web and at least one native platform before shipping.
