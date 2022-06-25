import '../config/db.js';
import { CartModel } from '../models/cart.model.js';
import logger from '../utils/logger.util.js';

export const createCart = async () => {
	try {
		const response = await CartModel.create({});
		return response._id;
	} catch (error) {
		logger.log('error', error);
	}
};

export const createUserCart = async (userId) => {
	try {
		const response = await CartModel.create({ userId: userId });
		return response._id;
	} catch (error) {
		logger.log('error', error);
	}
};

export const getUserCart = async (userId) => {
	try {
		const response = await CartModel.findOne({ userId: userId });
		if (response == null) {
			return false;
		} else {
			return response;
		}
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const addProductToCart = async (cartId, product) => {
	try {
		const response = await CartModel.updateOne({ _id: cartId }, { $push: { products: product } });
		return response.modifiedCount;
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const deleteCartById = async (cartId) => {
	try {
		const response = await CartModel.deleteMany({ _id: cartId });
		return response.deletedCount;
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const emptyCartById = async (cartId) => {
	try {
		const response = await CartModel.findOneAndUpdate({ _id: cartId }, { products: [] }, { returnOriginal: false });
		return response.products.length;
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const deleteProductById = async (cartId, productId) => {
	try {
		const response = await CartModel.updateOne({ _id: cartId }, { $pull: { products: { _id: productId } } }, { safe: true, multi: true });
		return response.modifiedCount;
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const getCartById = async (cartId) => {
	try {
		const response = await CartModel.findOne({ _id: cartId }).lean();
		if (response == null) {
			return false;
		} else {
			return response.products;
		}
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};
