import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => {
		console.error(err)
		process.exit(1)
	})