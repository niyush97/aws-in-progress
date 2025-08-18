# A simple app using Express js and deploying it to Elastic Beanstalk with Docker.
---
### Express js
A RESTful API built with Express.js for managing posts, featuring middleware for logging, error handling, and static file serving.

#### Features
- RESTful API endpoints for posts management
- JSON request/response handling
- Static file serving
- Custom middleware for logging
- Error handling and 404 middleware
- Environment variable configuration
- Docker containerization
- AWS Elastic Beanstalk deployment ready

### Prerequisites
- Node.js  18 or above
- npm
- Docker
- AWS CLI or Management Console

### Installation
1. Clone the repository

```zsh
git clone <your-repository-url>
cd <your-project-name>
```
2. Install dependencies

```bash
npm install
```

3. Create a .env file in the root directory:

```bash
PORT=8080
# Add other environment variables as needed
```

4. Start the development server:

```zsh 
npm start
```

### API Endpoints
#### Posts

- GET /api/posts - Get all posts
- POST /api/posts - Create a new post
- GET /api/posts/:id - Get a specific post
- PUT /api/posts/:id - Update a specific post
- DELETE /api/posts/:id - Delete a specific post

### Project Structure
```text
├── express-docker-ebs/
│   ├── Controllers /
│   │   └── postControllers.js  # Mangaing the post requests
│   ├── routes/
│   │   └── posts-GPUD.js       # Posts routes
│   ├── middleware/
│   │   ├── logger.js           # Custom logging middleware
│   │   ├── notFound.js         # 404 error handler
│   │   └── errorHandler.js     # Global error handler
│   └── src /                   # Static assets
│   │   ├── index.html  
│   │   ├── script.js                 
│   │   └── style.css
├── .gitignore                  # Git ignore file
├── package.json                # Node.js dependencies
├── .package-lock.json          # Optional (to install exact version)
├── Dockerfile                  # Docker configuration
└── README.md                   # This file
```