import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Db Connected")
    } catch (error) {
        throw new Error("Error in Connecting DB:", error.message)
    }
}

export default connect;