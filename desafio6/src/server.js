const Contenedor = require('./contenedor.js');
const Messages = require('./messages.js');
const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		defaultLayout: 'index.hbs',
		layoutDir: __dirname + 'views/layouts',
		partialsDir: __dirname + '/views/partials',
	})
);

app.get('/', (req, res) => {
	res.render('main', {});
});

io.on('connection', async (socket) => {
	// Mensaje de bienvenida cuando se conecta un cliente nuevo
	console.log('💻 Nuevo usuario conectado!');

	//Enviamos todos los productos al nuevo cliente cuando se conecta

	// Se ejecuta el constructor de la clase
	container = new Contenedor('./src/productos.txt');
	messageContainer = new Messages('./src/mensajes.txt');

	// Se utilizó un método adicional que inicializa el contador del último id registrado. Se optó por no llamar esta función de constructor ya que es una función asincrona
	await container.init();

	let products = await container.getAll();
	let messages = await messageContainer.getAll();

	// Se envía la lista de productos desde el Back
	io.sockets.emit("productListBack", products);

	// Se envía la lista de mensajes desde el Back
	io.sockets.emit("messageListBack", messages);

	//Recibimos el producto a agregar desde el front
	socket.on("productFront", async (data) => {

		// Valido que no vengan campos en blanco antes de guardar el producto
		if (data.title == '' || data.price == '' || data.thumbnail == '') {
			console.log('Parametros inválidos. Nombre: ' + data.title + ' Precio: ' + data.price + ' URL: ' + data.thumbnail);
			console.log('Data inválida, existen campos vacíos.');
			return;
		}

		let id = await container.save(data);

		if (id) {
			console.log("Nuevo producto guardado exitosamente.");
			products = await container.getAll();
			io.sockets.emit("productListBack", products);
		} else {
			console.log("Error: El producto no fue guardado exitosamente.")
		}
	});

	//Recibimos el mensaje a agregar desde el front
	socket.on("messageFront", async (data) => {
		
		// Valido que no vengan campos en blanco antes de guardar el producto
		if (data.message == '' || !validateEmail(data.email)) {
			console.log('Parametros inválidos. Email: ' + data.email + ' Mensaje: ' + data.message);
			console.log('Data inválida, existen campos con errores.');
			return;
		}

		data.timestamp = new Date().toLocaleString('es-CL');
			
		let result = await messageContainer.save(data);

		if (result) {
			console.log("Nuevo mensaje guardado exitosamente.");
			messages = await messageContainer.getAll();
			io.sockets.emit("messageListBack", messages);
		} else {
			console.log("Error: El mensaje no fue guardado exitosamente.")
		}
	});
});

function validateEmail(email){
	return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const PORT = 8080;
server.listen(PORT, () => {
	console.log('👽 Servidor escuchando en el puerto http://localhost:8080');
});

server.on('error', (error) => console.log(error));
