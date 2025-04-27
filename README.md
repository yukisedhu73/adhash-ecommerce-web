# adhash-ecommerce-web

## backend readme

# 🛒 E-commerce Backend API

A simple backend REST API for managing e-commerce products, built with **Node.js**, **Express.js**, and **PostgreSQL**.

---

## 📦 Features

- List all products
- Get product details by ID
- Add new products (Admin task)
- Update existing products
- Delete products

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- DBeaver (or any PostgreSQL client)
- dotenv

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yukisedhu73/adhash-ecommerce-web.git
cd adhash-ecommerce-web/backend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Create a .env file in the root and add your database config:

```bash
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=ecommerce_db
```

### 4. Set up the PostgreSQL database:

```bash
CREATE DATABASE ecommerce_db;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  imageurl TEXT
);
```

### 5. Run the serve :

```bash
npm run dev
```

# AdHash E-commerce Frontend 🛒

## frontend readme

Welcome to **AdHash E-commerce** – a fully responsive e-commerce web application built with **Angular** and **pure CSS media queries**!

## ✨ Features

- 🛍 **Product List** page
- 🛒 **Cart** functionality
- 🛠 **Admin Panel** for managing products
- 📱 **Responsive Design**:
  - Sidebar navigation for desktops
  - Topbar with hamburger menu for mobile devices\

## 📸 Screenshots

|                Desktop View                |               Mobile View                |
| :----------------------------------------: | :--------------------------------------: |
| ![Desktop](assets/screenshots/desktop.png) | ![Mobile](assets/screenshots/mobile.png) |

## 🛠 Tech Stack

- **Angular** (Standalone Components)
- **SCSS** for styling
- **HTML5** and **CSS3**
- **TypeScript**

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yukisedhu73/adhash-ecommerce-web.git
cd adhash-ecommerce-web/frontend/adhash-ecommerce-fe
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Run the Project :

```bash
ng serve
```
