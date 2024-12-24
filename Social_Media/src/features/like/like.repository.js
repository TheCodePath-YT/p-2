import { ObjectId } from "mongodb";
import { likeSchema } from "./like.schema.js";
import mongoose from "mongoose";
import { postSchema } from "../post/post.schema.js";
import { userSchema } from "../user/user.schema.js";


const likeModel = mongoose.model("Like", likeSchema)
const postModel = mongoose.model("post", postSchema)
const userModel = mongoose.model("user", userSchema)

export class LikeRepository {
    async likePost(userId, postId) {
        try {
            console.log(userId, postId.postid);
    
            // Convert postId to ObjectId
            // const postObjectId = new ObjectId(postId);
            const posttoUpdate = await postModel.findById({_id : new ObjectId(postId.postid)});
           console.log(posttoUpdate)
            if(!posttoUpdate){
             throw new Error("Post not found");
            }else{
            console.log("UserId" , userId , "post" , postId)
            posttoUpdate.like = userId;
            await posttoUpdate.save();
            const newLike = new likeModel({
                user: userId,
                post: postId.postid // Use the converted ObjectId
            });
            await newLike.save();
            return newLike; // Return the newly created like\
        }
        } catch (err) {
            console.error(err);
            throw new Error("Something went wrong while liking the post");
        }
    }
    async getLikes() {
        try {
     return await likeModel.find()
    }catch (err) {
    console.log(err);
    throw new Error("Something went wrong", 500);
}}

async getLikesbyId(postid) {
    try {
        console.log("id",postid)
    const likee = await likeModel.find({post : postid}).populate('user');
        console.log(likee)
    return likee;
}catch (err) {
console.log(err);
throw new Error("Something went wrong", 500);
}}
   
}
