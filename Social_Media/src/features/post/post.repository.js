import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import { postSchema } from "./post.schema.js";
import { userSchema } from "../user/user.schema.js";
import { commentSchema } from "../comment/comment.schema.js";

const postModel = mongoose.model("post", postSchema);
const userModel = mongoose.model("user", userSchema);
const commentModel = mongoose.model("usercomment", commentSchema);

class postRepository {
  constructor() {
    this.collection = 'post'
                }
  async postupload(postdata , user_id){
    try{
      console.log(user_id)
      const user= await userModel.findById(user_id)
      console.log(user);
      if(user){
      const newpost = new postModel(postdata);
      newpost.userId = user_id;
      const savedPost = await newpost.save();
      return savedPost;
    }
    else{
      throw Error('User not found');
    }
    }
  catch (err) {
    console.log(err)
    throw "Something went wrong with database";
  }}
// post retrive
async getAllposts(){
  //console.log(this.collection)
   let posts =await postModel.find().sort({createdAt: -1});
  
   return posts;
 }

  // post update
  async postupdate(postid, userid, userdata) {
    console.log(postid, userid, userdata);
  
    try {
      // Assuming postModel is defined elsewhere
      let user = await postModel.find({
        userId : new ObjectId(userid)
        });
      if(user){
      let post = await postModel.findOneAndUpdate(
        { _id: new ObjectId(postid)},
        { $set: { caption: userdata.caption, imageUrl: userdata.imageUrl } },
        { new: true }
      );
      if (!post) {
        console.log("This Post does not exist");
        return "post not exist"; // Indicate that the post doesn't exist
      }
      console.log(post);
      return post;
  }else{
    throw 'User Not Found';
  }
    } catch (error) {
      console.error("Error in Updation:", error);
      throw new Error("Error in updating the data");
    }
  }
  
  // post delete
  async deletePost(postid , userid) {
    try {
      const user = await postModel.find({userId : userid});
      if(!user) {
          throw "No User found"
      }
      else{
      const post = await postModel.findByIdAndDelete({_id : new ObjectId(postid) , userId:userid});
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    }
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error('Could not delete post');
    }
  }
  

  // comment
  /*
async comment(user_id , postId , comment){
  try{
   const posttoUpdate = await postModel.findById(postId);
   if(!posttoUpdate){
    throw new Error("Post not found");
   }
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
*/
}
  export default postRepository;
  


