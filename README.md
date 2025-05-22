# server-side-coursework-2-w1867160
Repository for Server Side Coursework 2 - 2025
Student Name - U.J Rathnayaka
IIT No - 20210450
UOW No - w1867160

# TravelTales Dashboard

A secure, feature-rich full-stack web application that blends personal travel storytelling with real-time country data. TravelTales lets users register, write and explore blog posts, follow other travelers, and view country insights via an integrated REST Countries API. Authenticated users are provided API keys for secure access to protected endpoints, with full tracking and dashboard visibility.

---

## Features

### 🔐 Authentication & Security

- User registration and login with **JWT + CSRF protection**
- Secure user sessions
- Route protection and error handling

### 🧾 Blog System

- Create, edit, delete, and view **travel blogs**
- Blogs enriched with **country data**: flag, currency, and capital
- Date of visit input and blog metadata
- Blog filtering by **country name** or **username**
- Blog sorting by **newest**, **most liked**, or **most commented**
- **Pagination** and **grid layout** for all blog posts

### 💬 Reactions & Comments

- Like and dislike functionality per blog post
- View total likes/dislikes and **user’s reaction**
- Optionally include **comments** and count per post

### 👥 Social Features

- **Follow/unfollow** users
- View a user's **followers and following**
- Personal feed showing blogs from **followed users**
- **User directory grid** with follow status and action buttons

### 🌍 Country Explorer

- View all countries in a **searchable dropdown**
- Display selected country’s:
  - National flag 🏳️
  - Capital city 🏙
  - Currency 💰
  - Languages 🗣

### 📊 API Key Management (Admin/Developer Tools)

- Generate and revoke **API keys** (1 active key per user)
- Track **API key usage and rate limits**
- Filter country data by `independent` status
- Admin dashboard for **country data access tracking**

## Tech Stack

- **Frontend**: React + Ant Design + Axios
- **Backend**: Node.js + Express + SQLite3
- **Auth**: JWT, HTTP-only cookies, CSRF protection
- **Containerization**: Docker

---

## Prerequisites

- Docker & Docker Desktop installed
- SQLite (DB Browser) installed 
- Internet connection (for pulling REST Countries data)

---

## Project Structure

```
root/
│
├── frontend/         # React application
│   └── .env          # Contains frontend environment variables
│
├── backend/          # Node.js + Express backend
│   └── .env          # Contains backend environment variables
 ```
 
---

## Environment Setup

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file inside the `frontend/` directory with:

   ```
   REACT_APP_SERVER_BASE_URL=http://localhost:8000/api
   ```

---

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file inside the `backend/` directory with:

   ```
   PORT=8000
   REST_COUNTRIES_BASE_URL=https://restcountries.com/v3.1
   JWT_SECRET=<your_jwt_secret>
   JWT_EXPIRES_IN=24h
   CSRF_SECRET=<your_csrf_secret>
   NODE_ENV=development
   ```

> Replace `<your_jwt_secret>` and `<your_csrf_secret>` with secure values. These can be generated using an online UUID or secure random string generator.

---

## Docker Setup 

### Build Frontend Docker Image

```bash
cd frontend
docker build -f Dockerfile -t frontend .
```

### Build Backend Docker Image

```bash
cd backend
docker build -f Dockerfile -t backend .
```

---

## Running the Containers

You can run each container individually after building:

### Frontend

```bash
docker run -p 3000:3000 frontend
```

### Backend

```bash
docker run -p 8000:8000 backend
```

---

## Accessing the App

Once both frontend and backend containers are running:

- Visit the frontend at: `http://localhost:3000`
- API requests will proxy to: `http://localhost:8000/api`

---

## Notes

- Ensure CORS settings in the backend allow requests from `http://localhost:3000` when using credentials.
- The database used is SQLite and will be initialized fresh inside the container unless volumes are used.

---
