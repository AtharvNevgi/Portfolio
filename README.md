# Portfolio Project – Full Stack MERN Application

A full-stack **Portfolio Web Application** built using the **MERN stack**.  
This project includes a public portfolio website, an admin panel for content management, secure authentication, REST APIs, and cloud-based image handling.  
It was developed and deployed as a **production-level project**, focusing on real-world backend practices and deployment workflows.

---

## 🚀 Features

### 🌐 Public Website
live URL: https://atharva-portfolio-lemon.vercel.app/
- Responsive portfolio UI
- Dynamic sections (About, Projects, Blogs, Contact)
- Blog listing with backend integration
- API-driven data rendering

### 🔐 Admin Panel
live URL: https://portfolio-admin-ten-wheat.vercel.app/
- Secure Admin authentication (JWT based)
- Dashboard for managing:
  - Blogs
  - About section
  - Portfolio content
- Change password functionality
- Protected routes with token validation

### 🛠 Backend
- RESTful APIs using **Node.js & Express**
- JWT Authentication & Authorization
- MongoDB Atlas integration
- Centralized error handling
- Environment-based configuration
- Multer + Cloudinary for image uploads

### ☁️ Database & Storage
- MongoDB Atlas (Cloud Database)
- Cloudinary for image storage
- Secure `.env` configuration (not committed)

---

## 🧑‍💻 Tech Stack

**Frontend**
- React.js
- React Router
- Axios
- Vite

**Admin Panel**
- React.js
- JWT Authentication
- Protected Routes

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Multer
- Cloudinary

**Deployment**
- Frontend: Deployed on production hosting
- Backend: Deployed with environment variables
- Database: MongoDB Atlas

---

## 📂 Project Structure

Portfolio/
│
├── frontend/ # Public portfolio website
├── admin/ # Admin dashboard
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── middleware/
│ └── server.js
│
└── README.md

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend` folder:

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=your_jwt_expires_time
PORT=5000
FRONTEND_URL=your_frontend_url
ADMIN_URL=your_admin_url
MONGO_URI=your_mongodb_atlas_url

> ⚠️ `.env` is excluded from GitHub for security reasons.

---

## 🏃‍♂️ How to Run Locally

### 1️⃣ Clone the Repository
bash
git clone https://github.com/AtharvNevgi/Portfolio.git

### 2️⃣ Backend Setup
cd backend
npm install
npm run dev

### 3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

### Admin Panel Setup
cd admin
npm install
npm run dev

🔐 Authentication Flow

Admin logs in → JWT token generated
Token stored on client side
Token sent via Authorization header
Middleware validates token for protected routes

📌 Learning Outcomes

MERN stack architecture
JWT authentication & authorization
MongoDB Atlas cloud database
Cloudinary image handling
Secure environment variable management
Real production deployment & debugging
Handling common errors (JWT, CORS, 404, env leaks)

🔮 Future Improvements
Role-based access control
Pagination & search
SEO optimization
API testing & documentation
CI/CD pipeline

👨‍💻 Author

Atharva Nevgi
Aspiring Full Stack Developer (MERN)
GitHub: https://github.com/AtharvNevgi
