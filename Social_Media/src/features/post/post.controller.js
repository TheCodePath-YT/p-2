import { customErrorHandler } from "../../middlewares/errorHandler.js";
import postRepository from './post.repository.js'
import objectId from "mongoose";
import mongoose from "mongoose";

export default class postController{
  constructor() {
    this.postRepository = new postRepository();
  }
//  Create a post : localhost:3000/socialworld/api/post/upload/:id
async postupload(req, res, next)  {
  try {
  const user_id = req.params;
  console.log(req.body, user_id.id)
  await this.postRepository.postupload(req.body , user_id.id);
  return res.status(201).json({message: 'Post updated successfully'});
  }catch(err) {
    console.log(err);
    throw Error(err);
  };
}


// Get all posts for all user : 
async getAllposts(req,res,next) {
  let page=parseInt(req.query.page) || 0 ;
  if (isNaN(page)) {
      return res.status(400).send("Invalid Page Number")
  } else {
     page = Math.max(0, page);
  }
  
  try {
    //Getting the data from DB using repository function
    const result = await this.postRepository.getAllposts(page);
    //Sending back the response with status code and data
    return res.status(200).json(result)
                      ;
  } catch (e) {
    //If any error occurs send the error in the catch block alongwith status code.
    next(err);

  }
}

async postupdate(req, res, next) {
  const userid = req.params;
  const postid = req.body.postId; // Assuming you have userid stored in req.userId
  const userdata = req.body;

  try {
    console.log(postid, userid, userdata)
    const result = await this.postRepository.postupdate(postid, userid, userdata);
    
    if (!result) {
      return res.status(400).send('This Post does not exist');
    }
    
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message); // Internal Server Error
  }
}

async postDelete(req,res,next){
  try{
    const postid=req.params;
    const user_id = req._id;
    console.log(req._id);
    const deletedPost=await this.postRepository.deletePost(postid ,user_id);
    if(!deletedPost){
        return res.status(400).send("The post with given ID was not found.");
    }
    return res.status(200).send("Post has been deleted.")
  }catch(e){
    return res.status(500).send("There was a problem deleting the post.")

  }
}

// Comment a particular post : localhost:3000/socialworld/api/post/comment : data : PostId & comment
  
/*
async postcomment(req,res,next){
    try{
      const userId = req._id;
      const postId = req.body.postId;
      const comment = req.body.comment;
     const commentResult = await this.postRepository.comment(userId,postId,comment);
      console.log(userId,postId,comment , commentResult);
      return res.status(200).send(comment);
    }catch (err) {
      console.log("Passing Error to Middleware", err)
      next(err);
    }
  }

*/
}