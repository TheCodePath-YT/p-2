import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./src/features/user/user.routes.js";
import router from "./src/features/post/post.routes.js";
import cookieParser from "cookie-parser";
import { appLevelErrorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
import mongoose from "mongoose";
import likeRouter from "./src/features/like/like.route.js";
import { auth } from "./src/middlewares/jwtAuth.js";
import commentrouter from "./src/features/comment/comment.route.js";
import friendsRouter from "./src/features/friendshipFeature/friend.route.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/socialworld/api/user", userRouter);

app.use("/socialworld/api/post", router);

app.use("/socialworld/api/like",auth, likeRouter);

app.use("/socialworld/api/comment",auth, commentrouter);

app.use("/socialworld/api/friend",auth, friendsRouter);

app.use(appLevelErrorHandlerMiddleware);

export default app;
