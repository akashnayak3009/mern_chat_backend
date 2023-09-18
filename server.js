import express from 'express';
import { chats } from './data/data.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message',messageRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, console.log(`Server is running port ${port}`.yellow.bold.italic.underline));
