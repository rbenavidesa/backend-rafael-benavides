import express from 'express';
import authorization from './authorization.js';
import ProductContainer from '../lib/productContainer.js';

let productContainer;
// Se ejecuta el constructor de la clase
productContainer = new ProductContainer('./src/productos.txt');
// Se utilizó un método adicional que inicializa el contador del último id registrado. Se optó por no llamar esta función de constructor ya que es una función asincrona
await productContainer.init();

const routerProductos = express.Router();

routerProductos.get('/', async (req, res) => {
	let products = await productContainer.getAll();
	res.json(products);
});

routerProductos.get('/:id', async (req, res) => {
	const id = Number(req.params.id);

	if (Number.isInteger(id)) {
		let product = await productContainer.getById(id);
		if (product == null) {
			res.status(200).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json(product);
		}
	} else {
		res.status(400).json({ error: 'El parametro ID debe se un número entero' });
	}
});

routerProductos.post('/', authorization, async (req, res) => {
	const { body } = req;
	body.timestamp = new Date().toLocaleString('es-CL');
	let id = await productContainer.save(body);

	if (id) {
		body['id'] = id;
		res.status(200).json(body);
	} else {
		res.status(500).json({ error: 'El no producto no se guardó' });
	}
});

routerProductos.put('/:id', authorization, async (req, res) => {
	const id = Number(req.params.id);
	let product = req.body;

	if (Number.isInteger(id)) {
		product.id = id;
		product.timestamp = new Date().toLocaleString('es-CL');
		let updateOutcome = await productContainer.updateById(id, product);
		if (!updateOutcome) {
			res.status(200).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json({ message: 'Producto actualizado exitosamente' });
		}
	} else {
		res.status(400).json({ error: 'El parametro ID debe se un número entero' });
	}
});

routerProductos.delete('/:id', authorization, async (req, res) => {
	const id = Number(req.params.id);

	if (Number.isInteger(id)) {
		let deleteOutcome = await productContainer.deleteById(id);
		if (!deleteOutcome) {
			res.status(200).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json({ message: 'Producto borrado exitosamente' });
		}
	} else {
		res.status(400).json({ error: 'El parametro ID debe se un número entero' });
	}
});

export default routerProductos;
