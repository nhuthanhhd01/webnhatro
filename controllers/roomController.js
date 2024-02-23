import userModel from "../models/userModel.js";
import fs from "fs";

export const createRoomController = async (req, res) => {
    try {
        const { title, tag, address, price, waterPrice, elecPrice, description } = req.fields;
        const { photo } = req.files;
        // validation
        switch (true) {
            case !title:
            return res.status(500).send({ error: "Title is Required" });
            case !address:
            return res.status(500).send({ error: "Address is Required" });
            case !price:
            return res.status(500).send({ error: "Price is Required" });
            case !waterPrice:
            return res.status(500).send({ error: "Water Price is Required" });
            case !elecPrice:
            return res.status(500).send({ error: "Electric Price is Required" });
            case !description:
            return res.status(500).send({ error: "Description is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is Required and should be less then 1mb" });
        }

        var newRoom = {
            title: title,
            address: address,
            price: price,
            waterPrice: waterPrice,
            elecPrice: elecPrice,
            description: description,
            tag: tag,
            photo: {
                data: fs.readFileSync(photo.path),
                contentType: photo.type
            }
        };

        console.log(newRoom)

        if(photo) {
            newRoom.photo.data = fs.readFileSync(photo.path)
            newRoom.photo.contentType = photo.type
        }
    
        // const exisitingUser = await userModel.findById( req.params.id );
        // res.status(200).send(exisitingUser);
        // exisitingUser.rooms.push(newRoom);
        // await exisitingUser.save();

        await userModel.updateOne(
            { _id: req.params.id },
            { $push: { rooms: newRoom } }
        );
        res.status(201).send({
            success: true,
            message: "Create Room Successfully",
          });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating room",
        });
    }
}

// Get all Rooms
export const getRoomsController = async (req, res) => {
    try {
        const listRooms = []
        await userModel.find({}).then(function(users){
            users.forEach(user => {
                const room = user.rooms;
                listRooms.push(...room);
            })
            res.status(200).send(listRooms);
        });

    } catch (error) {
        console.log(error); 
        res.status(400).send({
            success: false,
            error,
            message: "Error in get All Room"
        });
    }
}

// Get info of a room ( Room Detail )
export const getRoomController = async (req, res) => {
    try {
        const data = await userModel.findOne({"rooms._id": req.params.rid});
        const roomArray = []
        data.rooms.map(room => {
            if(room._id == req.params.rid) (
                roomArray.push(room)
            )
        })
        res.status(200).json(roomArray)
    } catch (error) {
        console.log(error); 
        res.status(400).send({
            success: false,
            error,
            message: "Error in get All Room"
        });
    }
}

// Get info of a room ( Room Detail )
export const getRoomOwnerController = async (req, res) => {
    try {
        const data = await userModel.findOne({"rooms._id": req.params.rid});
        const userData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
        }
        res.status(200).json(userData)
    } catch (error) {
        console.log(error); 
        res.status(400).send({
            success: false,
            error,
            message: "Error in get All Room"
        });
    }
}

// Get single room
export const getSingleRoomController = async (req, res) => {
    try {
        const email = req.params.email
        const rid = req.params.rid
        // const test = await userModel.findOne({"rooms._id": req.params.rid});
        // res.status(200).json(test)
        await userModel.findOne({ email },{
            'rooms': {$elemMatch: {_id: rid}
        }})
        .then((data) => {
            if (data) {
                console.log("Room found");
                res.json(data)
    
            } else {
                console.log("Can not find room Available");
                res.json({msg:"Room name not found."})
            }
        })
        .catch((err) => console.log(err))
    
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in finding single room"
        })
    }
}

// Get room list base on home page
export const roomListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const listRooms = [];
        const outputRooms = [];
        await userModel.find({}).then(function(users){
            users.forEach(user => {
                const room = user.rooms;
                listRooms.push(...room);
            })
            // res.status(200).send(listRooms);
            for ( let i = (page - 1) * perPage; i <= perPage * page - 1; i++ ) {
                if (listRooms[i]) {
                    outputRooms.push(listRooms[i]);
                };
            }
            res.status(200).send(outputRooms);
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in loading room per Page"
        })
    }
}

