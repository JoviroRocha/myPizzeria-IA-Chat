# myPizzeria-IA-Chat

A simple chatbox application that leverages AI to support and attend to customers in real time.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Setup and Installation](#setup-and-installation)

  - [Backend](#backend)
  - [Frontend](#frontend)

- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Usage](#usage)

---

## Features

- AI-powered customer chat support
- Real-time messaging between user and AI
- User-friendly interface built with Next.js
- Robust backend with Node.js, Express, and Sequelize
- MySQL database for persisting conversations

## Technologies

- **Backend:** Node.js, Express, Sequelize (ORM)
- **Database:** MySQL
- **Frontend:** React, Next.js
- **AI Integration:** OpenAI API

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)
- An OpenAI API key

## Environment Variables

The application relies on environment-specific variables to connect services and secure API access. Below are the keys required for each part of the project:

### Backend:

- FRONTEND_URL: URL where the frontend is served
- DB_NAME: database name
- DB_USER: database user
- DB_HOST: database host
- DB_PASSWORD: database password
- OPENAI_KEY: AI service API key

### Frontend:

- BACKEND_URL: URL where the backend is served

## Setup and Installation

### Backend

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure the `.env` file as shown above.
4. Run database migrations:

   ```bash
   npx sequelize db:migrate
   ```

### Frontend

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure the `.env.local` file as shown above.

## Database Setup

1. Ensure MySQL is running and accessible.
2. Create the database if it doesn’t exist:

   ```sql
   CREATE DATABASE chat_ai;
   ```

3. Run Sequelize migrations from the backend directory:

   ```bash
   cd backend
   npx sequelize db:migrate
   ```

## Running the Application

### Start Backend Server

In one terminal, run:

```bash
cd backend
npm run start
```

### Start Frontend Client

In another terminal, run:

```bash
cd frontend
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Type your message in the chat input box.
3. Press `Enter` or click `Send` to submit your query.
4. The AI will respond in real-time. All conversations are persisted in MySQL.
