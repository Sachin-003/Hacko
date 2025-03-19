# 🚀 Hacko

## 🌍 Live Demo
Check out the deployed project: https://hacko4u.onrender.com/

Hacko is a **developer collaboration platform** built using the **MERN stack**. It enables efficient **task management**, **team coordination**, and now supports **group project chat**. 🛠️💡

## ✨ Features
- ✅ **Task and project management**
- 💬 **Real-time group chat** for seamless team communication
- 🔒 **JWT-based authentication** for secure user sessions

## 🏗️ Tech Stack
- 🎨 **Frontend:** React (Vite), Tailwind CSS
- 🛠️ **Backend:** Node.js, Express
- 🗄️ **Database:** MongoDB
- 🔑 **Authentication:** JSON Web Tokens (JWT)
- 🔄 **Real-time Chat:** WebSockets (Socket.io)

## 🚀 Getting Started

### 📌 Prerequisites
Ensure you have the following installed:
- 📌 Node.js
- 📌 MongoDB

### ⚙️ Installation
```sh
git clone https://github.com/Sachin-003/Hacko.git
cd hacko
```

#### 📦 Install dependencies for frontend and backend
```sh
cd frontend && npm install
cd ../backend && npm install
```

### 🛠️ Environment Variables
Create a `.env` file in the `backend` directory with the following:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### ▶️ Running the Project
#### 🚀 Start the backend server
```sh
cd backend && nodemon server.js
```

#### 🌐 Start the frontend
```sh
cd frontend && npm run dev
```


