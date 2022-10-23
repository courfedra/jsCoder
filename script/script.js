
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
let productoA = new Producto(1,'Flor Roja',120,7,"flor","./img/florRoja.jpg");
let productoB = new Producto(2,'Flor Blanca',150,9,"flor","./img/florBlanca.jpg");
let productoC = new Producto(3,'Flor Azul',100,12,"flor","./img/florAzul.jpg");
let productoD = new Producto(4,'Flor Amarilla',200,5,"flor","./img/florAmarilla.jpg");
let productoE = new Producto(5,'Flor Naranja',1500,11,"flor","./img/florNaranja.jpg");
let productoF = new Producto(6,'Flor Rosa',1000,5,"flor","./img/florRosa.jpg");
let productoG = new Producto(7,'Arbol Pequeño',2000,21,"arbol","./img/logoArbolOriginal.jpg");
let productoH = new Producto(8,'Arbol Grande',4000,4,"arbol","./img/logoArbolOriginal.jpg");
let productoI = new Producto(9,'Arbusto Pequeño',500,10,"arbusto","./img/logoArbolOriginal.jpg");
let productoJ = new Producto(10,'Zrbusto Grande',475,1,"arbusto","./img/logoArbolOriginal.jpg");