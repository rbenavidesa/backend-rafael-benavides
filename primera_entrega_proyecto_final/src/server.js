require('dotenv').config();
const ProductContainer = require('./lib/productContainer.js');
const CartContainer = require('./lib/cartContainer.js');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProductos = express.Router();
const routerCarritos = express.Router();
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarritos);

// Middleware a nivel aplicación que revisa las rutas consultadas
app.use((req, res, next) => {
	if (!req.route) {
		return res.status(404).json({ error: '-2, descripción: ruta ' + req.path + ' método ' + req.method + ' no implementada' });
	}
	next();
});

// Midleware a nivel aplicación que revisa permiso de administrador
const authorization = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ error: '-1, descripción: ruta ' + req.path + ' método ' + req.method + ' no autorizada' });
	}
	next();
};

/* ------------------------------ Rutas carrito ----------------------------- */

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

/* ----------------------------- Rutas Productos ---------------------------- */

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

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
	// Se ejecuta el constructor de la clase
	productContainer = new ProductContainer('./src/productos.txt');
	cartContainer = new CartContainer('./src/carritos.txt');

	// Se utilizó un método adicional que inicializa el contador del último id registrado. Se optó por no llamar esta función de constructor ya que es una función asincrona
	await productContainer.init();
	await cartContainer.init();

	console.log(`👽 Servidor escuchando en el puerto http://localhost:${PORT}`);
});

server.on('error', (error) => console.log(error));
