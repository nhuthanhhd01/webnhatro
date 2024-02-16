import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    rooms: [
      {
        type: new mongoose.Schema(
          {
            title: {
              type: String,
              required: true,
            },
            address: {
              type: String,
              required: true
            },
            price: {
              type: Number,
              required: true
            },
            waterPrice: {
              type: Number,
              required: true,
            },
            elecPrice: {
              type: Number,
              required: true,
            },
            description: {
              type: String,
              required: true,
            },
            photo: {
              data:Buffer,
              contentType: String
            }
          },
          { timestamps: true }
        )
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);