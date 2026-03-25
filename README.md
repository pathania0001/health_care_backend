# Healthcare Management System API

A Node.js backend API for managing healthcare services including doctors, patients, and their mappings.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Setup](#database-setup)
- [Authentication](#authentication)
- [Technologies Used](#technologies-used)

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone or extract the project:
```bash
cd heallth_backend
```

2. Install dependencies:
```bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory with the following variables:

```env
PORT=5000

DB_USERNAME=
DB_PASSWORD=
DB_NAME=healthcare_db
DB_HOST=127.0.0.1
DB_DIALECT=postgres

JWT_SECRET=access_secret_key
JWT_REFRESH_SECRET=refresh_secret_key

JWT_ACCESS_TOKEN_EXPIRY=15m
JWT_REFRESH_TOKEN_EXPIRY=7d
```

2. Ensure PostgreSQL is running and accessible at the configured host and port.

## Running the Application

1. Create the database:
```bash
npx sequelize-cli db:create
```

2. Run migrations:
```bash
npx sequelize-cli db:migrate
```

3. Start the application:
```bash
npm start
```

The server will run on `http://localhost:5000`

## Project Structure

```
src/
├── controller/          # Route handlers
│   ├── user.controller.js
│   ├── doctor.controller.js
│   ├── patient.controller.js
│   └── mapping.controller.js
├── services/            # Business logic
│   ├── user.service.js
│   ├── doctor.service.js
│   ├── patient.service.js
│   └── mapping.service.js
├── repositories/        # Data access layer
│   ├── user.repo.js
│   ├── doctor.repo.js
│   ├── patient.repo.js
│   ├── mapping.repo.js
│   └── crud.repo.js
├── models/              # Sequelize models
│   ├── user.js
│   ├── doctor.js
│   ├── patient.js
│   └── mapping.js
├── routes/              # API routes
│   ├── v1/
│   │   ├── auth.routes.js
│   │   ├── doctor.routes.js
│   │   ├── patient.routes.js
│   │   └── mapping.routes.js
│   └── index.js
├── middlewares/         # Express middlewares
│   └── auth.middleware.js
├── utils/               # Utility functions
│   └── common/
│       └── jwt.js
├── config/              # Configuration files
│   ├── config.json
│   └── checkDBConnection.js
├── migrations/          # Database migrations
└── app.js               # Express app setup
```

## API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login user |
| POST | `/refresh-token` | Refresh access token |
| POST | `/logout` | Logout user |

**Request Body (Register):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Request Body (Login):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Doctor Routes (`/api/v1/doctors`) - Protected

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create a new doctor |
| GET | `/` | Get all doctors |
| GET | `/:id` | Get doctor by ID |
| PUT | `/:id` | Update doctor |
| DELETE | `/:id` | Delete doctor |

**Request Body (Create/Update):**
```json
{
  "name": "Dr. Smith",
  "specialty": "Cardiology"
}
```

### Patient Routes (`/api/v1/patients`) - Protected

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create a new patient |
| GET | `/` | Get all patients |
| GET | `/:id` | Get patient by ID |
| PUT | `/:id` | Update patient |
| DELETE | `/:id` | Delete patient |

**Request Body:**
```json
{
  "name": "Jane Doe",
  "age": 30,
  "gender": "Female"
}
```

### Mapping Routes (`/api/v1/mappings`) - Protected

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Assign doctor to patient |
| GET | `/:patientId` | Get doctors by patient |
| DELETE | `/:id` | Remove mapping |

**Request Body (Assign):**
```json
{
  "patientId": 1,
  "doctorId": 1
}
```

## Database Setup

### Models Structure

1. **User** - Stores user credentials and authentication info
   - Fields: name, email, password, refreshToken

2. **Doctor** - Stores doctor information
   - Fields: name, specialty

3. **Patient** - Stores patient information
   - Fields: name, age, gender, userId (foreign key)

4. **Mapping** - Links doctors to patients
   - Fields: patientId, doctorId

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. Register/Login to receive `accessToken` and `refreshToken`
2. Include `Authorization: Bearer <accessToken>` header for protected routes
3. Use refresh token endpoint to get new access token when expired

**Protected Routes:** All `/patients`, `/doctors`, and `/mappings` endpoints require authentication.

## Technologies Used

- **Express.js** - Web framework
- **Sequelize** - ORM for database
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemon** - Development server
- **dotenv** - Environment variables

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Development

For development, the application uses nodemon for auto-reload:

```bash
npm start
```

This watches for file changes and automatically restarts the server.
