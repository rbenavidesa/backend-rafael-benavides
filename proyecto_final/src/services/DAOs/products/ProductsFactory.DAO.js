// importo las clases que implementan mis daos
import ProductsMongo from './ProductsMongo.DAO.js';

const option = process.argv[2] || 'mongo';

let dao;
switch (option) {
	case 'mongo':
		dao = new ProductsMongo();
		break;
	// El factory queda listo para incorporar DAOS adicionales, se deja código de ejemplo
	// case 'file':
	// 	dao = new ProductsFile();
	// 	break;
	default:
		dao = new ProductsMongo();
}

export default class ProductsDaoFactory {
	static getDao() {
		return dao;
	}
}
