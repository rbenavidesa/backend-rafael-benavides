import ProductsDao from './Products.DAO.js';
import '../../../config/db.js';
import { ProductModel } from '../../../models/product.model.js';
import logger from '../../../utils/logger.util.js';

class ProductsDaoDb extends ProductsDao {
	constructor() {
		super();
		this.model = ProductModel;
		this.logger = logger;
	}

	getAllProducts = async () => {
		try {
			const response = await this.model.find().lean();
			return response;
		} catch (error) {
			this.logger.log('error', error);
			return false;
		}
	};

	getProductById = async (productId) => {
		try {
			const response = await this.model.findOne({ _id: productId });
			return response;
		} catch (error) {
			this.logger.log('error', error);
			return false;
		}
	};

	getProductByCode = async (productCode) => {
		try {
			const response = await this.model.findOne({ code: productCode }).lean();
			return response;
		} catch (error) {
			this.logger.log('error', error);
			return false;
		}
	};

	createProduct = async (product) => {
		try {
			const response = await this.model.create(product);
			return response;
		} catch (error) {
			this.logger.log('error', error);
			return false;
		}
	};

	updateProduct = async (productId, product) => {
		try {
			const response = await this.model.updateMany({ _id: productId }, product);
			return response.modifiedCount;
		} catch (error) {
			this.logger.log('error', error);
			return false;
		}
	};

	deleteProductById = async (productId) => {
		try {
			const response = await this.model.deleteMany({ _id: productId });
			return response.deletedCount;
		} catch (error) {
			this.logger.log('error', error);
			return false;
		}
	};
}

export default ProductsDaoDb;
