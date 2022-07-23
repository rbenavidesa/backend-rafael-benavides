// importo las clases que implementan mis daos
import CartsMongo from './CartsMongo.DAO.js';

const option = process.argv[2] || 'mongo';

let dao;
switch (option) {
	case 'mongo':
		dao = new CartsMongo();
		break;
	// case 'file':
	// 	dao = new PersonasDaoFile(rutaArchivoPersonas);
	// 	dao.init();
	// 	break;
	default:
		dao = new CartsMongo();
}

export default class CartsDaoFactory {
	static getDao() {
		return dao;
	}
}
