# devtown_nodejs
Assignment for DevTown Nodejs REST API Backend Bootcamp



[YouTube Link](https://www.youtube.com/watch?v=5lAA9lqtcbA)

# Task Manager API

A robust REST API for managing tasks, with user authentication, built using Express.js and MongoDB.

## Features

- User signup/login with JWT
- Task CRUD for logged-in users
- Data validation and secure password storage
- Health check endpoint (`/health`)
- Centralized error handling
- Ready for deployment on Render.com

## Setup

1. Clone the repo and install dependencies:
   ```
   npm install
   ```
2. Create a `.env` file (see `.env.example`).
3. Start the server:
   ```
   npm start
   ```

## API Routes

### User

- `POST /api/users/signup` — Register new user
- `POST /api/users/login` — Login and get JWT

### Tasks (JWT required)

- `POST /api/tasks` — Create task
- `GET /api/tasks` — Get all tasks for user
- `GET /api/tasks/:id` — Get task by ID
- `PUT /api/tasks/:id` — Update task
- `DELETE /api/tasks/:id` — Delete task

### Health

- `GET /health` — API status

## Response Format

```json
{ "success": true, "data": { ... }, "error": null }
```
or
```json
{ "success": false, "data": null, "error": "Error message" }
```


## Security

- Passwords hashed with bcrypt
- JWT for authentication
- Helmet for HTTP headers
- No secrets in code
