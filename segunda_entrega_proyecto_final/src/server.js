import 'dotenv/config';
import routerProductos from './routes/products.js';
import routerCarritos from './routes/carts.js';
import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarritos);

// Middleware a nivel aplicación que revisa las rutas consultadas
app.use((req, res, next) => {
	console.log(req.route);
	if (!req.route) {
		return res.status(404).json({ error: '-2, descripción: ruta ' + req.path + ' método ' + req.method + ' no implementada' });
	}
	next();
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
	console.log(`👽 Servidor escuchando en el puerto http://localhost:${PORT}`);
});

server.on('error', (error) => console.log(error));
