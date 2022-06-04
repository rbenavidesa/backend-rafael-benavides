import mongoose from 'mongoose';
import { ProductModel } from './product.model.js';

const Schema = new mongoose.Schema(
	{
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
