import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { 
    addReviewController,
    createRoomController, 
    deleteRoomController, 
    getReviewsController, 
    getRoomController, 
    getRoomOwnerController, 
    getRoomsController,
    getSingleRoomController, 
    getUserListRoomController, 
    productFilterController, 
    productPhotoController, 
    roomListController,
    updateRoomController,
} from "../controllers/roomController.js";
import formidable from 'express-formidable'

const router = express.Router();

// routes
// post room
router.put(
    "/create-room/:id",
    requireSignIn,
    formidable(),
    createRoomController
);

// get all rooms
router.get("/get-rooms", getRoomsController);
// get room list
router.get("/room-list/:page", roomListController);
// get information of room
router.get("/get-room/:email/:rid", requireSignIn, getSingleRoomController)
// get user list room
router.get("/user-list-room/:id",requireSignIn ,getUserListRoomController)
// delete room
router.put("/delete-room/:email/:rid", requireSignIn, deleteRoomController)
// update room info
router.put("/update-room/:id/:rid", formidable(), updateRoomController)
// get room detail
router.get("/get-room-detail/:rid", getRoomController)
// get room owner
router.get("/get-room-owner/:rid", getRoomOwnerController)
// get photo
router.get("/product-photo/:rid", productPhotoController);
// get filter room
router.get("/product-filter/:district/:option1/:option2", productFilterController);

// REVIEWS
// Add review
router.put("/add-review/:email/:rid",requireSignIn, formidable(), addReviewController)
// Get review
router.get("/get-reviews/:email/:rid", getReviewsController)
export default router;