import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(
            MONGODB_URI ||
                "mongodb+srv://TrungVan1904:TrungVan1904@mycluster.96efpsw.mongodb.net/kirishop"
        );
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;
