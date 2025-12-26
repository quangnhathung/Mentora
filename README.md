<p align="center">
    <img alt="React Native Template Obytes" src="https://github.com/obytes/react-native-template-obytes/assets/11137944/a8163d23-897a-4efe-91ce-b9bf7348c18f" width="200" />
</p>

<h1 align="center">
  Mentora Mobile App
</h1>

![expo](https://img.shields.io/github/package-json/dependency-version/obytes/react-native-template-obytes/expo?label=expo) ![react-native](https://img.shields.io/github/package-json/dependency-version/obytes/react-native-template-obytes/react-native?label=react-native)

📱 A template for your next React Native project 🚀, Made with developer experience and performance first: Expo, TypeScript, TailwindCSS, Husky, Lint-Staged, expo-router, react-query, react-hook-form, I18n.

## 📚 Documentation

- Architecture & UI Reuse Guide: see `architecture.md` (includes a UI Reuse Guide for `src/shared/ui`)

## ⭐ Key Features

- ✅ Latest Expo SDK with Custom Dev Client: Leverage the best of the Expo ecosystem while maintaining full control over your app.
- 🎉 [TypeScript](https://www.typescriptlang.org/) for enhanced code quality and bug prevention through static type checking.
- 💅 Minimal UI kit built with [TailwindCSS](https://www.nativewind.dev/), featuring common components essential for your app.
- ⚙️ Multi-environment build support (Production, Staging, Development) using Expo configuration.
- 🦊 Husky for Git Hooks: Automate your git hooks and enforce code standards.
- 💡 Clean project structure with Absolute Imports for easier code navigation and management.
- 🚫 Lint-staged: Run Eslint and TypeScript checks on Git staged files to maintain code quality.
- 🗂 VSCode recommended extensions, settings, and snippets for an enhanced developer experience.
- ☂️ Pre-installed [Expo Router](https://docs.expo.dev/router/introduction/) with examples for comprehensive app navigation.
- 💫 Auth flow implementation using [Zustand](https://github.com/pmndrs/zustand) for state management and [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) for secure data storage.
- 🛠 10+ [Github Actions](https://github.com/features/actions) workflows for building, releasing, testing, and distributing your app.
- 🔥 [React Query](https://react-query.tanstack.com/) and [axios](https://github.com/axios/axios) for efficient data fetching and state management.
- 🧵 Robust form handling with [react-hook-form](https://react-hook-form.com/) and [zod](https://github.com/colinhacks/zod) for validation, plus keyboard handling.
- 🎯 Localization support with [i18next](https://www.i18next.com/), including Eslint for validation.
- 🧪 Unit testing setup with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- 🔍 E2E testing capabilities with [Maestro](https://maestro.mobile.dev/) for comprehensive app testing.

## How to start

### Run the project

> pnpm start

### Build the project

> pnpm prebuild

> pnpm android

> pnpm ios

> pnpm web

> pnpm exec expo install --check

### Build APK Local

> pnpm prebuild

> pnpm build:local:android

### Release EAS

> npm install -g eas-cli

> pnpm prebuild:development

> pnpm build:development:android

### Quick FSD Cheat-Sheet — When to create **entities**, **features**, **widgets**, **processes**, or **shared**

| Goal / What you need                            | Folder to create        | Rationale (1-line)                                                 |
| ----------------------------------------------- | ----------------------- | ------------------------------------------------------------------ |
| **Global helpers, constants, primitive UI**     | `shared/`               | Truly cross-cutting; zero domain logic.                            |
| **Store & share domain state**                  | `entities/<name>/model` | Single “source of truth” (slice / selectors, CRUD adapters).       |
| **Render a domain object**                      | `entities/<name>/ui`    | UI tied 1-to-1 with the entity (e.g. `<UserAvatar/>`).             |
| **Perform one reusable action** (login, like …) | `features/<action>/`    | Hook + tiny UI; may mutate an entity; reusable in many screens.    |
| **Assemble a reusable UI block**                | `widgets/`              | Pure layout that composes features & entity-UI                     |
| **Handle a multi-step/business flow**           | `processes/<flow>/`     | Orchestrates several screens/features (e.g. Onboarding, Checkout). |

#### Summary

- shared 👉 Global ui, api client, constants, theme/layout, translation, utils,...
- entities 👉 “Đối tượng (model), trạng thái (storage), api fetch”
- features 👉 “Tác vụ/nghiệp vụ nhỏ, call N-entity”
- widgets 👉 “Khối giao diện tổng hợp”
- processes 👉 (deprecated) Nhiều bước (multi-step) / nhiều màn (multi-screen) / phức hợp (multi-state) → processes/

### Project Structure

```
pages (app/) → processes (deprecated/optional) → widgets → features → entities → shared

├── src/
│   ├── app/                 # File-based routing
│   │   ├── (tab)/           # React-Navigation stacks, tabs
│   │   └── onboarding.tsx   # page
│   │   └── home.tsx   # page
│   │
│   ├── shared/              # code dùng lại KHÔNG phụ thuộc miền nghiệp vụ
│   │   ├── api/             # axios → svc layer
│   │   ├── ui/              # button, input, modal (design-system)
│   │   ├── lib/             # helpers: date, number, i18n, mmkv (storage)
│   │   ├── hooks/           # useDebounce, useDeviceLayout…
│   │   └── types/           # DTO chung, Result<T>, Enum…
│   │
│   ├── entities/            # mỗi “thực thể” cốt lõi (User, Post, Chat…)
│   │   ├── user/
│   │   │   ├── model/       # slice, selectors
│   │   │   ├── api/         # /me, /users/:id
│   │   │   └── ui/          # <UserAvatar/>, <UserBadge/>
│   │   └── post/
│   │       └── …
│   │
│   ├── features/            # actions nghiệp vụ nhỏ, tái sử dụng ở nhiều pages/widget
│   │   ├── auth-login/
│   │   │   ├── model/       # mutation, form logic
│   │   │   └── ui/          # <LoginForm/>
│   │   ├── settings-changeTheme/
│   │   └── feed-likeToggle/
│   │
│   ├── widgets/             # khối giao diện hoàn chỉnh, không logic sâu, tái sử dụng ở nhiều pages
│   │   ├── Header/
│   │   ├── PostCard/
│   │   └── BottomTabBar/
│   │
│   └── processes/           # luồng phức hợp (Onboarding, AuthFlow, Payment Checkout)
│       └── onboarding/
│       └── payment-checkout/
│       └── auth/            # StepLogin → StepOTP → StepDone
│           └── …            # stepper, state machine
│
└── package.json
```

### ❓ FAQ

#### What is Widget?

> • Widget = một khối giao diện tái-sử-dụng (đủ bố cục, style, animation) nhưng không chứa logic nghiệp vụ phức tạp.

> • Nó có thể dùng các feature-component (để bấm Like, Share…) và entity-component (UserAvatar, PriceTag…) nhưng không trực tiếp gọi API, không nắm state toàn cục

```
PostCard           SearchBar           BottomTabBar
└─ Avatar          └─ Input            └─ TabButton
└─ LikeButton      └─ Filters…
```

#### Store/State/Query

- useState 👉 đơn giản, cục bộ, unmount là quên (single component/ same tree component).
- Zustand 👉 chia sẻ client-only state, UI flags, không fetch.
- React Query 👉 server state: fetch, cache, retry, GC, invalidation.

| **Câu hỏi**                                            | **Chọn**                                               |
| ------------------------------------------------------ | ------------------------------------------------------ |
| “Dữ liệu này có đến từ API không?” → **Có**            | React Query                                            |
| “Không từ API nhưng nhiều component cần đọc/ghi?”      | Zustand                                                |
| “Chỉ 1 component xài, unmount là quên?”                | useState                                               |
| “Cần lưu qua reload?”                                  | Zustand + persist **hoặc** React Query + query-persist |
| “Phải optimistic update, pagination, infinite-scroll?” | React Query                                            |
| “Chỉ là flag UI, theme, dialog?”                       | Zustand **hoặc** useState                              |

```
Navbar
 ├─ ThemeToggle  ← useZustand(theme)
 └─ UserMenu
       └─ Avatar   ← useCurrentUser()  (React Query)
BlogPage
 ├─ PostsList     ← useInfiniteQuery(['posts'])
 └─ LikeButton    ← useMutation(likePost)
LoginModal
 ├─ EmailInput    ← useState(email)
 └─ SubmitBtn     ← useLogin() + closeModal() (Zustand action)
```

#### Entity vs Feature

- Entities: Đại diện cho các thực thể kinh doanh cốt lõi (business entities) của ứng dụng, ví dụ: User, Product, Order. Đây là các đối tượng mang dữ liệu và hành vi liên quan đến nghiệp vụ, được sử dụng chung giữa nhiều tính năng.

  - Đặc điểm:
    Là danh từ (noun), ví dụ: User, Cart, Invoice.
    Thường có cấu trúc dữ liệu cố định (schema, type) và đôi khi đi kèm các API hoặc logic nghiệp vụ cụ thể (như updateUser, calculateTotalPrice).
    Không phụ thuộc vào một tính năng cụ thể mà được tái sử dụng ở nhiều nơi.

- Features: Là các tính năng hoặc flow cụ thể của ứng dụng, ví dụ: Authentication, Onboarding, Checkout. Đây là các module xử lý logic nghiệp vụ hoặc giao diện người dùng cho một chức năng cụ thể.

  - Đặc điểm:
    Là hành vi hoặc quy trình (process/flow), ví dụ: đăng nhập, hoàn thành onboarding, đặt hàng.
    Thường bao gồm giao diện (UI), logic xử lý, API calls, và các state tạm thời liên quan đến flow đó.

<!-- add a gif image here  -->

#### Shortcut for Dev

> Command + Shift + K 👉 Open Keyboard on IOS Simulator
> Hold Tap with 3 finger 👉 Open DevTool

## 💎 Libraries used

- [Expo](https://docs.expo.io/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Nativewind](https://www.nativewind.dev/v4/overview)
- [Flash list](https://github.com/Shopify/flash-list)
- [React Query](https://tanstack.com/query/v4)
- [Axios](https://axios-http.com/docs/intro)
- [React Hook Form](https://react-hook-form.com/)
- [i18next](https://www.i18next.com/)
- [zustand](https://github.com/pmndrs/zustand)
- [React Native MMKV](https://github.com/mrousavy/react-native-mmkv)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/)
- [React Native Svg](https://github.com/software-mansion/react-native-svg)
- [React Error Boundaries](https://github.com/bvaughn/react-error-boundary)
- [Expo Image](https://docs.expo.dev/versions/unversioned/sdk/image/)
- [React Native Keyboard Controller](https://github.com/kirillzyusko/react-native-keyboard-controller)
- [Moti](https://moti.fyi/)
- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)
- [React Native Screens](https://github.com/software-mansion/react-native-screens)
- [Tailwind Variants](https://www.tailwind-variants.org/)
- [Zod](https://zod.dev/)

## 🔖 License

This project is MIT licensed.
