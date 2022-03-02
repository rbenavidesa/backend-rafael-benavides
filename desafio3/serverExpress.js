const Contenedor = require('./contenedor.js');
const express = require('express');

const app = express();
const PORT = 8080;

let container;

const server = app.listen(PORT, async () => {
	// Se ejecuta el constructor de la clase
	container = new Contenedor('productos.txt');

	// Se utilizó un método adicional que inicializa el contador del último id registrado. Se optó por no llamar esta función de constructor ya que es una función asincrona
	await container.init();

	console.log('👽 Servidor escuchando en el puerto http://localhost:' + PORT);
});

server.on('error', (error) => console.log(error));

app.get('/productos', async (req, res) => {
	// A continuación se prueba la función getAll()
	let products = await container.getAll();

	res.json(products);
});

app.get('/productoRandom', async (req, res) => {
	// A continuación se prueba la función getAll()
	let products = await container.getAll();
	const product = products[Math.floor(Math.random() * products.length)];

	res.json(product);
});
