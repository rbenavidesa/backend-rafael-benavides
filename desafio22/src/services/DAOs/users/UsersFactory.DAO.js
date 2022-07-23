import UsersMongo from './UsersMongo.DAO.js';

const option = process.argv[2] || 'mongo';

let dao;
switch (option) {
	case 'mongo':
		dao = new UsersMongo();
		break;
	// case 'file':
	// 	dao = new PersonasDaoFile(rutaArchivoPersonas);
	// 	dao.init();
	// 	break;
	default:
		dao = new UsersMongo();
}

export default class CartsDaoFactory {
	static getDao() {
		return dao;
	}
}
