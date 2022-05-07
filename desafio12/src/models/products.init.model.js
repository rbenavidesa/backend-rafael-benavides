import '../config/db.js';
import { ProductsModel } from '../modules/products.modules.js';

const product1 = {
	name: 'Escuadra',
	description: 'Plantilla con forma de triángulo isósceles',
	code: 'prod-001',
	price: 123.45,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
};
const product2 = {
	name: 'Calculadora',
	description: 'Herramienta que realiza operaciones matemáticas',
	code: 'prod-002',
	price: 234.56,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
};

const product3 = {
	name: 'Globo Terráqueo',
	description: 'Objeto que busca representar al planeta Tierra',
	code: 'prod-003',
	price: 345.67,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
};

async function collectionInit() {
	try {
		const response = await ProductsModel.create([product1, product2, product3]);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
}

collectionInit();
