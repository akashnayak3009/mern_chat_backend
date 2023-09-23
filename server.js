import express from "express";
import { chats } from "./data/data.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Port Connection
const port = process.env.PORT;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold.underline);
});

//  Socket.io server
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("connected to socket.io".red.bold.italic);

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    });

    
    socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

});
