import 'dotenv/config';
import routerProducts from './routers/products.router.js';
import routerCarts from './routers/carts.router.js';
import routerAuth from './routers/auth.router.js';
import routerRandoms from './routers/randoms.router.js';
import routerUsers from './routers/users.router.js';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoStore from 'connect-mongo';
import { engine } from 'express-handlebars';
import path from 'path';
import passport from './utils/passport.util.js';
import './config/db.js';
import os from 'os';
import cluster from 'cluster';
import logger from './utils/logger.util.js';
import fileUpload from 'express-fileupload';

const PORT = process.env.PORT || 3000;
const numCPUs = os.cpus().length;
const MODE = process.env.MODE || 'FORK';
const NODE_ENV = process.env.NODE_ENV || 'DEVELOPMENT';

if (MODE === 'CLUSTER' && cluster.isMaster) {
	logger.log('info', `Master ${process.pid} is running`);
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker, code, signal) => {
		logger.log('info', `Worker ${worker.process.pid} died`);
	});
} else {
	// Express setup
	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(fileUpload());

	// app.use(morgan('dev'));

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

	// Middleware a nivel aplicación que revisa las rutas consultadas
	app.use((req, res, next) => {
		logger.log('info', 'ruta ' + req.path + ' método ' + req.method);
		next();
	});

	// Routers
	app.use('/api/products', routerProducts);
	app.use('/api/carts', routerCarts);
	app.use('/api/randoms', routerRandoms);
	app.use('/api/user', routerUsers);
	app.use('/', routerAuth);

	// Middleware a nivel aplicación que revisa las rutas no definidas
	app.use((req, res, next) => {
		if (!req.route) {
			logger.log('warn', 'ruta ' + req.path + ' método ' + req.method + ' no implementada');
			return res.status(404).json({ error: '-2, descripción: ruta ' + req.path + ' método ' + req.method + ' no implementada' });
		}
		next();
	});

	// Server init
	let server = null;
	if (NODE_ENV === 'PRODUCTION') {
		server = app.listen(PORT, async () => {
			logger.log('info', `👽 Servidor productivo escuchando en el puerto http://localhost:${PORT} - PID ${process.pid} MODE:${MODE}`);
		});
	} else {
		server = app.listen(PORT, async () => {
			logger.log('info', `👽 Servidor de desarrollo escuchando en el puerto http://localhost:${PORT} - PID ${process.pid} MODE:${MODE}`);
		});
	}

	server.on('error', (error) => logger.log('error', error));
}
