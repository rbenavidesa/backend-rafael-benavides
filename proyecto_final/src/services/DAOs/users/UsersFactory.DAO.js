import UsersMongo from './UsersMongo.DAO.js';

const option = process.argv[2] || 'mongo';

let dao;
switch (option) {
	case 'mongo':
		dao = new UsersMongo();
		break;
	// El factory queda listo para incorporar DAOS adicionales, se deja código de ejemplo
	// case 'file':
	// 	dao = new UsersFile();
	// 	break;
	default:
		dao = new UsersMongo();
}

export default class CartsDaoFactory {
	static getDao() {
		return dao;
	}
}
