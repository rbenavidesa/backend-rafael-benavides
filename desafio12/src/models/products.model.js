import '../config/db.js';
import { ProductsModel } from '../modules/products.modules.js';

export const getAllProducts = async () => {
	try {
		const response = await ProductsModel.find().lean();
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const getProductById = async (productId) => {
	try {
		const response = await ProductsModel.findOne({ _id: productId });
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const createProduct = async (product) => {
	try {
		const response = await ProductsModel.create(product);
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const updateProduct = async (productId, product) => {
	try {
		const response = await ProductsModel.updateMany({ _id: productId }, product);
		return response.modifiedCount;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const deleteProductById = async (productId) => {
	try {
		const response = await ProductsModel.deleteMany({ _id: productId });
		return response.deletedCount;
	} catch (error) {
		console.log(error);
		return false;
	}
};
