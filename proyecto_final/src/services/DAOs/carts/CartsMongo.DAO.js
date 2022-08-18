import CartsDao from './Carts.DAO.js';
import '../../../config/db.js';
import { CartModel } from '../../../models/cart.model.js';
import logger from '../../../utils/logger.util.js';

class CartsDaoDb extends CartsDao {
	constructor() {
		super();
		this.model = CartModel;
		this.logger = logger;
	}
	createCart = async () => {
		try {
			const response = await this.model.create({});
			return response._id;
		} catch (error) {
			logger.log('error', error);
		}
	};

	createUserCart = async (userId) => {
		try {
			const response = await this.model.create({ userId: userId });
			return response._id;
		} catch (error) {
			logger.log('error', error);
		}
	};

	getUserCart = async (userId) => {
		try {
			const response = await this.model.findOne({ userId: userId });
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

	addProductToCart = async (cartId, product) => {
		try {
			const response = await this.model.updateOne({ _id: cartId }, { $push: { products: product } });
			return response.modifiedCount;
		} catch (error) {
			logger.log('error', error);
			return false;
		}
	};

	deleteCartById = async (cartId) => {
		try {
			const response = await this.model.deleteMany({ _id: cartId });
			return response.deletedCount;
		} catch (error) {
			logger.log('error', error);
			return false;
		}
	};

	emptyCartById = async (cartId) => {
		try {
			const response = await this.model.findOneAndUpdate({ _id: cartId }, { products: [] }, { returnOriginal: false });
			return response.products.length;
		} catch (error) {
			logger.log('error', error);
			return false;
		}
	};

	deleteProductById = async (cartId, productId) => {
		try {
			const response = await this.model.updateOne({ _id: cartId }, { $pull: { products: { _id: productId } } }, { safe: true, multi: true });
			return response.modifiedCount;
		} catch (error) {
			logger.log('error', error);
			return false;
		}
	};

	getCartById = async (cartId) => {
		try {
			const response = await this.model.findOne({ _id: cartId }).lean();
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
}

export default CartsDaoDb;
