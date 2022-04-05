import 'dotenv/config';
import ProductContainer from './lib/productContainer.js';
import CartContainer from './lib/cartContainer.js';
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
	if (!req.route) {
		return res.status(404).json({ error: '-2, descripción: ruta ' + req.path + ' método ' + req.method + ' no implementada' });
	}
	next();
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
	// // Se ejecuta el constructor de la clase
	// productContainer = new ProductContainer('./src/productos.txt');
	// cartContainer = new CartContainer('./src/carritos.txt');

	// // Se utilizó un método adicional que inicializa el contador del último id registrado. Se optó por no llamar esta función de constructor ya que es una función asincrona
	// await productContainer.init();
	// await cartContainer.init();

	console.log(`👽 Servidor escuchando en el puerto http://localhost:${PORT}`);
});

server.on('error', (error) => console.log(error));
