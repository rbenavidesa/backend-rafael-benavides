import express from 'express';
import authorization from './authorization.js';
import * as productsController from '../controllers/products.js';

const routerProductos = express.Router();

routerProductos.get('/', productsController.getProductsController);

routerProductos.get('/:id', productsController.getProductsByIdController);

routerProductos.post('/', authorization, productsController.postProductController);

routerProductos.put('/:id', authorization, productsController.putProductController);

routerProductos.delete('/:id', authorization, productsController.deleteProductController);

export default routerProductos;
