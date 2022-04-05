import express from 'express';
import CartContainer from '../lib/cartContainer.js';

let cartContainer;
// Se ejecuta el constructor de la clase
cartContainer = new CartContainer('./src/carritos.txt');
// Se utilizó un método adicional que inicializa el contador del último id registrado. Se optó por no llamar esta función de constructor ya que es una función asincrona
await cartContainer.init();

const routerCarritos = express.Router();

routerCarritos.post('/', async (req, res) => {
	let id = await cartContainer.create();

	if (id) {
		res.status(200).json({ id: id, msg: 'Carrito creado exitosamente' });
	} else {
		res.status(500).json({ error: 'El no producto no se guardó' });
	}
});

routerCarritos.post('/:id/productos', async (req, res) => {
	const cartId = Number(req.params.id);
	const { body } = req;

	if (Number.isInteger(cartId)) {
		let result = await cartContainer.saveProduct(cartId, body);
		if (result) {
			res.status(200).json({ id: cartId, msg: 'El producto se sumó al carrito exitosamente.' });
		} else {
			res.status(500).json({ error: 'Id no encontrado. El producto no se le agregó a ningún carrito' });
		}
	} else {
		res.status(400).json({ error: 'El parámetro ID debe ser un número entero' });
	}
});

routerCarritos.delete('/:id', async (req, res) => {
	const id = Number(req.params.id);

	if (Number.isInteger(id)) {
		let deleteOutcome = await cartContainer.deleteCartById(id);
		if (!deleteOutcome) {
			res.status(200).json({ error: 'Carrito no encontrado' });
		} else {
			res.status(200).json({ message: 'Carrito borrado exitosamente' });
		}
	} else {
		res.status(400).json({ error: 'El parámetro ID debe ser un número entero' });
	}
});

routerCarritos.delete('/:id/productos/:id_prod', async (req, res) => {
	const cartId = Number(req.params.id);
	const productId = Number(req.params.id_prod);

	if (Number.isInteger(cartId) && Number.isInteger(productId)) {
		let deleteOutcome = await cartContainer.deleteProductById(cartId, productId);
		if (!deleteOutcome) {
			res.status(200).json({ error: 'La combinación ID e ID_PROD no fue encontrada. Ningún producto fue eliminado.' });
		} else {
			res.status(200).json({ message: 'Producto borrado exitosamente del carrito' });
		}
	} else {
		res.status(400).json({ error: 'Los parámetros ID y ID_PROD deben ser un número entero' + cartId + ' : ' + productId });
	}
});

routerCarritos.get('/:id/productos', async (req, res) => {
	const id = Number(req.params.id);

	if (Number.isInteger(id)) {
		let cart = await cartContainer.getById(id);
		if (cart == null) {
			res.status(200).json({ error: 'Carrito no encontrado' });
		} else {
			res.status(200).json(cart);
		}
	} else {
		res.status(400).json({ error: 'El parametro ID debe se un número entero' });
	}
});

export default routerCarritos;
