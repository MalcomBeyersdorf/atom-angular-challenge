# Atom Angular Challenge - Task List App

This repository contains the solution for the Atom Angular Challenge. It features a Task Management application built with Angular 17 and a Backend using Express.js on Firebase Cloud Functions.

## Features

- **Authentication**: Email-based login with user creation flow.
- **Task Management**: Create, Read, Update, Delete (CRUD) tasks.
- **Completion Tracking**: Mark tasks as done/pending.
- **Sort Order**: Tasks sorted by creation date.
- **Responsive Design**: Built with Angular Material and Bootstrap Grid.

## Tech Stack

### Frontend (Client)

- **Framework**: Angular 17 (Standalone Components)
- **State Management**: Signals + RxJS
- **UI Architecture**: Data/Feature/UI pattern (inspired by `ngx-struct`)
- **Styling**: SCSS, Angular Material, Bootstrap Utilities

### Backend (Server)

- **Runtime**: Node.js (Firebase Cloud Functions)
- **Framework**: Express.js
- **Database**: Firestore
- **Architecture**: Domain-Driven Design (DDD) / Clean Architecture
  - **Controller**: HTTP handling
  - **Service**: Business Logic
  - **Repository**: Data Access
  - **Models**: Type definitions

## 📂 Project Structure

```
├── client/
│   ├── src/app/auth/       # Authentication Feature
│   │   ├── data/           # Services & Stores
│   │   └── feature/        # Smart Components (Login)
│   ├── src/app/tasks/      # Tasks Feature
│   │   ├── data/           # Services & Stores
│   │   └── feature/        # Smart Components (Task List)
│   └── src/styles.scss     # Global Styles
├── server/
│   ├── src/controllers/    # Route Handlers
│   ├── src/services/       # Business Logic
│   ├── src/repositories/   # Firestore Access
│   └── src/index.ts        # Entry Point
```

## 🏗 Setup & Run

### Prerequisites

- Node.js
- Firebase CLI
- Angular CLI

### Steps

1. **Install Dependencies**:

   ```bash
   (cd client && npm install)
   (cd server && npm install)
   ```

2. **Run Backend (Emulator)**:

   ```bash
   cd server
   npm run build
   firebase emulators:start --only functions
   ```

3. **Run Frontend**:
   ```bash
   cd client
   ng serve
   ```
   Open `http://localhost:4200`

## Design Decisions

- **Signals for State**: Leveraged Angular 17 Signals for granular reactivity and easier state management in services compared to pure RxJS subjects.
- **Optimistic UI**: Task checkboxes update immediately for better UX, reverting only on error.
- **Clean Architecture on Backend**: Decoupled Express controllers from Firestore logic to allow easier testing and potential database swaps in the future.
- **Standalone Components**: Reduced boilerplate by avoiding NgModules.

---

**Author**: Malcom Beyersdorf
