import express from 'express';
import * as cartsController from '../controllers/carts.controller.js';
import * as validationMiddleware from '../middlewares/validation.middleware.js';

const routerCarts = express.Router();

routerCarts.post('/', cartsController.createCartController);

routerCarts.post('/checkout', cartsController.cartCheckOutController);

routerCarts.post('/:id/productos', validationMiddleware.validateId, validationMiddleware.validateProduct, cartsController.addProductCartController);

routerCarts.post('/addProduct', cartsController.addUserProductCartController);

routerCarts.delete('/:id', validationMiddleware.validateId, cartsController.deleteCartController);

routerCarts.delete('/:id/productos/:id_prod', validationMiddleware.validateId, cartsController.deleteProductCartController);

routerCarts.get('/:id/productos', validationMiddleware.validateId, cartsController.getProductsCartController);

routerCarts.get('/userCart', cartsController.getUserCartController);

export default routerCarts;
