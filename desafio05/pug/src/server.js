const Contenedor = require('./contenedor.js');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProductos = express.Router();
app.use('/api/productos', routerProductos);

app.set('views', './src/views');
app.set('view engine', 'pug');

routerProductos.get('/', async (req, res) => {
	let products = await container.getAll();

	if (products.length == 0) {
		products = false;
	}

	res.render('product-list', { products });
});

routerProductos.post('/', async (req, res) => {
	const { body } = req;

	// Valido que no vengan campos en blanco antes de guardar el producto
	if (body.title == '' || body.price == '' || body.thumbnail == '') {
		console.log('Parametros inválidos. Nombre: ' + body.title + ' Precio: ' + body.price + ' URL: ' + body.thumbnail);
		res.render('product-form', {});
		return;
	}

	let id = await container.save(body);

	if (id) {
		res.status(200).render('product-form', {});
	} else {
		res.status(500).json({ error: 'El no producto no se guardó' });
	}
});

app.get('/', (req, res) => {
	res.render('product-form', {});
});

const PORT = 8080;
const server = app.listen(PORT, async () => {
	// Se ejecuta el constructor de la clase
	container = new Contenedor('./src/productos.txt');

	// Se utilizó un método adicional que inicializa el contador del último id registrado. Se optó por no llamar esta función de constructor ya que es una función asincrona
	await container.init();

	console.log('👽 Servidor escuchando en el puerto http://localhost:8080');
});

server.on('error', (error) => console.log(error));
