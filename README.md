# 🎵 Secure Music API


## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Security Implementation](#-security-implementation)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

---

## 🎯 Overview

This project demonstrates a scalable, enterprise-grade music management API that transforms a monolithic server application into a modular **Model-View-Controller (MVC)** architecture. It implements industry-standard security practices including JWT-based authentication and bcrypt password hashing.

The system manages a one-to-many relationship between **Songs** (primary entities) and **Reviews** (secondary entities), showcasing professional database design patterns using MongoDB references.

### Why This Project?

- **Learning MVC**: Understand separation of concerns in real-world applications
- **Security Best Practices**: Implement JWT authentication and RBAC from scratch
- **Database Relationships**: Master MongoDB references and population techniques
- **API Design**: Build RESTful endpoints following industry conventions

---

## ✨ Features

### 🏗️ Architecture
- **MVC Pattern**: Clean separation between Models, Views (Routes), and Controllers
- **Modular Design**: Easy to maintain, test, and scale
- **RESTful API**: Follows REST conventions for predictable endpoints

### 🔐 Security
- **JWT Authentication**: Stateless, scalable authentication mechanism
- **Password Hashing**: Bcrypt with salt rounds for secure password storage
- **Role-Based Access Control**: Three-tier permission system (Guest, User, Admin)
- **Protected Routes**: Middleware-based route protection

### 🗄️ Database
- **MongoDB Integration**: NoSQL database with Mongoose ODM
- **Data Relationships**: One-to-many relationships using ObjectId references
- **Schema Validation**: Built-in data validation at the model level

### 🎨 Frontend
- **Simple UI**: HTML/CSS/JS interface for testing
- **CORS Enabled**: Ready for frontend integration

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JSON Web Token (JWT) |
| **Security** | Bcrypt.js |
| **Environment** | Dotenv |
| **Middleware** | CORS, Body-Parser |

---

## 🏛 Architecture

This project follows the **MVC (Model-View-Controller)** pattern with an additional middleware layer for security:

```
┌─────────────────────────────────────────────────┐
│                   CLIENT REQUEST                 │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │   MIDDLEWARE LAYER   │
         │  • Authentication    │
         │  • Authorization     │
         │  • CORS              │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │    ROUTES (Views)    │
         │  • Auth Routes       │
         │  • Song Routes       │
         │  • Review Routes     │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │    CONTROLLERS       │
         │  • Business Logic    │
         │  • Error Handling    │
         │  • Response Format   │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │      MODELS          │
         │  • User Schema       │
         │  • Song Schema       │
         │  • Review Schema     │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │    MONGODB DATABASE  │
         └──────────────────────┘
```

### Data Models

#### 👤 User Model
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date
}
```

#### 🎵 Song Model (Primary Entity)
```javascript
{
  title: String (required),
  artist: String (required),
  album: String,
  genre: String,
  releaseYear: Number,
  createdAt: Date
}
```

#### ⭐ Review Model (Secondary Entity)
```javascript
{
  reviewText: String (required),
  rating: Number (1-5, required),
  song: ObjectId (ref: 'Song', required),
  user: ObjectId (ref: 'User'),
  createdAt: Date
}
```

**Relationship**: Each Review references a Song via `ObjectId`, establishing a one-to-many relationship (one song can have many reviews).

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Postman** (optional, for API testing) - [Download here](https://www.postman.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/secure-music-api.git
   cd secure-music-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/musicdb?retryWrites=true&w=majority
   
   # JWT Secret (use a strong, random string)
   JWT_SECRET=your_super_secret_key_min_32_characters_long
   
   # Server
   PORT=3000
   NODE_ENV=development
   ```

   ⚠️ **Important**: Never commit the `.env` file to version control. It's already included in `.gitignore`.

4. **Start the server**
   ```bash
   # Development mode
   npm start
   
   # Production mode
   npm run prod
   ```

5. **Verify the setup**
   
   You should see:
   ```
   🚀 Server running on port 3000
   ✅ Connected to MongoDB
   ```

6. **Access the application**
   - **Frontend**: Open `http://localhost:3000` in your browser
   - **API**: Use Postman or curl to interact with endpoints

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Required
Most endpoints require a JWT token. Include it in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

### 🔑 Authentication Endpoints

#### Register a New User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "role": "user"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "role": "user"
  }
}
```

#### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "role": "user"
  }
}
```

---

### 🎵 Song Endpoints (Primary Resource)

#### Get All Songs
```http
GET /api/songs
```
**Access:** Public  
**Response:** Array of all songs

#### Get Single Song
```http
GET /api/songs/:id
```
**Access:** Public  
**Response:** Single song object with associated reviews

#### Create a Song
```http
POST /api/songs
```
**Access:** Admin only  
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "album": "A Night at the Opera",
  "genre": "Rock",
  "releaseYear": 1975
}
```

#### Update a Song
```http
PUT /api/songs/:id
```
**Access:** Admin only  
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Updated Title"
}
```

