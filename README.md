# Creator Dashboard Backend :rocket:

## Overview
This is the **backend API** for the *Creator Dashboard* application, built with **Node.js**, **Express**, and **MongoDB**. It provides endpoints for user authentication, social media feed aggregation (Reddit and TechCrunch), and admin functionalities like user management and analytics.

> [!NOTE]  
> This backend powers the Creator Dashboard frontend, enabling seamless user interaction with social media feeds and admin tools.

## Features
- **User Authentication**: Register and login users with JWT-based authentication.
- **Social Media Feed**: Fetches posts from Reddit and TechCrunch using their APIs.
- **Admin Dashboard**: Allows admins to view analytics, manage users (adjust credits, delete users), and monitor activity.
- **MongoDB Integration**: Stores user data and session information using `mongoose` for schema management.

## Project Structure
```
creator-dashboard-backend/
├── middleware/        # Middleware for authentication
│   └── auth.js
├── models/            # Mongoose models
│   └── User.js
├── routes/            # API routes
│   ├── admin.js
│   ├── auth.js
│   └── feed.js
├── .env               # Environment variables (not tracked in Git)
├── server.js          # Main server file
└── package.json       # Dependencies and scripts
```

## Prerequisites
Before setting up the project, ensure you have the following:

- **Node.js** (v22.2.0 or higher)  
- **MongoDB Atlas** account  
- **Reddit API** credentials  
- **NewsAPI** key (for TechCrunch)

> [!TIP]  
> You can sign up for a free MongoDB Atlas account to host your database in the cloud. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to get started.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/TechWithAnish/creator-dashboard-backend.git
cd creator-dashboard-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory with the following content:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/vertx?retryWrites=true&w=majority
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USERNAME=your_reddit_username
REDDIT_PASSWORD=your_reddit_password
JWT_SECRET=your_jwt_secret
NEWSAPI_KEY=your_newsapi_key
PORT=5000
```

- Replace the placeholders with your actual credentials.

### 4. Run the Server Locally
```bash
node server.js
```
The server will start on `http://localhost:5000`.  
> [!CAUTION]  
> Ensure MongoDB Atlas allows connections from your IP address. Update the network access settings in your MongoDB Atlas dashboard if you encounter connection errors.

## API Endpoints

### Authentication
- **POST /api/auth/register**  
  Register a new user.  
  **Request Body**:  
  ```json
  { "username": "string", "email": "string", "password": "string" }
  ```
- **POST /api/auth/login**  
  Log in a user and return a JWT token.  
  **Request Body**:  
  ```json
  { "email": "string", "password": "string" }
  ```

### Feed
- **GET /api/feed**  
  Fetch social media posts from Reddit and TechCrunch.  
  **Example Response**:  
  ```json
  [
    { "title": "Reddit Post 1", "source": "Reddit" },
    { "title": "TechCrunch Post 1", "source": "TechCrunch" }
  ]
  ```

### Admin (Protected Routes)
These routes require a JWT token in the `Authorization` header: `Bearer <token>`.

1. **GET /api/admin/analytics**  
   Get analytics (total users, active users, credits spent).
2. **GET /api/admin/users**  
   Get all users.
3. **DELETE /api/admin/users/:id**  
   Delete a user by ID (non-admin users only).
4. **PUT /api/admin/users/:id/credits**  
   Adjust credits for a user.  
   **Request Body**:  
   ```json
   { "credits": number }
   ```

## Deployment
The backend is deployed on **Render** :sparkles:.

### Deployed URL
- [Backend API](https://creator-dashboard-backend-muwx.onrender.com)

### Deployment Steps
1. **Push the Code to GitHub**  
   - Repository: [Backend Repository](https://github.com/TechWithAnish/creator-dashboard-backend)
2. **Create a New Web Service on Render**  
   - Connect the GitHub repository.  
   - Set the following environment variables in Render:  
     ```
      MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/vertx?retryWrites=true&w=majority
      REDDIT_CLIENT_ID=your_reddit_client_id
      REDDIT_CLIENT_SECRET=your_reddit_client_secret
      REDDIT_USERNAME=your_reddit_username
      REDDIT_PASSWORD=your_reddit_password
      JWT_SECRET=your_jwt_secret
      NEWSAPI_KEY=your_newsapi_key
      PORT=5000
     ```
   - **Build Command**: `npm install`  
   - **Start Command**: `node server.js`
3. **Deploy the Service**  
   - Verify the deployed URL by testing endpoints like `/api/feed`.

## Testing
### Local Testing
- Use a tool like Postman.
- Example: Send a GET request to `http://localhost:5000/api/feed` to fetch posts.

### Deployed Testing
- Test the deployed backend: [Backend API Feed](https://creator-dashboard-backend-muwx.onrender.com/api/feed).  
- **Expected Response**: A JSON array of posts from Reddit and TechCrunch.

## Dependencies
- `express`: Web framework for building the API.
- `mongoose`: MongoDB ORM for schema management.
- `jsonwebtoken`: For JWT-based authentication.
- `bcryptjs`: Password hashing for secure user registration.
- `axios`: HTTP client for Reddit and NewsAPI requests.
- `dotenv`: Loads environment variables from `.env`.

## To-Do List
- [x] Deploy backend on Render
- [ ] Add support for more social media platforms
- [ ] Implement rate limiting for API endpoints

## Acknowledgments
Special thanks to @TechWithAnish for developing this project! :clap:  
Learn more about Markdown formatting in the [GitHub Docs][1].

## License
This project is for **educational purposes** and not licensed for commercial use.

<!-- Hidden comment: Add more API endpoints in the future -->

[^1]: This example configuration is based on the project setup shared during development. Ensure your MongoDB Atlas credentials are secure and not exposed publicly.