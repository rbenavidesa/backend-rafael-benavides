/* ----------------------- 1. Declarar clase usuario ----------------------- */

class Usuario{

/* ----------------- 2. Definición de atributos del usuario ---------------- */

    constructor(nombre, apellido, libros, mascotas){

        this.nombre = nombre;
        this. apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;

    }

/* -------------- 3. Definición de métodos de la clase Usuario -------------- */

    getFullName(){

        return this.nombre + ' ' + this.apellido;
    
    }

    addMascota(nuevaMascota){

        this.mascotas.push(nuevaMascota);

    }

    countMascotas(){

        return this.mascotas.length;

    }

    addBook(nombre, autor){

        this.libros.push({"nombre": nombre, "autor": autor});

    }

    getBookNames(){

        let bookNames = [];

        for (const libro of this.libros){

            bookNames.push(libro.nombre);

        }

        return bookNames;

    }

}

/* -------- 4. Creación de objeto y llamado a cada método de la clase ------- */

let mascotas = ['Snoopy', 'Gardfield', 'Felix'];
let libros = [
    {
        "nombre": 'Don Quijote de la Mancha',
        "autor": 'Miguel de Cervantes'
    },
    {
        "nombre": 'Cien años de Soledad',
        "autor": 'Gabriel García Marquez'
    },
    {
        "nombre": 'El viejo y el mar',
        "autor": 'Ernest Hemingway'
    }
];

let usuario = new Usuario('Rafael', 'Benavides', libros, mascotas);
console.log(usuario.getFullName());
usuario.addMascota('Woodstock');
console.log(mascotas);
console.log(usuario.countMascotas());   
usuario.addBook('El retrato de Dorian Gray', 'Oscar Wilde');
console.log(usuario.libros)
console.log(usuario.getBookNames());