// Get user list room 
export const getUserListRoomController = async (req, res) => {
    try {
        console.log(req.params.id)
        //check user
        const exisitingUser = await userModel.findById( req.params.id );
        //exisiting user
        if (!exisitingUser) {
        return res.status(200).send({
            success: false,
            message: "No User satisfy",
        });
        }
        const rooms = exisitingUser.rooms
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            rooms
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in loading user list room"
        })
    }
}

//delete a room
 
export const deleteRoomController = async (req, res) => {
    try {
        const email = req.params.email
        const rid = req.params.rid
        const user = await userModel.findOne({ email });
        await user.rooms.pull({ _id: rid });
        await user.save();
        res.status(201).send({
            success: true,
            message: "Delete Room Successfully",
          });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in delete room"
        })   
    }
}

// update room
export const updateRoomController = async (req, res) => {
    try {
        // const email = req.params.email
        const rid = req.params.rid
        const { title, tag, address, price, waterPrice, elecPrice, description } = req.fields;
        const { photo } = req.files;
        // validation
        switch (true) {
            case !title:
            return res.status(500).send({ error: "Title is Required" });
            case !address:
            return res.status(500).send({ error: "Address is Required" });
            case !price:
            return res.status(500).send({ error: "Price is Required" });
            case !waterPrice:
            return res.status(500).send({ error: "Water Price is Required" });
            case !elecPrice:
            return res.status(500).send({ error: "Electric Price is Required" });
            case !description:
            return res.status(500).send({ error: "Description is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is Required and should be less then 1mb" });
        }

        const photoData = {
            data: fs.readFileSync(photo.path),
            contentType: photo.type
        }
        await userModel.updateOne(
            { _id: req.params.id, "rooms._id": rid},
            {
                $set: {
                    'rooms.$.title': title,
                    'rooms.$.address': address, 
                    'rooms.$.price': price, 
                    'rooms.$.waterPrice': waterPrice, 
                    'rooms.$.elecPrice': elecPrice, 
                    'rooms.$.description': description, 
                    'rooms.$.tag': tag, 
                    'rooms.$.photo': photoData, 
                }
            }
        )
        res.status(201).send({
            success: true,
            message: "Update Room Successfully",
          });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in update room"
        })   
    }
}

// get photo
export const productPhotoController = async (req, res) => {
    try {
        // const email = req.params.email
        // const rid = req.params.rid
        // await userModel.findOne({ email },{
        //     'rooms': {$elemMatch: {_id: rid}
        // }})
        // .then((data) => {
        //     if (data) {
        //         const room = data.rooms[0]
        //         res.set("Content-type", room.photo.contentType);
        //         res.status(200).send(room.photo.data);
        //     } else {
        //         console.log("Can not find room Available");
        //         res.json({msg:"Room name not found."})
        //     }
        // })
        // .catch((err) => console.log(err))
        const rid = req.params.rid
        const data = await userModel.findOne({"rooms._id": rid});
        const rooms = data.rooms
        let room = {}
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i]._id.toString() === rid.toString()) room = rooms[i]
        }
        res.set("Content-type", room.photo.contentType);
        res.status(200).send(room.photo.data);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };

 // add review to room
 export const addReviewController = async (req, res) => {
    try {
        const email = req.params.email
        const rid = req.params.rid
        const { name, content, star } = req.fields;
        const newReview = {
            reviewUser: name,
            reviewContent: content,
            reviewStar: star
        }
        await userModel.updateOne(
            { email: email, "rooms._id": rid},
            {
                '$push': {
                   "rooms.$[].reviews": newReview
                }
            }
        )
        res.status(201).send({
            success: true,
            message: "Add Review Successfully",
          });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while add review to room",
        error,
      });
    }
  };

  // get review of room
 export const getReviewsController = async (req, res) => {
    try {
        const email = req.params.email
        const rid = req.params.rid
        // const test = await userModel.findOne({"rooms._id": req.params.rid});
        // res.status(200).json(test)
        await userModel.findOne({ email },{
            'rooms': {$elemMatch: {_id: rid}
        }})
        .then((data) => {
            if (data) {
                console.log("Room found");
                const reviews = data.rooms[0].reviews
                res.json(reviews)
    
            } else {
                console.log("Can not find room Available");
                res.json({msg:"Room name not found."})
            }
        })
        .catch((err) => console.log(err))
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while add review to room",
        error,
      });
    }
  };