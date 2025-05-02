Creator Dashboard Backend
Overview
This is the backend API for the Creator Dashboard application, built with Node.js, Express, and MongoDB. It provides endpoints for user authentication, social media feed aggregation (Reddit and TechCrunch), and admin functionalities like user management and analytics.
Features

User Authentication: Register and login users with JWT-based authentication.
Social Media Feed: Fetches posts from Reddit and TechCrunch using their APIs.
Admin Dashboard: Allows admins to view analytics, manage users (adjust credits, delete users), and monitor activity.
MongoDB Integration: Stores user data and session information.

Project Structure
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

Prerequisites

Node.js (v22.2.0 or higher)
MongoDB Atlas account
Reddit API credentials
NewsAPI key (for TechCrunch)

Setup Instructions
1. Clone the Repository
git clone https://github.com/TechWithAnish/creator-dashboard-backend.git
cd creator-dashboard-backend

2. Install Dependencies
npm install

3. Configure Environment Variables
Create a .env file in the root directory and add the following:
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/vertx?retryWrites=true&w=majority
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USERNAME=your_reddit_username
REDDIT_PASSWORD=your_reddit_password
JWT_SECRET=your_jwt_secret
NEWSAPI_KEY=your_newsapi_key
PORT=5000


Replace the placeholders with your actual credentials.


4. Run the Server Locally
node server.js


The server should start on http://localhost:5000.

API Endpoints
Authentication

POST /api/auth/register
Register a new user.
Body: { "username": "string", "email": "string", "password": "string" }


POST /api/auth/login
Log in a user and return a JWT token.
Body: { "email": "string", "password": "string" }



Feed

GET /api/feed
Fetch social media posts from Reddit and TechCrunch.



Admin (Protected Routes)

GET /api/admin/analytics
Get analytics (total users, active users, credits spent).
Requires admin role and JWT token.


GET /api/admin/users
Get all users.
Requires admin role and JWT token.


DELETE /api/admin/users/:id
Delete a user by ID (non-admin users only).
Requires admin role and JWT token.


PUT /api/admin/users/:id/credits
Adjust credits for a user.
Requires admin role and JWT token.
Body: { "credits": number }



Deployment
The backend is deployed on Render.
Deployed URL

URL: https://creator-dashboard-backend-muwx.onrender.com

Deployment Steps

Push the code to GitHub: https://github.com/TechWithAnish/creator-dashboard-backend.
Create a new Web Service on Render:
Connect the GitHub repository.
Set the following environment variables in Render:
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/vertx?retryWrites=true&w=majority
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USERNAME=your_reddit_username
REDDIT_PASSWORD=your_reddit_password
JWT_SECRET=your_jwt_secret
NEWSAPI_KEY=your_newsapi_key
PORT=5000

Build Command: npm install
Start Command: node server.js


Deploy the service and verify the deployed URL.

Testing

Test locally using Postman or a similar tool.
Example: GET http://localhost:5000/api/feed to fetch posts.
Test the deployed backend: GET https://creator-dashboard-backend-muwx.onrender.com/api/feed.

Dependencies

express: Web framework
mongoose: MongoDB ORM
jsonwebtoken: JWT authentication
bcryptjs: Password hashing
axios: HTTP requests for Reddit and NewsAPI
dotenv: Environment variable management

License
This project is for educational purposes and not licensed for commercial use.
