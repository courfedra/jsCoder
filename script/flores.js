
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
let florA = new Producto(1,'Flor Roja',120,7,"flor","./img/florRoja.jpg");
let florB = new Producto(2,'Flor Blanca',150,9,"flor","./img/florBlanca.jpg");
let florC = new Producto(3,'Flor Azul',100,12,"flor","./img/florAzul.jpg");
let florD = new Producto(4,'Flor Amarilla',200,5,"flor","./img/florAmarilla.jpg");
let florE = new Producto(5,'Flor Naranja',1500,11,"flor","./img/florNaranja.jpg");
let florF = new Producto(6,'Flor Rosa',1000,5,"flor","./img/florRosa.jpg");
let florG = new Producto(7,'Flor Verde',2000,21,"flor","./img/florVerde.jpg");
let florH = new Producto(8,'Flor Negra',4000,4,"flor","./img/florNegra.jpg");
let florI = new Producto(9,'Flor Violeta',500,10,"flor","./img/florVioleta.jpg");
let florJ = new Producto(10,'Flor Multicolor',47500,2,"flor","./img/florMulticolor.jpg");

let listaFloresCompleta=[florA,florB,florC,florD,florE,florF,florG,florH,florI,florJ];

let listaFlores = listaFloresCompleta.filter((elemento)=>elemento.stock>0);
