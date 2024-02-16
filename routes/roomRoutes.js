import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { 
    createRoomController, 
    deleteRoomController, 
    getRoomController, 
    getSingleRoomController, 
    getUserListRoomController, 
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

router.get("/get-rooms", getRoomController);
router.get("/room-list/:page", roomListController);
router.get("/get-room/:email/:rid", requireSignIn, getSingleRoomController)
router.get("/user-list-room/:id",requireSignIn ,getUserListRoomController)
router.put("/delete-room/:email/:rid", requireSignIn, deleteRoomController)
router.put("/update-room/:id/:rid", formidable(), updateRoomController)

export default router;