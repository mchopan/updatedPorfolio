import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})



const user = mongoose.models.user || mongoose.model("user", UserSchema)

export default user