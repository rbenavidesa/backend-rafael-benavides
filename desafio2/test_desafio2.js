const Contenedor = require('./contenedor.js');

async function test() {
	// Se ejecuta el constructor de la clase
	let container = new Contenedor('productos.txt');
	// Se utilizó un método adicional que inicializa el contador del último id registrado. Se optó por no llamar esta función de constructor ya que es una función asincrona
	await container.init();

	// A continuación se prueba la función getAll()
	let products = await container.getAll();
	console.log('\n*** Prueba de la funcion getAll() ***');
	console.log('\nProductos almacenados en el archvivo de texto: \n\n' + JSON.stringify(products));

	// A continuación se pruena la función getById(Number)
	let product = await container.getById(2);
	console.log('\n*** Prueba de la funcion getById(Number) ***');
	console.log('\nProducto obtenido al buscar el id 2: \n\n' + JSON.stringify(product));
	product = await container.getById(1000);
	console.log('\nProducto obtenido al buscar el un id inexistente: \n\n' + JSON.stringify(product));

	// A continuación se prueba la función deleteById(Number)
	await container.deleteById(3);
	products = await container.getAll();
	console.log('\n*** Prueba de la funcion deleteById(Number)() ***');
	console.log('\nProductos almacenados en el archvivo de texto luego de borrar el producto con id 3: \n\n' + JSON.stringify(products));

	// A continuación se prueba la función save(Object)
	let newProduct = JSON.parse('{"title":"Mac Book", "price":2000, "thumbnail":"https://m.media-amazon.com/images/I/71gD8WdSlaL._AC_SL1500_.jpg"}');
	let addedId = await container.save(newProduct);
	console.log('\n*** Prueba de la funcion save(Object) ***');
	console.log('\nId asignado al nuevo producto: ' + addedId);
	products = await container.getAll();
	console.log('\nProductos almacenados en el archvivo de texto luego de agregar un nuevo producto: \n\n' + JSON.stringify(products));

	// A continuación se prueba la función deleteAll()
	await container.deleteAll();
	products = await container.getAll();
	console.log('\n*** Prueba de la funcion deleteAll() ***');
	console.log('\nProductos almacenados en el archvivo de texto luego de eliminar todos los objetos: \n\n' + JSON.stringify(products));
}

test();
