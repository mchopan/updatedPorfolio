import mongoose from "mongoose";

const { Schema } = mongoose;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: {
        type: [String]
    },
    link: {
        type: String
    }

}, {
    timestamps: true
})



const projects = mongoose.models.projects || mongoose.model("projects", ProjectSchema)

export default projects