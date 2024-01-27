import mongoose from "mongoose";

const { Schema } = mongoose;

const SkillSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    proficiency: {
        type: String
    }

}, {
    timestamps: true
})


const skills = mongoose.models.skills || mongoose.model("skills", SkillSchema)

export default skills