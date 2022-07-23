import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			max: 100,
		},
		description: {
			type: String,
			required: true,
			max: 500,
		},
		code: {
			type: String,
			required: true,
			max: 50,
		},
		price: {
			type: Number,
			required: true,
		},
		thumbnail: {
			type: String,
			required: true,
			max: 500,
		},
		timestamp: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

export const ProductModel = mongoose.model('Products', Schema);
