import express from 'express';
import * as cartsController from '../controllers/carts.js';

const routerCarritos = express.Router();

routerCarritos.post('/', cartsController.createCartController);

routerCarritos.post('/:id/productos', cartsController.addProductCartController);

routerCarritos.delete('/:id', cartsController.deleteCartController);

routerCarritos.delete('/:id/productos/:id_prod', cartsController.deleteProductCartController);

routerCarritos.get('/:id/productos', cartsController.getProductsCartController);

export default routerCarritos;
