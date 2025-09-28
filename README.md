# Next.js App Router Social Feed Prototype

## Overview

This project is a web application prototype for displaying and creating posts, developed using **Next.js 14 (App Router)**. It primarily demonstrates the utilization of Server Components, Streaming, and client-side state management.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Data:** JSONPlaceholder
- **Testing:** **Jest, React Testing Library**

---

## ✨ Key Features

- **Next.js Architecture:** Uses Server Components for data fetching and implements Server Actions for data mutations.
- **UX/UI:**
  - **Skeleton Loading:** Automatic display of skeleton screens (via `loading.tsx`) during initial SSR data fetching.
  - **Pagination:** Implemented using URL parameters (`searchParams`) for dynamic page switching.
  - **Global State:** Centralized management of notifications (Toast) via Zustand.
  - **Refactoring:** All configurations (FAB, routes, limits) are extracted into a central constants file.

---

## 🧪 Testing

The project includes comprehensive **Unit Tests** for key application logic, utilizing **Jest** and **React Testing Library (RTL)** to ensure reliability of components and data fetching.

### Test Coverage

Unit tests cover the following critical areas:

- **API Service:** Testing data fetching (`getPosts`) and mutation (`createPost`) logic, including error handling and parameter passing.
- **Pagination Logic:** Ensuring correct calculation of page numbers, disabling of buttons, and navigation.
- **Limit Selection:** Verifying that URL parameters (`limit` and `page`) are updated correctly upon user selection.
- **New Post Page:** Comprehensive testing of form submission, **client-side validation (on blur)**, API success/failure handling, and router navigation.

### Running Tests

To run the unit tests, use the following command:

```bash
npm run test
```

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

# 🎉 Final Note

**_Thank you for your time and attention to this project\!_** 🚀
