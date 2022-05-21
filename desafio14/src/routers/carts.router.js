import express from 'express';
import * as cartsController from '../controllers/carts.controller.js';
import * as validationMiddleware from '../middlewares/validation.middleware.js';

const routerCarts = express.Router();

routerCarts.post('/', cartsController.createCartController);

routerCarts.post('/:id/productos', validationMiddleware.validateId, validationMiddleware.validateProduct, cartsController.addProductCartController);

routerCarts.delete('/:id', validationMiddleware.validateId, cartsController.deleteCartController);

routerCarts.delete('/:id/productos/:id_prod', validationMiddleware.validateId, cartsController.deleteProductCartController);

routerCarts.get('/:id/productos', validationMiddleware.validateId, cartsController.getProductsCartController);

export default routerCarts;
