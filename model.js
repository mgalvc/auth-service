import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
}, {
	timestamps: true,
	versionKey: false
})

const SessionSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, required: true },
	expiresAt: { type: Date, required: true }
}, {
	timestamps: true,
	versionKey: false
})

export const User = mongoose.model('User', UserSchema)
export const Session = mongoose.model('Session', SessionSchema)