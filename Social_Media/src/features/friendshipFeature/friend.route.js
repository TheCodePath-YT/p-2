import express from "express";
import { friendsController } from "./friend.controller.js";


const friendsRouter = express.Router();
const friendController = new friendsController();

// Like a Post
friendsRouter.post("/toggle-friendship",(req,res,next) => {
    friendController.toggleFriendshipController(req,res,next);
})
// Get All Likes
friendsRouter.get("/get-friends/:userId",(req,res,next) => {
    friendController.getUserFriendsController(req,res,next);
})
friendsRouter.get("/get-pending-requests/:userId",(req,res,next) => {
    friendController.getPendingFriendRequestsController(req,res,next);
})
friendsRouter.patch("/accept-request/:friendshipId",(req,res,next) => {
    friendController.acceptFriendRequestController(req,res,next);
})
friendsRouter.patch("/reject-request/:friendshipId",(req,res,next) => {
    friendController.rejectFriendRequestController(req,res,next);
})
export default friendsRouter;