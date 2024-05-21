import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiryToken: {
        type: String
    }
},
{ timestamps: true }
);

const UserTokenModal = mongoose.model("userToken", userTokenSchema );

export default UserTokenModal;