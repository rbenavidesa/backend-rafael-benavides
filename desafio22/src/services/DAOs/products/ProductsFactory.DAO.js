// importo las clases que implementan mis daos
import ProductsMongo from './ProductsMongo.DAO.js';

const option = process.argv[2] || 'mongo';

let dao;
switch (option) {
	case 'mongo':
		dao = new ProductsMongo();
		break;
	// case 'file':
	// 	dao = new PersonasDaoFile(rutaArchivoPersonas);
	// 	dao.init();
	// 	break;
	default:
		dao = new ProductsMongo();
}

export default class ProductsDaoFactory {
	static getDao() {
		return dao;
	}
}
