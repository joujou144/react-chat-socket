## Real-Time Chat Application

### Overview

This is a real-time chat application built using React, Vite, Express, and Socket.io. The application allows users to connect, send messages, and see real-time typing indicators.

### Features

- Real-time messaging
- User connection/disconnection notifications
- Typing indicators
- Unique user identification
- Responsive design

## Technologies Used

### Frontend
- React
- Vite
- Socket.io Client
- Tailwind CSS

### Backend
- Node.js
- Express
- Socket.io
- CORS

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Installation

### Clone the Repository
```
git clone https://your-repository-url.git
cd your-project-name
```
### Setup Backend
```
cd server
npm install
```
### Setup Frontend
```
cd ../client
npm install
```
## Running the Application
### Start Backend Server
```
cd server
npm start
```
### Start Frontend Development Server
```
cd client
npm run dev
```
### Access the Application
Open `http://localhost:5173 in your browser`

### Project Structure
```
project-root/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.tsx
│   │   └── main.tsx
│
└── server/                 # Express backend
    ├── index.js
    └── package.json
```
### Key Components
Frontend

- SocketContext: Manages Socket.io connection
- Chat Component: Renders chat interface and handles messaging

Backend

Socket.io Event Handlers:

- connection: Handles new user connections
- message: Broadcasts messages to all users
- activity: Manages typing indicators
- userDisconnected: Handles user disconnections

