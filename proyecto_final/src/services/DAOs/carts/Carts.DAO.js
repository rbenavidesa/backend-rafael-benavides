class CartsDao {
	createCart = async () => {};

	createUserCart = async (userId) => {};

	getUserCart = async (userId) => {};

	addProductToCart = async (cartId, product) => {};

	deleteCartById = async (cartId) => {};

	emptyCartById = async (cartId) => {};

	deleteProductById = async (cartId, productId) => {};

	getCartById = async (cartId) => {};
}

export default CartsDao;
