import { knex } from './db.js';

const products = [
	{
		name: 'Escuadra',
		description: 'Plantilla con forma de triángulo isósceles',
		code: 'prod-001',
		price: 123.45,
		thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
	},
	{
		name: 'Calculadora',
		description: 'Herramienta que realiza operaciones matemáticas',
		code: 'prod-002',
		price: 234.56,
		thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
	},
	{
		name: 'Globo Terráqueo',
		description: 'Objeto que busca representar al planeta Tierra',
		code: 'prod-003',
		price: 345.67,
		thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
	},
];

async function createProducts() {
	try {
		const response = await knex.insert(products).from('products');
		console.log('✔ ️Productos agregados');
		console.log(response);
	} catch (error) {
		console.log(error);
	} finally {
		knex.destroy();
	}
}

createProducts();
