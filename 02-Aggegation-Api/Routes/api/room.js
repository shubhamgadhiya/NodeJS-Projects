const express = require('express');
const router = express.Router();
const upload = require("../../multer/fileupload");

const {room, createRoom, updateRoom, deleteRoom} = require("../controller/room");

router.get("/room", room);
router.post("/room/create",upload.single('image'), createRoom);
router.put("/room/update/:id", updateRoom);
router.delete("/room/delete/:id", deleteRoom);

module.exports = router;