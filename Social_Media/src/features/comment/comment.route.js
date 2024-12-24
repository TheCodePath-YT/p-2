import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import commentController from "./comment.controller.js";
// import postRepository from "./post.repository.js";
const commentcontroller = new commentController();

const commentrouter = express.Router();

commentrouter.post("/" , (req,res,next) => {
   commentcontroller.postcomment(req,res,next)
});
commentrouter.get("/getAll" , (req,res,next) => {
    commentcontroller.getAllcomment(req,res,next)
});
commentrouter.put("/update/:id" , (req,res,next) => {
    commentcontroller.updatecomment(req,res,next)
});
commentrouter.delete("/delete/:id" , (req,res,next) => {
   commentcontroller.deletecomment(req,res,next)
});

export default commentrouter;
