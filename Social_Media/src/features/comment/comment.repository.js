import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import { postSchema } from "../post/post.schema.js";
import { userSchema } from "../user/user.schema.js";
import { commentSchema } from "./comment.schema.js";

const postModel = mongoose.model("post", postSchema);
const userModel = mongoose.model("user", userSchema);
const commentModel = mongoose.model("usercomment", commentSchema);

class commentRepository {
  constructor() {
    this.collection = 'Comment'
                }

  // comment
async addcomment(user_id , postId , comment){
  try{
   const posttoUpdate = await postModel.findById(postId);
   if(!posttoUpdate){
    throw new Error("Post not found");
   }
   posttoUpdate.comment.userId = user_id,
//    posttoUpdate.comment.postId = postId,
//    posttoUpdate.comment.comment = comment
   await posttoUpdate.save();
   const usercomment = await commentModel.findOne({postId : new ObjectId(postId) ,userId : new ObjectId(user_id)})
   console.log("usercomment" , usercomment)
   if(usercomment){
    usercomment.comment = comment ;
    await usercomment.save();
   }else{
    const newReview = new commentModel({postId: new ObjectId(postId) , userId: new ObjectId(user_id),comment});
    newReview.save();
}
  }catch (err) {
    console.log(err)
    throw new Error("Something went wrong with database", 500);
}}
async getAllcomment() {
    const comment = await commentModel.find();
    console.log(comment)
    return comment;
}

async updatecomment(commentId, userdata) {
    console.log(commentId);
    const comment = await commentModel.findById(commentId);
    if (!comment) {
        throw new Error('No Comment Found');
      }
    
    let updatedField=await comment.updateOne({...userdata}, {new: true});
    return updatedField;
    // let updatedcomment = await comment.save();
    // return updatedcomment;
}
async deletecomment(commentId){
    const deletedComment = await commentModel.findByIdAndDelete(commentId);
    if (!deletedComment) {
        throw new NotFoundError('This comment does not exist');
      }
    return deletedComment;
}
}
  export default commentRepository;
  


