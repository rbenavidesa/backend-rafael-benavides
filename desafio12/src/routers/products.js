import express from 'express';
import auth from '../middleware/auth.middleware.js';
import * as productsController from '../controllers/products.js';

const routerProducts = express.Router();

routerProducts.get('/', productsController.getProductsController);

routerProducts.get('/:id', productsController.getProductsByIdController);

routerProducts.post('/', auth, productsController.postProductController);

routerProducts.put('/:id', auth, productsController.putProductController);

routerProducts.delete('/:id', auth, productsController.deleteProductController);

export default routerProducts;
