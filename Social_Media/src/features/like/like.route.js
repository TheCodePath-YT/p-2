import express from "express";
import { LikeController} from "./like.controller.js";


const likeRouter = express.Router();
const likeController = new LikeController();

// Like a Post
likeRouter.post("/",(req,res,next) => {
    likeController.likeItem(req,res,next);
})
// Get All Likes
likeRouter.get("/",(req,res,next) => {
    likeController.getLikes(req,res,next);
})
likeRouter.get("/:id",(req,res,next) => {
    likeController.getLikesbyId(req,res,next);
})
export default likeRouter;