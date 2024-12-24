import { LikeRepository } from "./like.repository.js";
import {ObjectId} from "mongodb";

export class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }
    async likeItem(req,res,next){
        const postid = req.body;
            const userID = req._id;
        try{
            const like = await this.likeRepository.likePost(userID, postid);
        // Send a success response
        return res.status(200).send(like);
    } catch (err) {
        console.error(err);
        // Send an appropriate error response
        return res.status(500).send(err.message || "Something went wrong");
    }
    }
    async getLikes(req,res,next){
        try{
            // const {id} = req.query;
            const likes = await this.likeRepository.getLikes();
            return res.json(likes);
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
    async getLikesbyId(req,res,next){
        try{
            const postid = req.params.id;
            console.log(postid)
            const likes = await this.likeRepository.getLikesbyId(postid);
            console.log("likes " , likes , "id : " , postid)
            return res.json({count:likes.length,items:likes});
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
}