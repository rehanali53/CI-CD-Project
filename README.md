# 🚀 Simple Full-Stack Application

A simple full-stack application with React frontend and Express.js backend, deployed using Docker, GitHub Actions, and Railway.

## 📋 Features

- **Frontend**: React.js with modern UI
- **Backend**: Express.js REST API
- **Containerization**: Separate Dockerfiles for frontend and backend
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Deployment**: Railway for hosting (trial account compatible)
- **Health Checks**: Built-in health monitoring
- **Security**: Non-root users in containers, security headers

## 🏗️ Project Structure

```
├── backend/
│   ├── server.js          # Express.js server
│   ├── package.json       # Backend dependencies
│   ├── Dockerfile         # Backend container
│   └── railway.json       # Railway config
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Styling
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── package.json       # Frontend dependencies
│   ├── Dockerfile         # Frontend container
│   ├── nginx.conf         # Nginx configuration
│   └── railway.json       # Railway config
├── .github/
│   └── workflows/
│       └── deploy.yml     # CI/CD pipeline
├── docker-compose.yml     # Local development
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd simple-fullstack-app
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Manual Setup

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Frontend Setup** (in another terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 🐳 Docker Commands

### Build and Run Backend
```bash
cd backend
docker build -t simple-backend .
docker run -p 5000:5000 simple-backend
```

### Build and Run Frontend
```bash
cd frontend
docker build -t simple-frontend .
docker run -p 3000:3000 simple-frontend
```

## 🚂 Railway Deployment

### Prerequisites for Railway

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Repository**: Push your code to GitHub
3. **Railway Token**: Generate from Railway dashboard

### Deployment Steps

1. **Create Railway Project**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Configure Services**
   - Add two services: `backend` and `frontend`
   - Set root directories: `./backend` and `./frontend`
   - Railway will auto-detect Dockerfiles

3. **Set Environment Variables**
   
   **Backend Service:**
   ```
   NODE_ENV=production
   PORT=5000
   ```
   
   **Frontend Service:**
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```

4. **Deploy**
   - Railway will automatically build and deploy
   - Get your URLs from the Railway dashboard

### Railway Configuration

The project includes `railway.json` files for each service with:
- Docker build configuration
- Health check endpoints
- Restart policies
- Start commands

## 🔄 CI/CD with GitHub Actions

### Setup GitHub Secrets

Add these secrets to your GitHub repository:

1. `RAILWAY_TOKEN`: Your Railway authentication token
2. `RAILWAY_PROJECT_ID`: Your Railway project ID

### Workflow Features

- **Testing**: Runs tests on both frontend and backend
- **Building**: Builds frontend for production
- **Deployment**: Automatically deploys to Railway on main branch
- **Parallel Deployment**: Deploys both services simultaneously

### Manual Trigger

The workflow runs on:
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

## 📡 API Endpoints

### Backend API (Port 5000)

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

### Frontend (Port 3000)

- `GET /` - Main application
- `GET /health` - Frontend health check

## 🔧 Environment Variables

### Backend
```env
PORT=5000
NODE_ENV=development
```

### Frontend
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🏥 Health Checks

Both services include health check endpoints:
- **Backend**: `/api/health` - Returns server status and uptime
- **Frontend**: `/health` - Returns simple health status

## 🔒 Security Features

- Non-root users in Docker containers
- Security headers in Nginx configuration
- CORS enabled for cross-origin requests
- Input validation on API endpoints

## 📊 Monitoring

- Health checks every 30 seconds
- Automatic restart on failure
- Uptime monitoring via Railway
- Error logging and handling

## 🛠️ Development Tips

1. **Hot Reload**: Use `npm run dev` for backend development
2. **Environment**: Set `NODE_ENV=development` for detailed logs
3. **API Testing**: Use the frontend interface or tools like Postman
4. **Logs**: Check Railway dashboard for deployment logs

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure ports 3000 and 5000 are available
2. **Docker Build Fails**: Check Dockerfile syntax and dependencies
3. **Railway Deployment**: Verify environment variables and build logs
4. **CORS Errors**: Ensure `REACT_APP_API_URL` is set correctly

### Debug Commands

```bash
# Check Docker containers
docker ps

# View container logs
docker logs <container-id>

# Test API endpoints
curl http://localhost:5000/api/health
curl http://localhost:3000/health
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with Docker
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review Railway deployment logs
- Open an issue on GitHub

---

**Happy Coding! 🎉**
