import userModel from "../models/userModel.js";

export const getAllUserController = async (req, res) => {
    try {
        userModel
            .find({})
            .then(function (users) {
                res.send(users)
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in get All User",
        });
    }
}