#### Delete a Song
```http
DELETE /api/songs/:id
```
**Access:** Admin only  
**Headers:** `Authorization: Bearer <token>`

---

### ⭐ Review Endpoints (Secondary Resource)

#### Get All Reviews
```http
GET /api/reviews
```
**Access:** Public  
**Response:** Array of reviews with populated song information

#### Get Reviews for a Specific Song
```http
GET /api/reviews/song/:songId
```
**Access:** Public

#### Create a Review
```http
POST /api/reviews
```
**Access:** Authenticated users  
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "reviewText": "Absolutely amazing song! A timeless classic.",
  "rating": 5,
  "song": "507f1f77bcf86cd799439011"
}
```

#### Update a Review
```http
PUT /api/reviews/:id
```
**Access:** Review owner or Admin  
**Headers:** `Authorization: Bearer <token>`

#### Delete a Review
```http
DELETE /api/reviews/:id
```
**Access:** Review owner or Admin  
**Headers:** `Authorization: Bearer <token>`

---

### 📊 Response Format

All API responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

---

## 🔒 Security Implementation

This API implements multiple layers of security to protect user data and ensure authorized access.

### 1. Password Security

**Hashing with Bcrypt:**
- Passwords are never stored in plain text
- Bcrypt with 12 salt rounds is used for hashing
- Implemented as a Mongoose pre-save hook in the User model

```javascript
// In models/User.js
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
```

### 2. JWT Authentication

**Token Generation:**
- JWT tokens are generated upon successful login
- Tokens contain user ID and role information
- Tokens expire after 7 days (configurable)

**Token Verification:**
- Protected routes verify token validity via middleware
- Invalid or expired tokens return 401 Unauthorized

### 3. Role-Based Access Control (RBAC)

| Role | Permissions |
|------|-------------|
| **Guest** | View songs and reviews |
| **User** | All Guest permissions + Create reviews |
| **Admin** | All User permissions + Create/Update/Delete songs |

**Middleware Implementation:**
```javascript
// In middleware/authMiddleware.js

// Verify user is authenticated
exports.protect = async (req, res, next) => { /* ... */ }

// Verify user has required role
exports.restrictTo = (...roles) => {
  return (req, res, next) => { /* ... */ }
}
```

### 4. Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ CORS configuration for cross-origin requests
- ✅ Input validation at model level
- ✅ Error handling without exposing system details
- ✅ Rate limiting (recommended for production)
- ✅ HTTPS enforcement (recommended for production)

---

## 🧪 Testing

### Using Postman

### Test Scenarios

#### ✅ Success Case: Admin Creates a Song

1. **Login as Admin**

   
2. **Copy the JWT token** from the response

3. **Create a Song**
<img width="1994" height="1122" alt="屏幕截图 2026-01-28 145222" src="https://github.com/user-attachments/assets/759366ce-a58b-4eb5-9adb-f078801fb43e" />

   
4. **Expected Result:** `201 Created` with song data

#### ❌ Failure Case: User Attempts to Create a Song

1. **Login as User** (not admin)


2. **Attempt to Create a Song**

<img width="1993" height="1057" alt="屏幕截图 2026-01-28 145702" src="https://github.com/user-attachments/assets/2d269217-22f9-4586-838d-15690185fe62" />

3. **Expected Result:** `403 Forbidden` - "You do not have permission to perform this action"

## 📁 Project Structure

```
secure-music-api/
│
├── 📁 models/                  # Database Schemas
│   ├── User.js                 # User model with password hashing
│   ├── Song.js                 # Song model (primary entity)
│   └── Review.js               # Review model (secondary entity)
│
├── 📁 controllers/             # Business Logic
│   ├── authController.js       # Authentication logic (register/login)
│   ├── songController.js       # CRUD operations for songs
│   └── reviewController.js     # CRUD operations for reviews
│
├── 📁 routes/                  # API Endpoints
│   ├── authRoutes.js           # /api/auth routes
│   ├── songRoutes.js           # /api/songs routes
│   └── reviewRoutes.js         # /api/reviews routes
│
├── 📁 middleware/              # Custom Middleware
│   └── authMiddleware.js       # JWT verification & RBAC
│
├── 📁 public/                  # Frontend Assets
│   ├── index.html              # Main HTML page
│   ├── styles.css              # Styling
│   └── script.js               # Client-side JavaScript
│
├── 📁 config/                  # Configuration Files
│   └── database.js             # MongoDB connection logic
│
├── 📄 server.js                # Application Entry Point
├── 📄 package.json             # Dependencies & Scripts
├── 📄 .env                     # Environment Variables (not committed)
├── 📄 .gitignore               # Git ignore rules
├── 📄 README.md                # Project Documentation
└── 📄 Assignment4_Postman_Collection.json  # Postman test collection
```


</div>
