
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

//Flores, Macetas y Arboles
let macetaA = new Producto(201,'Maceta Roja',120,7,"maceta","./img/florRoja.jpg");
let macetaB = new Producto(202,'Maceta Blanca',150,9,"maceta","./img/florBlanca.jpg");
let macetaC = new Producto(203,'Maceta Azul',100,12,"maceta","./img/florAzul.jpg");
let macetaD = new Producto(204,'Maceta Amarilla',200,5,"maceta","./img/florAmarilla.jpg");
let macetaE = new Producto(205,'Maceta Naranja',1500,11,"maceta","./img/florNaranja.jpg");
let macetaF = new Producto(206,'Maceta Rosa',1000,5,"maceta","./img/florRosa.jpg");
let macetaG = new Producto(207,'Maceta Verde',2000,21,"maceta","./img/florVerde.jpg");
let macetaH = new Producto(208,'Maceta Negra',4000,4,"maceta","./img/florNegra.jpg");
let macetaI = new Producto(209,'Maceta Violeta',500,10,"maceta","./img/florVioleta.jpg");
let macetaJ = new Producto(210,'Maceta Multicolor',47500,2,"maceta","./img/florMulticolor.jpg");

let listaMacetasCompleta=[macetaA,macetaB,macetaC,macetaD,macetaE,macetaF,macetaG,macetaH,macetaI,macetaJ];

let listaMacetas = listaMacetasCompleta.filter((elemento)=>elemento.stock>0);