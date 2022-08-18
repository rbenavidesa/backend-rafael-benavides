import express from 'express';
import * as cartsController from '../controllers/carts.controller.js';
import * as validationMiddleware from '../middlewares/validation.middleware.js';
import auth from '../middlewares/auth.middleware.js';

const routerCarts = express.Router();

routerCarts.post('/', auth, cartsController.createCartController);

routerCarts.post('/checkout', auth, cartsController.cartCheckOutController);

routerCarts.post('/:id/products', auth, validationMiddleware.validateId, validationMiddleware.validateProduct, cartsController.addProductCartController);

routerCarts.post('/addProduct', auth, cartsController.addUserProductCartController);

routerCarts.delete('/:id', auth, validationMiddleware.validateId, cartsController.deleteCartController);

routerCarts.delete('/:id/products/:id_prod', auth, validationMiddleware.validateId, cartsController.deleteProductCartController);

routerCarts.get('/:id/products', auth, validationMiddleware.validateId, cartsController.getProductsCartController);

routerCarts.get('/userCart', auth, cartsController.getUserCartController);

export default routerCarts;
