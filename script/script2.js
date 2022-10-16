
//Objetos - nombre, precio y stock
function Producto(id,nombre,precio,stock,categoria,img){
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock||0;
    this.categoria = categoria;
    this.img = img;
}

//Flores,Arbustos y Arboles
let productoA = new Producto(1,'Flor Roja',120,70,"flor","./img/florRoja.jpg");
let productoB = new Producto(2,'Flor Blanca',150,30,"flor","./img/florBlanca.jpg");
let productoC = new Producto(3,'Flor Azul',100,50,"flor","./img/florAzul.jpg");
let productoD = new Producto(4,'Flor Amarilla',200,0,"flor","./img/florAmarilla.jpg");
let productoE = new Producto(5,'Flor Naranja',1500,25,"flor","./img/florNaranja.jpg");
let productoF = new Producto(6,'Flor Rosa',1000,25,"flor","./img/florRosa.jpg");
let productoG = new Producto(7,'Arbol Pequeño',2000,5,"arbol","./img/logoArbolOriginal.jpg");
let productoH = new Producto(8,'Arbol Grande',4000,1,"arbol","./img/logoArbolOriginal.jpg");
let productoI = new Producto(9,'Arbusto Pequeño',500,5,"arbusto","./img/logoArbolOriginal.jpg");
let productoJ = new Producto(10,'Arbusto Grande',475,1,"arbusto","./img/logoArbolOriginal.jpg");

//Arrays con productos completos
let listaProductosCompleta = [productoA,productoB,productoC,productoD,productoE,productoF,productoG,productoH,productoI,productoJ];

//array para agregar los productos con stock
let listaProductosConStock = [];

//filtro los productos con stock
listaProductosConStock = listaProductosCompleta.filter((elemento)=>elemento.stock>0);

//array para agregar la lista de nombres productos con stock
let listaProductosNombre = [];

//Prepara una lista de solo los nombres de los productos que tienen stock
for(const producto of listaProductosConStock){
    listaProductosNombre.push(producto.nombre);
}

//Array para ir agregarndo los productos seleccionados al carrito
let carrito=[]

let catalogo = document.getElementById("catalogoVentas");
for(const producto of listaProductosConStock){
    let articulo = document.createElement("div");
    articulo.className = "articulo";
    articulo.innerHTML=`
        <h2>${producto.nombre}</h2>
        <img src="${producto.img}"></img>
        <ul>
            <li><p>Stock: <b>${producto.stock}</b> unidades.</p></li>
            <li><p>Precio: $<b>${producto.precio}</b></p></li>
        </ul>
        <button id="agregar${producto.id}" class="btnCompra">Agregar<i class="fa-solid fa-cart-shopping"></i></button>`
    catalogo.append(articulo);
    const botonAgregar = document.getElementById(`agregar${producto.id}`)
    botonAgregar.addEventListener('click',()=>{
        agregarCarrito(producto.id)
    })
}

const agregarCarrito = (prodId) => {
    const item = listaProductosConStock.find((prod)=>prod.id===prodId)
    carrito.push(item)
    console.log(carrito)
}