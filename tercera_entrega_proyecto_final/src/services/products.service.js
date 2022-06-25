import '../config/db.js';
import { ProductModel } from '../models/product.model.js';
import logger from '../utils/logger.util.js';

export const getAllProducts = async () => {
	try {
		const response = await ProductModel.find().lean();
		return response;
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const getProductById = async (productId) => {
	try {
		const response = await ProductModel.findOne({ _id: productId });
		return response;
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const getProductByCode = async (productCode) => {
	try {
		const response = await ProductModel.findOne({ code: productCode }).lean();
		return response;
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const createProduct = async (product) => {
	try {
		const response = await ProductModel.create(product);
		return response;
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const updateProduct = async (productId, product) => {
	try {
		const response = await ProductModel.updateMany({ _id: productId }, product);
		return response.modifiedCount;
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const deleteProductById = async (productId) => {
	try {
		const response = await ProductModel.deleteMany({ _id: productId });
		return response.deletedCount;
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};
