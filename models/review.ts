import mongoose, { Document, Schema } from 'mongoose'
export interface IReview extends Document {
	userId: string
	rating: number
	comment: string
	blogSlug: string
}

const ReviewSchema = new Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	blogSlug: { type: String, required: true },
	rating: { type: Number, required: true },
	comment: { type: String, required: true },
})

const ReviewModel =
	mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)

export default ReviewModel
