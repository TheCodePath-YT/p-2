import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import postController from "./post.controller.js";
// import postRepository from "./post.repository.js";
const postcontroller = new postController();

const router = express.Router();

router.post("/upload/:id" , (req,res,next) => {
    auth, postcontroller.postupload(req,res,next)
});
// router.post("/comment" , (req,res,next) => {
//     auth, postcontroller.postcomment(req,res,next)
// });
router.get("/getAllposts" , (req,res,next) => {
    auth, postcontroller.getAllposts(req,res,next)
});
router.put("/update/:id" , (req,res,next) => {
    auth, postcontroller.postupdate(req,res,next)
});
router.delete("/delete/:id" , (req,res,next) => {
    auth, postcontroller.postDelete(req,res,next)
});

export default router;
