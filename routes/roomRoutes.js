import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { 
    createRoomController, 
    deleteRoomController, 
    getRoomController, 
    getRoomOwnerController, 
    getRoomsController,
    getSingleRoomController, 
    getUserListRoomController, 
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

router.get("/get-rooms", getRoomsController);
router.get("/room-list/:page", roomListController);
router.get("/get-room/:email/:rid", requireSignIn, getSingleRoomController)
router.get("/user-list-room/:id",requireSignIn ,getUserListRoomController)
router.put("/delete-room/:email/:rid", requireSignIn, deleteRoomController)
router.put("/update-room/:id/:rid", formidable(), updateRoomController)
router.get("/get-room-detail/:rid", getRoomController)
router.get("/get-room-owner/:rid", getRoomOwnerController)
// get photo
router.get("/product-photo/:email/:rid", productPhotoController);

export default router;