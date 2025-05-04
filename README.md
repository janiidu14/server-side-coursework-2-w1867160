# server-side-coursework-2-w1867160
Repository for Server Side Coursework 2 - 2025
Student Name - U.J Rathnayaka
IIT No - 20210450
UOW No - w1867160

# Rest Countries Dashboard

A secure full-stack web application that provides authenticated access to country data using the [REST Countries API](https://restcountries.com). Users can register, log in, and generate API keys to access protected routes. API key usage is tracked and only one active key per user is allowed at a time.

---

## Features

- 🔐 User authentication including Register and Login (JWT + CSRF protection)
- 🔑 API key generation and management
- 📊 API key usage tracking and statistics
- 🌍 Country data filtering (all, independent)
- 🎛️ Dashboards to load countries and API key management
- 💾 SQLite3-based database

---

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
