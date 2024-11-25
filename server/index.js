import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3500;

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // React Vite default port
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  io.emit("userConnected", socket.id.substring(0, 5));

  // Broadcast to all users when a new user connects
  socket.broadcast.emit(
    "message",
    `User ${socket.id.substring(0, 5)} connected`
  );

  // Handle incoming messages
  socket.on("message", (data) => {
    io.emit("message", data);
  });

  let typingTimeouts = {};

  socket.on("activity", ({ userId, isTyping }) => {
    // Clear any existing timeout for this user
    if (typingTimeouts[userId]) {
      clearTimeout(typingTimeouts[userId]);
    }

    // Broadcast that the user is typing or stopped typing
    socket.emit("activity", { userId, isTyping });

    // If typing is true, set a timeout to stop typing
    if (isTyping) {
      typingTimeouts[userId] = setTimeout(() => {
        socket.emit("activity", { userId, isTyping: false });
        delete typingTimeouts[userId];
      }, 3000);
    }
  });

  // Handle disconnection
  socket.on("userDisconnected", () => {
    socket.broadcast.emit(
      "message",
      `User ${socket.id.substring(0, 5)} disconnected`
    );
    io.emit("userDisconnected", socket.id.substring(0, 5));
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
