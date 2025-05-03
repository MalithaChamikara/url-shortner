URL Shortener Application

This is a full-stack URL shortener application built with Node.js 18.20, Express, Sequelize, PostgreSQL, React, and Material-UI. It implements all required features, including URL shortening, redirection with an intermediate page, expiration, analytics, filtering, rate limiting, custom aliases, and a mobile-responsive design. The backend uses a modular, functional-based architecture, and the frontend uses Redux for managing the list of loaded URLs and filtering, with URL creation handled directly via Axios.


Features
Core Functionalities:
Shorten long URLs and generate unique short codes or custom aliases.
Redirect short URLs to original URLs via an intermediate page with a 3-second countdown.
Store URLs in a PostgreSQL database using Sequelize.
Basic error handling for invalid URLs.
URL expiration mechanism (default 7 days).
Store loaded URLs in Redux for state management.
Mobile-responsive UI with Material-UI.

Additional Features:
Track click counts for each shortened URL (analytics).
Filter URLs by name or creation date.
Rate limiting (5 URL generations per minute per IP).
Intermediate redirection page with destination details (handled by the backend).
Support for custom short URL aliases.

Prerequisites

Before setting up the application, ensure you have the following installed:

Node.js: Version 18.20
PostgreSQL: Version 13 or higher
Git: For cloning the repository
npm: For installing dependencies

Setup Instructions:

1. Clone the Repository

Clone the repository from GitHub and navigate to the project directory:
  git clone https://github.com/your-username/url-shortener.git
  cd url-shortener

2. Set Up the Backend
Navigate to the backend directory and install the required dependencies:
  cd backend
  npm install
Configure Environment Variables
  DATABASE_URL=postgres://user:password@localhost:5432/url_shortener
  PORT=5000
  FRONTEND_URL=http://localhost:3000
Set Up PostgreSQL Database
  psql -U postgres
  CREATE DATABASE url_shortener;
  \q
Start the Backend Server
  nodemon server.js

3. Setup Front end
Navigate to the frontend directory and install the required dependencies:
  cd ../frontend
  npm install
Start the Frontend Development Server
  npm start
