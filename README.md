# 🧊 Food Expiry Tracker System

## 🚀 Live Website  
👉 [Live Site URL](https://expiry-tracker-sabrh.netlify.app/)

---

## 📌 Project Overview

The **Food Expiry Tracker System** is a full-stack web application designed to help users manage their food inventory and reduce waste by tracking expiry dates. Users can add, view, update, and delete food items, get alerts for nearly expired foods, and keep notes. The system ensures secure authentication, proper user access control, and a responsive design across all devices.

---

## ✨ Key Features

- 🔐 Authentication (Email/Password & Google Login using Firebase)
- 👤 JWT Authorization for secure API routes
- ➕ Add, View, Update, Delete food items (CRUD operations)
- 📆 Expiry Tracking with countdowns and alerts
- 🚫 Expired & Nearly Expiry Sections
- 🔍 Search and Category Filter on Fridge Page
- 📁 Personal "My Items" dashboard for each user
- ✏️ Add Notes for food items (only by the original user)
- 📊 CountUp Stats: Total expired & nearly expired items
- ⚙️ Responsive Design (Mobile, Tablet, Desktop)
- 🎨 Eye-pleasing UI with proper spacing, color contrast, and animations using Framer Motion
- 📄 404 Not Found Page and loading spinner
- ✅ Pagination for large food inventories

---

## 🔧 Tech Stack

### 🖥️ Client
- **React.js**
- **React Router**
- **Firebase Auth**
- **Axios**
- **Tailwind CSS** + [e.g., Flowbite / ShadCN / DaisyUI]
- **Framer Motion**
- **React Toastify**
- **React CountUp**

### 🖥️ Server
- **Express.js**
- **Node.js**
- **MongoDB**
- **JWT**
- **dotenv**
- **CORS**
- **cookie-parser**

---

## 📂 Pages & Route Structure

- `/` – Home Page
  - Banner
  - Nearly Expiry Items (≤5 days)
  - Expired Items
  - Extra Sections x2
- `/login` – Login (Email/Password, Google)
- `/register` – Register (Validation included)
- `/fridge` – All food items with search, filter, pagination
- `/add-food` – Add new food (Private Route)
- `/my-items` – User’s added food items in a table (Private Route)
- `/food/:id` – Food Details Page (Private Route)
  - Note Section (access-controlled)
  - Expiry Countdown
- `*` – 404 Not Found Page

---

## 🛡️ Security Measures

- Firebase API keys & MongoDB URI stored in `.env`
- JWT token issued on login/registration and stored in cookies
- Protected routes (`POST`, `PATCH`, `DELETE`) secured with token validation
- Firebase authorized domains (e.g., Vercel/Netlify added)
