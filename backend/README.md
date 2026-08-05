# Task Management API

Backend API for the Task Management Application built as part of the TAHR Full Stack Developer Technical Assignment.

## Tech Stack

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
- Get Logged-in User

### Projects

- Create Project
- Get All Projects
- Get Project by ID
- Update Project
- Delete Project

### Tasks

- Create Task
- Get All Tasks
- Get Task by ID
- Update Task
- Delete Task
- Filter by Status
- Filter by Priority
- Sort by Due Date
- Pagination

### Dashboard

Returns:

- Total Projects
- Total Tasks
- Completed Tasks
- Pending Tasks

---

## Project Structure

```text
backend
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.js
│
├── src
│   ├── config
│   ├── middlewares
│   ├── modules
│   │   ├── auth
│   │   ├── dashboard
│   │   ├── projects
│   │   └── tasks
│   ├── routes
│   ├── utils
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── package.json
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into backend

```bash
cd backend
```

Install dependencies

```bash
pnpm install
```

---

## Environment Variables

Create a `.env` file using `.env.example`.

Example:

```env
PORT=5000
NODE_ENV=development

DATABASE_URL=your_database_url

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

---

## Prisma

Generate Prisma Client

```bash
pnpm prisma generate
```

Run migrations

```bash
pnpm prisma migrate dev
```

Seed database (optional)

```bash
pnpm prisma db seed
```

---

## Run Server

Development

```bash
pnpm dev
```

Production

```bash
pnpm start
```

---

## API Base URL

```
http://localhost:5000/api
```

---

## API Endpoints

### Authentication

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | `/auth/register` |
| POST   | `/auth/login`    |
| GET    | `/auth/me`       |

### Projects

| Method | Endpoint               |
| ------ | ---------------------- |
| POST   | `/projects`            |
| GET    | `/projects`            |
| GET    | `/projects/:projectId` |
| PUT    | `/projects/:projectId` |
| DELETE | `/projects/:projectId` |

### Tasks

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | `/tasks`         |
| GET    | `/tasks`         |
| GET    | `/tasks/:taskId` |
| PUT    | `/tasks/:taskId` |
| DELETE | `/tasks/:taskId` |

Supported Query Parameters

| Parameter  | Description                     |
| ---------- | ------------------------------- |
| `status`   | Filter by task status           |
| `priority` | Filter by task priority         |
| `sort`     | Sort due date (`asc` or `desc`) |
| `page`     | Page number                     |
| `limit`    | Number of records per page      |

Example

```
GET /api/tasks?status=TODO&priority=HIGH&sort=asc&page=1&limit=10
```

### Dashboard

| Method | Endpoint     |
| ------ | ------------ |
| GET    | `/dashboard` |

Returns

- Total Projects
- Total Tasks
- Completed Tasks
- Pending Tasks

---

## Authentication

Protected endpoints require a Bearer Token.

Example

```http
Authorization: Bearer <jwt_token>
```

---

## Error Handling

The API returns consistent JSON responses.

Example Success

```json
{
  "success": true,
  "message": "Project created successfully.",
  "data": {}
}
```

Example Error

```json
{
  "success": false,
  "message": "Project not found."
}
```

---

## Author

RITIK KUMAR SINGH
