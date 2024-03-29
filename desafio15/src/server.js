import 'dotenv/config';
import routerProducts from './routers/products.router.js';
import routerCarts from './routers/carts.router.js';
import routerAuth from './routers/auth.router.js';
import routerRandoms from './routers/randoms.router.js';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoStore from 'connect-mongo';
import { engine } from 'express-handlebars';
import path from 'path';
import passport from './utils/passport.util.js';
import './config/db.js';
import yargs from 'yargs';
import os from 'os';
import cluster from 'cluster';

const args = yargs(process.argv.slice(2)).argv;
const PORT = args.PORT || 3000;
const numCPUs = os.cpus().length;
const MODE = args.MODE || 'FORK';

if (MODE === 'CLUSTER' && cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
		// console.log(`Worker ${worker.process.pid} died`);
	}
	cluster.on('exit', (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} died`);
		// cluster.fork();
	});
} else {
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
	app.use('/api/randoms', routerRandoms);
	app.use('/', routerAuth);

	// Middleware a nivel aplicación que revisa las rutas consultadas
	app.use((req, res, next) => {
		if (!req.route) {
			return res.status(404).json({ error: '-2, descripción: ruta ' + req.path + ' método ' + req.method + ' no implementada' });
		}
		next();
	});

	// Server init
	const server = app.listen(PORT, async () => {
		console.log(`👽 Servidor escuchando en el puerto http://localhost:${PORT} - PID ${process.pid} MODE:${MODE}`);
	});

	server.on('error', (error) => console.log(error));
}
