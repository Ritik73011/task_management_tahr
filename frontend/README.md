# Task Management System - Frontend

A modern Task Management frontend built with **Next.js**, **React**, **Tailwind CSS**, and **Axios**. This application provides authentication, project management, task management, and a dashboard with a clean, responsive, and reusable UI.

---

# Tech Stack

- Next.js 16.3.0
- React 19
- JavaScript (ES6+)
- Tailwind CSS 4
- Axios
- React Hook Form
- Zod
- Lucide React
- React Hot Toast

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Auto Redirect
- Persistent Login
- Logout

---

## Dashboard

- Total Projects
- Total Tasks
- Completed Tasks
- Pending Tasks

---

## Project Management

- Create Project
- View Projects
- Update Project
- Delete Project
- Pagination

---

## Task Management

- Create Task
- View Tasks
- Update Task
- Delete Task
- Pagination
- Filter by Status
- Filter by Priority
- Sort by Due Date

---

## UI Features

- Responsive Layout
- Reusable Components
- Loading States
- Empty States
- Confirmation Dialogs
- Toast Notifications
- Form Validation
- Modern Dashboard UI

---

# Folder Structure

```text
frontend/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── layout.js
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── projects/
│   │   │   ├── tasks/
│   │   │   └── layout.js
│   │   │
│   │   ├── loading.js
│   │   ├── not-found.js
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── projects/
│   │   └── tasks/
│   │
│   ├── config/
│   │   ├── api.js
│   │   ├── constants.js
│   │   └── routes.js
│   │
│   ├── context/
│   │   └── AuthProvider.jsx
│   │
│   ├── lib/
│   │   ├── axios.js
│   │   ├── helpers.js
│   │   ├── storage.js
│   │   ├── token.js
│   │   └── toast.js
│   │
│   └── styles/
│       └── theme.js
│
├── .env.local
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd frontend
```

Install dependencies

```bash
pnpm install
```

---

# Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Update the API URL according to your backend server.

---

# Run Development Server

```bash
pnpm dev
```

Application runs on

```
http://localhost:3000
```

---

# Build for Production

```bash
pnpm build
```

---

# Start Production Server

```bash
pnpm start
```

---

# Lint Project

```bash
pnpm lint
```

---

# Authentication Flow

- Register User
- Login User
- JWT stored in Local Storage
- Axios automatically attaches Authorization header
- Protected dashboard routes
- Auto redirect based on authentication status

---

# API Integration

The frontend communicates with the backend using Axios.

Main modules include:

- Authentication
- Dashboard
- Projects
- Tasks

Axios interceptors automatically:

- Attach JWT Token
- Handle Unauthorized Requests
- Display Error Toasts

---

# Validation

Forms are validated using

- React Hook Form
- Zod

Validation includes

- Required Fields
- Email Format
- Password Rules
- Project Validation
- Task Validation

---

# UI Components

Reusable components include

- Button
- Input
- Textarea
- Select
- Modal
- Pagination
- Spinner
- EmptyState
- ConfirmDialog
- PageHeader

---

# Project Architecture

The project follows a modular architecture.

- Feature-based folder structure
- Reusable UI components
- Centralized configuration
- Context API for Authentication
- Axios abstraction layer
- Clean separation of UI and business logic

---

# Future Improvements

- Search Functionality
- Dark Mode
- User Profile
- File Attachments
- Notifications
- Dashboard Charts
- Activity Logs

---

# Author

Ritik Kumar Singh

---

# License

This project is developed for educational and learning purposes.
