# 🏪 Store Ratings Portal

A full-stack web application where users can rate stores, admins can manage users and stores, and store owners can view their store ratings.

---
### Postman Collection link

https://gist.github.com/ibhavanaa/2a4fa025fb1a86b9a7a5f8e84cbd45a8

### GitHub Code Repository Link

https://github.com/ibhavanaa/store-ratings

## 🚀 Features

### 👥 Roles:
- **Normal User**: Can register, login, view stores, and submit/update ratings (1–5).
- **Store Owner**: Can login, add stores, and view ratings for their stores.
- **Admin**: Can add users/stores, view dashboard stats, and filter users/stores.

### ✨ Functionality:
- Single login page for all users
- Role-based dashboard
- JWT-based auth (with secure route protection)
- Responsive frontend with Tailwind CSS
- Ratings system using MySQL

---

## 🛠 Tech Stack

### 💻 Frontend
- React (Create React App)
- Tailwind CSS
- React Router

### 🔧 Backend
- Node.js
- Express
- MySQL (hosted on FreeSQLDatabase or PlanetScale)
- JWT Auth
- Bcrypt (password hashing)

---

## 📦 Installation

```bash
# clone the repo
git clone https://github.com/your-username/store-ratings.git
cd store-ratings

# install frontend
cd frontend
npm install

# install backend
cd ../backend
npm install

📌 Environment Setup
🔐 Backend .env file
PORT=10000
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db_name
JWT_SECRET=your_secret_key

🙋‍♀️ Author
Bhavana Choudhary