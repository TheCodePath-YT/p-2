
import objectId from "mongoose";
import mongoose from "mongoose";
import commentRepository from "./comment.repository.js";

export default class commentController {
  constructor() {
    this.commentRepository = new commentRepository();
  }

  // Comment a particular post : localhost:3000/socialworld/api/post/comment : data : PostId & comment
  async postcomment(req, res, next) {
    try {
      const userId = req._id;
      const postId = req.body.postId;
      const comment = req.body.comment;
      const commentResult = await this.commentRepository.addcomment(userId, postId, comment);
      console.log(userId, postId, comment, commentResult);
      return res.status(200).send(comment);
    } catch (err) {
      console.log("Passing Error to Middleware", err)
      next(err);
    }
  }
  // Get All comment
  async getAllcomment(req, res, next) {
    try {
      const comment = await this.commentRepository.getAllcomment();
      if (!comment) {
        return res.status(404).send("No comment that post");
      }
      return res.status(200).send(comment);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to find comment" });
    }
  }


  // Comment update
  async updatecomment(req, res, next) {
    let id = req.params.id;
    //console.log('Params', params);
    try {
      const updatedComment = await this.commentRepository.updatecomment(id, req.body);
      if (!updatedComment) {
        return res.status(404).send("Comment not found");
      } else {
        return res.status(201).send("Comment update successfully");
      }
    } catch (error) {
      console.log("Error in updating the Comment", error);
      return res.status(500).json({ error: "Internal server error" });

    } 
  }

  async deletecomment(req ,res,next){
 const commentId=req.params.id;
try{
   const deleted=await this.commentRepository.deletecomment(commentId);
   if(!deleted){
     return res.status(400).send("The comment is not exist!");
   }else{
     return res.status(200).send("Delete Successfully")
   }
}catch(e){
return res.status(500).send("Server Error")
}
  }
}