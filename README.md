# Task Management API

RESTful API for managing tasks and users, built with Express, TypeScript, and Firebase Firestore, following Clean Architecture principles.

## Features

- **Clean Architecture**: Separation of concerns (Domain, Application, Infrastructure, Interface).
- **TypeScript**: Strictly typed.
- **Firebase Firestore**: NoSQL database.
- **Security**: Authentication (via Token), Helmet, CORS.
- **Design Patterns**: Repository Pattern, Singleton (Firebase Client), Dependency Injection (Manual).

## Setup

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Configuration**:
    - Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    - Fill in your Firebase Service Account credentials. You can generate these in the Firebase Console -> Project Settings -> Service Accounts.
    - Note: Put the private key in quotes and preserve `\n` or newlines.

## Running the Project

- **Development**:
    ```bash
    npm run dev
    ```
- **Build**:
    ```bash
    npm run build
    ```
- **Start Production**:
    ```bash
    npm start
    ```

## API Endpoints

### Tasks
- `GET /api/tasks`: Get all tasks.
- `POST /api/tasks`: Create a task.
    - Body: `{ "title": "...", "description": "..." }`
- `PUT /api/tasks/:id`: Update a task.
    - Body: `{ "title": "...", "status": "IN_PROGRESS" }`
- `DELETE /api/tasks/:id`: Delete a task.

### Users
- `POST /api/users`: Create a user.
    - Body: `{ "email": "..." }`
- `GET /api/users?email=...`: Find a user by email.

## Architecture

- **Domain**: Entities (`Task`, `User`) and Repository Interfaces.
- **Application**: Use Cases (`CreateTask`, `GetTasks`, etc.).
- **Infrastructure**: Firebase implementation of Repositories (`FirestoreTaskRepository`).
- **Interfaces**: Express Controllers tasks and Routes.

## API Documentation

The API is documented using Swagger. Once the server is running, you can access the interactive documentation at:

- URL: `http://localhost:3000/api-docs`

Here you can view all available endpoints, their schemas, and test requests directly from the browser.
