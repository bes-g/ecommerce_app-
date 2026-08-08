# 🛒 Flutter E-Commerce App — Backend

This is the **backend service** for a full-stack e-commerce mobile application. Built with **Node.js, Express, and PostgreSQL**, it handles secure user authentication for the companion **Flutter** frontend app, which pulls live product data from the [Fake Store API](https://fakestoreapi.com).

> 📱 Looking for the Flutter frontend? See the [frontend README](../ecommerce_app/README.md).

## ✨ Features

- **Authentication** — Sign up and log in with real, persisted accounts (JWT-based sessions, bcrypt password hashing)
- **Product Catalog** — Live search, category filters, and pull-to-refresh product browsing *(handled on the frontend via Fake Store API)*
- **Product Details** — Full product specs, pricing, and ratings *(frontend)*
- **Shopping Cart** — Add/remove items, adjust quantities, live total calculation, and local persistence *(frontend)*
- **Profile** — View account details and manage session/logout

## 🏗️ Architecture

This backend is part of a **full-stack Flutter e-commerce app**, structured with **Feature-First Clean Architecture** on the frontend and a lightweight Express REST API on the backend:

```
lib/                       (Flutter frontend — separate repo/folder)
 ├── core/
 │    ├── network/     # Dio HTTP client + interceptors
 │    ├── storage/     # Local session & cart persistence
 │    └── theme/       # App-wide theming
 └── features/
      ├── auth/        # Sign up, login, session management
      ├── products/    # Catalog, search, filters, product details
      ├── cart/        # Cart state, quantity logic, totals
      └── profile/     # User profile & account info

ecommerce_backend/         (this repo — Node.js backend)
 ├── db.js             # PostgreSQL connection pool
 ├── index.js          # Express server entry point
 └── routes/
      └── auth.js      # Signup & login endpoints
```

## 🧰 Tech Stack

**Backend (this repo — Node.js)**
- `express` — REST API server
- `pg` — PostgreSQL client
- `bcrypt` — secure password hashing
- `jsonwebtoken` — JWT-based authentication
- `dotenv` — environment variable management

**Database**
- PostgreSQL — stores user accounts securely

**Frontend (Flutter — separate repo/folder)**
- `flutter_riverpod` — state management (Notifier / StateNotifier pattern)
- `dio` — networking with custom interceptors for JWT injection & error handling
- `shared_preferences` — local persistence for cart and login session
- `cached_network_image` — image caching with shimmer loading placeholders

## 🔌 API Overview

| Method | Endpoint | Description | Served by |
|---|---|---|---|
| `POST` | `/auth/signup` | Create a new user account | This backend |
| `POST` | `/auth/login` | Authenticate and receive a JWT | This backend |
| `GET` | `/products` | Fetch all products | Fake Store API |
| `GET` | `/products/categories` | Fetch product categories | Fake Store API |
| `GET` | `/products/category/:category` | Fetch products by category | Fake Store API |
| `GET` | `/users/1` | Fetch profile info | Fake Store API |

## 🚀 Getting Started

**Run this backend**
```bash
cd ecommerce_backend
npm install
node index.js
```
Server runs at `http://localhost:3000` by default.

**Run the companion Flutter frontend**
```bash
cd ecommerce_app
flutter pub get
flutter run
```

## 📌 Status

🚧 In active development — core auth and backend integration underway.

## 📄 License

This project is for educational/portfolio purposes.
