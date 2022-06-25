import mongoose from 'mongoose';
import { ProductModel } from './product.model.js';

const Schema = new mongoose.Schema(
	{
		userId: {
			type: String,
			max: 24,
			default: null,
		},
		timestamp: {
			type: Date,
			default: Date.now,
		},
		products: {
			type: [ProductModel.schema],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

export const CartModel = mongoose.model('Carts', Schema);
