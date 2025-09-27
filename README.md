Звісно\! Ось переклад вашого лаконічного та професійного `README.md` на англійську мову.

---

# 🚀 Next.js App Router Social Feed Prototype

## Overview

This project is a web application prototype for displaying and creating posts, developed using **Next.js 14 (App Router)**. It primarily demonstrates the utilization of Server Components, Streaming, and client-side state management.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Data:** JSONPlaceholder

---

## ✨ Key Features

- **Next.js Architecture:** Uses Server Components for data fetching and implements Server Actions for data mutations.
- **UX/UI:**
  - **Skeleton Loading:** Automatic display of skeleton screens (via `loading.tsx`) during initial SSR data fetching.
  - **Pagination:** Implemented using URL parameters (`searchParams`) for dynamic page switching.
  - **Global State:** Centralized management of notifications (Toast) via Zustand.
  - **Refactoring:** All configurations (FAB, routes, limits) are extracted into a central constants file.

---

## ⚙️ Getting Started

1.  Clone the repository and install dependencies:
    ```bash
    git clone [https://github.com/MykytaMusaiev/post-list-m]
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```

---

## 🧪 Skeleton Testing

A mechanism to add an artificial delay is available to visually demonstrate the **Streaming** and `loading.tsx` behavior.

Modify the constant in the `src/lib/constants.ts` file to adjust the delay time:

```typescript
// src/lib/constants.ts
export const SKELETON_TESTING_DELAY = 1000 // Delay time in ms
```

---

## 📝 Next Steps

- [ ] Integration of unit tests.
