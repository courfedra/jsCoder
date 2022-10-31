
//Objetos - nombre, precio y stock
function Producto(id,nombre,precio,stock,categoria,img){
    this.id = id;
    this.sumCarrito = 1;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock||0;
    this.stockTope = stock||0;
    this.categoria = categoria;
    this.img = img;
}

//Flores,Arbustos y Arboles
let arbolA = new Producto(101,'Arbol Cereza',120,7,"arbol","./img/arbolCereza.jpg");
let arbolB = new Producto(102,'Arbol Almendra',150,9,"arbol","./img/arbolAlmendra.jpg");
let arbolC = new Producto(103,'Arbol Ciruela',100,12,"arbol","./img/arbolCiruela.jpg");
let arbolD = new Producto(104,'Arbol Durazno',200,5,"arbol","./img/arbolDurazno.jpg");
let arbolE = new Producto(105,'Arbol Damasco',1500,11,"arbol","./img/arbolDamasco.jpg");
let arbolF = new Producto(106,'Arbol Limon',1000,5,"arbol","./img/arbolLimon.jpg");
let arbolG = new Producto(107,'Arbol Higo',2000,21,"arbol","./img/arbolHigo.jpg");
let arbolH = new Producto(108,'Arbol Manzana',4000,4,"arbol","./img/arbolManzana.jpg");
let arbolI = new Producto(109,'Arbol Mandarina',500,10,"arbol","./img/arbolMandarina.jpg");
let arbolJ = new Producto(110,'Arbol Naranja',475,1,"arbol","./img/arbolNaranja.jpg");

let listaArbolesCompleta=[arbolA,arbolB,arbolC,arbolD,arbolE,arbolF,arbolG,arbolH,arbolI,arbolJ];

let listaArboles = listaArbolesCompleta.filter((elemento)=>elemento.stock>0);
