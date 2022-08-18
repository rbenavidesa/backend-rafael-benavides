import CartsMongo from './CartsMongo.DAO.js';

const option = process.argv[2] || 'mongo';

let dao;
switch (option) {
	case 'mongo':
		dao = new CartsMongo();
		break;
	// El factory queda listo para incorporar DAOS adicionales, se deja código de ejemplo
	// case 'file':
	// 	dao = new CartsFile();
	// 	break;
	default:
		dao = new CartsMongo();
}

export default class CartsDaoFactory {
	static getDao() {
		return dao;
	}
}
