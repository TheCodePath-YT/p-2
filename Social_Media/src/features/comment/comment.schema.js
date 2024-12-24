import mongoose  from "mongoose";
export const commentSchema = new mongoose.Schema({
    comment: {type:String , require:true},
    postId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },

    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    
})