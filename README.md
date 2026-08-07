# 🛒 Flutter E-Commerce App

A full-stack e-commerce mobile application built with **Flutter** and a custom **Node.js + PostgreSQL** backend. The app features live product browsing via the [Fake Store API](https://fakestoreapi.com), a persistent shopping cart, and a secure authentication system with real user accounts stored in a PostgreSQL database.

## ✨ Features

- **Authentication** — Sign up and log in with real, persisted accounts (JWT-based sessions, bcrypt password hashing)
- **Product Catalog** — Live search, category filters, and pull-to-refresh product browsing
- **Product Details** — Full product specs, pricing, and ratings
- **Shopping Cart** — Add/remove items, adjust quantities, live total calculation, and local persistence
- **Profile** — View account details and manage session/logout

## 🏗️ Architecture

Built using **Feature-First Clean Architecture**, separating concerns into isolated, testable modules:

```
lib/
 ├── core/
 │    ├── network/     # Dio HTTP client + interceptors
 │    ├── storage/     # Local session & cart persistence
 │    └── theme/       # App-wide theming
 └── features/
      ├── auth/        # Sign up, login, session management
      ├── products/    # Catalog, search, filters, product details
      ├── cart/        # Cart state, quantity logic, totals
      └── profile/     # User profile & account info
```

## 🧰 Tech Stack

**Frontend (Flutter)**
- `flutter_riverpod` — state management (Notifier / StateNotifier pattern)
- `dio` — networking with custom interceptors for JWT injection & error handling
- `shared_preferences` — local persistence for cart and login session
- `cached_network_image` — image caching with shimmer loading placeholders

**Backend (Node.js)**
- `express` — REST API server
- `pg` — PostgreSQL client
- `bcrypt` — secure password hashing
- `jsonwebtoken` — JWT-based authentication
- `dotenv` — environment variable management

**Database**
- PostgreSQL — stores user accounts securely

## 🔌 API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/signup` | Create a new user account |
| `POST` | `/auth/login` | Authenticate and receive a JWT |
| `GET` | `/products` | Fetch all products (Fake Store API) |
| `GET` | `/products/categories` | Fetch product categories |
| `GET` | `/products/category/:category` | Fetch products by category |
| `GET` | `/users/1` | Fetch profile info |

## 🚀 Getting Started

**Backend**
```bash
cd ecommerce_backend
npm install
node index.js
```

**Frontend**
```bash
cd ecommerce_app
flutter pub get
flutter run
```

## 📌 Status

🚧 In active development — core auth and backend integration underway.

## 📄 License

This project is for educational/portfolio purposes.
