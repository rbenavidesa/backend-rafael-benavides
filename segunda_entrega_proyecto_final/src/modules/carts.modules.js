import mongoose from 'mongoose';
import { ProductsModel } from '../modules/products.modules.js';

const Schema = new mongoose.Schema({
	timestamp: {
		type: Date,
		default: Date.now,
	},
	products: {
		type: [ProductsModel.schema],
		default: [],
	},
});

export const CartsModel = mongoose.model('Carts', Schema);
