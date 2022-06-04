import '../config/db.js';
import { CartModel } from '../models/cart.model.js';

export const createCart = async () => {
	try {
		const response = await CartModel.create({});
		return response._id;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const addProductToCart = async (cartId, product) => {
	try {
		const response = await CartModel.updateOne({ _id: cartId }, { $push: { products: product } });
		return response.modifiedCount;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const deleteCartById = async (cartId) => {
	try {
		const response = await CartModel.deleteMany({ _id: cartId });
		return response.deletedCount;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const deleteProductById = async (cartId, productId) => {
	try {
		const response = await CartModel.updateOne({ _id: cartId }, { $pull: { products: { _id: productId } } }, { safe: true, multi: true });
		return response.modifiedCount;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const getProductById = async (cartId) => {
	try {
		const response = await CartModel.findOne({ _id: cartId });
		if (response == null) {
			return false;
		} else {
			return response.products;
		}
	} catch (error) {
		console.log(error);
		return false;
	}
};
