# Notes API

A secure and feature-rich RESTful API for managing notes, built with NestJS, Prisma, and SQLite. This API includes JWT authentication, user management, and full CRUD operations for notes.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Protected Routes**: JWT-based authentication guard for secure endpoints
- **CRUD Operations**: Complete Create, Read, Update, Delete operations for notes
- **User-Scoped Notes**: Each user can only access their own notes
- **Pagination Support**: Query parameters for paginating note lists
- **Input Validation**: Class-validator for robust data validation
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Database ORM**: Prisma for type-safe database operations
- **TypeScript**: Fully typed codebase for better developer experience

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (recommended) or npm
- [SQLite](https://www.sqlite.org/) (included by default)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd notes-api
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3000
   ```

4. **Run database migrations**

   ```bash
   pnpm prisma migrate dev
   # or
   npx prisma migrate dev
   ```

5. **Generate Prisma Client**
   ```bash
   pnpm prisma generate
   # or
   npx prisma generate
   ```

## 🚀 Running the Application

### Development Mode

```bash
pnpm start:dev
# or
npm run start:dev
```

### Production Mode

```bash
pnpm build
pnpm start:prod
# or
npm run build
npm run start:prod
```

### Debug Mode

```bash
pnpm start:debug
# or
npm run start:debug
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

Once the application is running, you can access the interactive Swagger documentation at:

```
http://localhost:3000/api
```

## 🔌 API Endpoints

### Authentication

#### Register a New User

```http
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login

```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Notes (Protected Routes)

All note endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

#### Create a Note

```http
POST /api/note
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Note",
  "body": "This is the content of my note"
}
```

#### Get All Notes (with pagination)

```http
GET /api/note?take=10&skip=0
Authorization: Bearer <token>
```

#### Get a Specific Note

```http
GET /api/note/:id
Authorization: Bearer <token>
```

#### Update a Note

```http
PATCH /api/note/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "body": "Updated content"
}
```

#### Delete a Note

```http
DELETE /api/note/:id
Authorization: Bearer <token>
```

## 🗄️ Database Schema

### User Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  Note      Note[]
}
```

### Note Model

```prisma
model Note {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
}
```

## 🧪 Testing

### Run Unit Tests

```bash
pnpm test
# or
npm test
```

### Run Tests in Watch Mode

```bash
pnpm test:watch
# or
npm run test:watch
```

### Run End-to-End Tests

```bash
pnpm test:e2e
# or
npm run test:e2e
```

### Generate Test Coverage

```bash
pnpm test:cov
# or
npm run test:cov
```

## 🏗️ Project Structure

```
notes-api/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── auth/                  # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts
│   │   └── dto/              # Auth DTOs
│   ├── note/                  # Notes module
│   │   ├── note.controller.ts
│   │   ├── note.service.ts
│   │   ├── dto/              # Note DTOs
│   │   └── entities/
│   ├── user/                  # User module
│   │   └── user.service.ts
│   ├── app.module.ts          # Root module
│   ├── main.ts                # Application entry point
│   └── prisma.service.ts      # Prisma service
├── test/                      # E2E tests
├── package.json
└── README.md
```

## 🔧 Available Scripts

| Script             | Description                               |
| ------------------ | ----------------------------------------- |
| `pnpm start`       | Start the application                     |
| `pnpm start:dev`   | Start in development mode with hot-reload |
| `pnpm start:debug` | Start in debug mode                       |
| `pnpm start:prod`  | Start in production mode                  |
| `pnpm build`       | Build the application                     |
| `pnpm test`        | Run unit tests                            |
| `pnpm test:e2e`    | Run end-to-end tests                      |
| `pnpm test:cov`    | Generate test coverage report             |
| `pnpm lint`        | Lint and fix code                         |
| `pnpm format`      | Format code with Prettier                 |

## 🔐 Security Features

- **Password Hashing**: User passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Auth Guards**: Protected routes require valid JWT tokens
- **Input Validation**: All inputs are validated using class-validator
- **User Isolation**: Users can only access their own notes

## 🛠️ Technologies Used

- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[SQLite](https://www.sqlite.org/)** - Lightweight database
- **[JWT](https://jwt.io/)** - JSON Web Tokens for authentication
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** - Password hashing
- **[Swagger/OpenAPI](https://swagger.io/)** - API documentation
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Class Validator](https://github.com/typestack/class-validator)** - Validation decorators

## 👤 Author

**Avik Mukherjee**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Happy Coding! 🎉**
