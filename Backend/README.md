# StudyAI Platform Backend

This is the backend for the StudyAI Platform, built with Node.js, Express, and MongoDB (Mongoose). It provides RESTful APIs for user management, authentication, study material, exams, and more.

## Table of Contents
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Middlewares](#middlewares)
- [Utils](#utils)

---

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the `Backend/` directory with your MongoDB and Cloudinary credentials.
3. Start the server:
   ```bash
   npm start
   ```

## Environment Variables
```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Folder Structure
```
Backend/
  app.js
  index.js
  constants.js
  db/
    db.js
  controllers/
    user.controller.js
    otp.controller.js
  middlewares/
    multer.middleware.js
  models/
    admin.model.js
    answer.model.js
    exam.model.js
    material.model.js
    mentor.model.js
    otp.model.js
    post.model.js
    question.model.js
    student.model.js
    studentExam.model.js
    user.model.js
  public/
    temp/
  routes/
    user.routes.js
  utils/
    ApiError.js
    ApiResponse.js
    asyncHandler.js
    cloudinary.js
    mailSender.js
```

## API Endpoints

### User Routes (`/api/v1/user`)
- `POST /register` — Register a new user
- `POST /login` — User login
- `POST /send-otp` — Send OTP for verification
- `POST /verify-otp` — Verify OTP
- `GET /profile` — Get user profile (protected)

### Study Material
- `POST /material/upload` — Upload study material (PDF, video, notes, quiz)
- `GET /material` — Get all study materials
- `GET /material/:id` — Get study material by ID

### Exams
- `POST /exam/create` — Create a new exam
- `GET /exam` — Get all exams
- `GET /exam/:id` — Get exam by ID
- `POST /exam/submit` — Submit exam answers

### More endpoints are available for admin, mentor, and student management.

## Database Models
- **User**: Handles user data and authentication
- **Admin**: Admin user data
- **Mentor**: Mentor user data
- **Student**: Student user data
- **OTP**: OTP verification
- **StudyMaterial**: Title, description, subject, type (pdf, video, notes, quiz), url, uploaded_by, created_at
- **Exam**: Exam details and questions
- **Answer**: Student answers
- **Post**: Forum or announcement posts
- **Question**: Exam questions
- **StudentExam**: Student exam attempts

## Middlewares
- **multer.middleware.js**: Handles file uploads (e.g., profile pictures, study materials)

## Utils
- **cloudinary.js**: Uploads files to Cloudinary
- **ApiError.js**: Custom error handler
- **ApiResponse.js**: Standard API response format
- **asyncHandler.js**: Async error handling for Express routes
- **mailSender.js**: Sends emails (e.g., OTP)

---

## License
This project is for educational purposes.
