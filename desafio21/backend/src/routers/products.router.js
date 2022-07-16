import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import * as productsController from '../controllers/products.controllers.js';
import * as validationMiddleware from '../middlewares/validation.middleware.js';

const routerProducts = express.Router();

routerProducts.get('/', productsController.getProductsController);

routerProducts.post('/catalog', productsController.getProductsCatalogController);
routerProducts.get('/catalog', productsController.getProductsCatalogController);

routerProducts.get('/:id', validationMiddleware.validateId, productsController.getProductsByIdController);

routerProducts.post('/', validationMiddleware.validateProduct, productsController.postProductController);

routerProducts.put('/:id', validationMiddleware.validateId, validationMiddleware.validateProduct, productsController.putProductController);

routerProducts.delete('/:id', validationMiddleware.validateId, productsController.deleteProductController);

export default routerProducts;