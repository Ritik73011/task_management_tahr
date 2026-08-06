# Task Management System

A full-stack Task Management application built with **Next.js**, **Node.js**, **Express.js**, **PostgreSQL**, and **Prisma ORM**. The application allows users to manage projects and tasks with secure authentication, filtering, sorting, pagination, and a dashboard overview.

---

## Tech Stack

### Frontend

- Next.js 16
- React 19
- JavaScript
- Tailwind CSS 4
- React Hook Form
- Zod
- Axios
- React Hot Toast
- Lucide React

### Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Zod Validation

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Dashboard

- Total Projects
- Total Tasks
- Completed Tasks
- Pending Tasks

### Projects

- Create Project
- View Projects
- Update Project
- Delete Project
- Pagination

### Tasks

- Create Task
- View Tasks
- Update Task
- Delete Task
- Filter by Status
- Filter by Priority
- Sort by Due Date
- Pagination

---

## Project Structure

```text
task-management/
│
├── frontend/
│
└── backend/
```

---

# Getting Started

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd task-management
```

---

## Backend Setup

Move into backend

```bash
cd backend
```

Install dependencies

```bash
pnpm install
```

Create a `.env` file using `.env.example`

```env
PORT=5000

DATABASE_URL=your_database_url

JWT_SECRET=your_secret

JWT_EXPIRES_IN=7d
```

Generate Prisma Client

```bash
pnpm prisma generate
```

Run database migrations

```bash
pnpm prisma migrate dev
```

(Optional) Seed the database

```bash
pnpm prisma db seed
```

Start the backend server

```bash
pnpm dev
```

Backend runs at

```
http://localhost:5000
```

---

## Frontend Setup

Open another terminal.

Move into frontend

```bash
cd frontend
```

Install dependencies

```bash
pnpm install
```

Create a `.env.local` file

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend

```bash
pnpm dev
```

Frontend runs at

```
http://localhost:3000
```

---

## API

Base URL

```
http://localhost:5000/api
```

### Authentication

- POST `/auth/register`
- POST `/auth/login`
- GET `/auth/me`

### Projects

- POST `/projects`
- GET `/projects`
- GET `/projects/:projectId`
- PUT `/projects/:projectId`
- DELETE `/projects/:projectId`

### Tasks

- POST `/tasks`
- GET `/tasks`
- GET `/tasks/:taskId`
- PUT `/tasks/:taskId`
- DELETE `/tasks/:taskId`

Supported query parameters

- `status`
- `priority`
- `sort`
- `page`
- `limit`

Example

```http
GET /api/tasks?status=TODO&priority=HIGH&sort=asc&page=1&limit=10
```

### Dashboard

- GET `/dashboard`

---

## Authentication

Protected endpoints require a Bearer Token.

Example

```http
Authorization: Bearer <jwt_token>
```

---

## Scripts

### Backend

```bash
pnpm dev
pnpm start
```

### Frontend

```bash
pnpm dev
pnpm build
pnpm start
```

---

## Author

**Ritik Kumar Singh**
