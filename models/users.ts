import  mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
	name: string
	email: string
	image: string
	password: string
	provider: string
	providerAccountId: string
	createdAt: Date
	lastLogin: Date
}

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		image: { type: String },
		password: {
			type: String,
		},

		provider: {
			type: String,
			required: true,
		},
		providerAccountId: {
			type: String,
			// Store the provider's account ID for better user matching
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		lastLogin: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
)
const User = mongoose.models?.User || mongoose.model<IUser>('User', UserSchema)
export default User
