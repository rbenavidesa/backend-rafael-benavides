const Contenedor = require('./contenedor.js');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const routerProductos = express.Router();
app.use('/api/productos', routerProductos);

routerProductos.get('/', async (req, res) => {
	let products = await container.getAll();
	res.json(products);
});

routerProductos.get('/:id', async (req, res) => {
	const id = Number(req.params.id);

	if (Number.isInteger(id)) {
		let product = await container.getById(id);
		if (product == null) {
			res.status(200).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json(product);
		}
	} else {
		res.status(400).json({ error: 'El parametro ID debe se un número entero' });
	}
});

routerProductos.post('/', async (req, res) => {
	const { body } = req;
	let id = await container.save(body);

	if (id) {
		body['id'] = id;
		res.status(200).json(body);
	} else {
		res.status(500).json({ error: 'El no producto no se guardó' });
	}
});

routerProductos.put('/:id', async (req, res) => {
	const id = Number(req.params.id);
	const product = req.body;

	if (Number.isInteger(id)) {
		let updateOutcome = await container.updateById(id, product);
		if (!updateOutcome) {
			res.status(200).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json({ message: 'Producto actualizado exitosamente' });
		}
	} else {
		res.status(400).json({ error: 'El parametro ID debe se un número entero' });
	}
});

routerProductos.delete('/:id', async (req, res) => {
	const id = Number(req.params.id);

	if (Number.isInteger(id)) {
		let deleteOutcome = await container.deleteById(id);
		if (!deleteOutcome) {
			res.status(200).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json({ message: 'Producto borrado exitosamente' });
		}
	} else {
		res.status(400).json({ error: 'El parametro ID debe se un número entero' });
	}
});

const PORT = 8080;
const server = app.listen(PORT, async () => {
	// Se ejecuta el constructor de la clase
	container = new Contenedor('./src/productos.txt');

	// Se utilizó un método adicional que inicializa el contador del último id registrado. Se optó por no llamar esta función de constructor ya que es una función asincrona
	await container.init();

	console.log('👽 Servidor escuchando en el puerto http://localhost:8081');
});

server.on('error', (error) => console.log(error));
