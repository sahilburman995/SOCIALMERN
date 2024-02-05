import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);



io.on("connection", (socket) => {
  console.log("connected user");
  console.log("id", socket.id);
  socket.broadcast.emit("welcome", `welcome to the server${socket.id}`);

  socket.on("send", (sa) => {
    console.log(sa);
  });
  socket.on("message", ({ room, message }) => {
    console.log({ room, message });
    io.to(room).emit("recive", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
