import 'dotenv/config';
import routerProducts from './routers/products.router.js';
import routerCarts from './routers/carts.router.js';
import routeAuth from './routers/auth.router.js';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoStore from 'connect-mongo';
import { engine } from 'express-handlebars';
import path from 'path';
import passport from './utils/passport.util.js';
import './config/db.js';

// Express setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(cookieParser());
app.use(
	session({
		store: mongoStore.create({
			mongoUrl: process.env.MONGO_URI,
			options: {
				userNewUrlParser: true,
				useUnifiedTopology: true,
			},
		}),
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 60000 * 10 },
		rolling: true,
	})
);

// HandleBars setup
app.set('views', './src/views');
app.set('view engine', 'hbs');
app.use(express.static(path.resolve() + '/src/public'));

app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		defaultLayout: 'index.hbs',
		layoutDir: path.resolve() + '/src/views/layouts',
		partialsDir: path.resolve() + '/src/views/partials',
	})
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCarts);
app.use('/', routeAuth);

// Middleware a nivel aplicación que revisa las rutas consultadas
app.use((req, res, next) => {
	if (!req.route) {
		return res.status(404).json({ error: '-2, descripción: ruta ' + req.path + ' método ' + req.method + ' no implementada' });
	}
	next();
});

// Server init
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
	console.log(`👽 Servidor escuchando en el puerto http://localhost:${PORT}`);
});

server.on('error', (error) => console.log(error));
