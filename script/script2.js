
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
let productoI = new Producto(9,'Arbusto Pequeño',500,100,"arbusto","./img/logoArbolOriginal.jpg");
let productoJ = new Producto(10,'Zrbusto Grande',475,1,"arbusto","./img/logoArbolOriginal.jpg");

//Arrays con productos completos
let listaProductosCompleta = [productoA,productoB,productoC,productoD,productoE,productoF,productoG,productoH,productoI,productoJ];

//array para agregar los productos con stock
let listaProductosConStock = [];

//filtro los productos con stock
listaProductosConStock = listaProductosCompleta.filter((elemento)=>elemento.stock>0);

//lista de productos filtrados
let arrayProductosFiltrados=[]

//array para agregar la lista de nombres productos con stock
let listaProductosNombre = [];

//Prepara una lista de solo los nombres de los productos que tienen stock
for(const producto of listaProductosConStock){
    listaProductosNombre.push(producto.nombre);
}




//Array para ir agregarndo los productos seleccionados al carrito
let carrito=[]

//variable donde almacenaremos los productos agregados al carrito
let contenedorCarrito = document.getElementById("carritoArticulos")



//CARGAR PRODUCTOS EN LA WEB y actualizar layout al ser necesario
let palabraFiltrada=""
let catalogo = document.getElementById("catalogoVentas");

//BUSCAR LA FORMA DE BORRAR EL CREATE ELEMENT
//REPLACECHILD O REMOVECHILD




//


function crearLayout(listaProductosLayout){
    catalogo.innerHTML =""
        for(const producto of listaProductosLayout){
            articulo = document.createElement("div");
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
            botonAgregar.addEventListener('click',()=>{agregarCarrito(producto.id)})
            if(producto.stock===0){
                botonAgregar.classList.add("sinStock")
                botonAgregar.classList.remove("conStock")
            }else{
                botonAgregar.classList.add("conStock")
                botonAgregar.classList.remove("sinStock")
            }
        }
    }


// CREO EL PRIMER LAYOUT CON LOS PRODUCTOS COMPLETOS
crearLayout(listaProductosConStock)

let nombreComprador;
let nombreCarrito = document.getElementById("nombreCarrito")
const botonNombre = document.getElementById("botonLog");
const btnVaciarCarrito = document.getElementById("botonVaciarCarrito")

//INICIO DE SESION
botonNombre.addEventListener('click',()=>{
    let textareaNombre = document.getElementById("textoLog")
    nombreComprador = textareaNombre.value
    let cardBienvenido = document.createElement("div");
    cardBienvenido.className = "bienvenidoNombre";
    cardBienvenido.innerHTML = `<h3>Bienvenido ${nombreComprador}</h3>`
    botonNombre.className="hidden";
    textareaNombre.className="hidden"
    nombreCarrito.innerText=`Carrito de ${nombreComprador}`;
    login.append(cardBienvenido)

})

//BARRA DE BUSQUEDA
let buscador
buscador=document.getElementById("buscador")
buscador.addEventListener("input",()=>{
    if(buscador.value!==""){
        compararProductoBusqueda(buscador.value)
    }else{
        palabraFiltrada=0;
        compararProductoBusqueda(palabraFiltrada)
    }
})



// funcion de comparar la palabra ingresada con el nombre de los articulos
//Borra productos fuera del buscador
function compararProductoBusqueda(letraPalabra){
    if(letraPalabra!==0){
        arrayProductosFiltrados=[]
        for(prod of listaProductosConStock){
                letraPalabra=letraPalabra.toLowerCase()
                let nombreProducto=prod.nombre.toLowerCase()
            if(nombreProducto.includes(letraPalabra)){
                arrayProductosFiltrados.push(prod)
            }
        }
        crearLayout(arrayProductosFiltrados);
    }else{
        crearLayout(listaProductosConStock)
    }
}

//BOTON VACIAR CARRITO
btnVaciarCarrito.addEventListener("click",()=>{
    //actualizo todos los stock y valores iniciales
    for(const prod of carrito){
        prod.stock=prod.stockTope
        prod.sumCarrito=1
    }
    carrito.length=0;
    actualizarCarrito();
    crearLayout(listaProductosConStock)
})

//AGREGAR AL CARRITO CON CADA CLICK
const agregarCarrito = (prodId) => {

    //controlar cantidad de stock para permitir compra

    const item = listaProductosConStock.find((prod)=>prod.id===prodId)
    //variable para saber que hacer si esta repetido
    let itemRepetido = carrito.some((prod)=>prod.id===item.id)
    //controlo que la compra no supere la cantidad de stock
    if((item.stock >0) ){
        //si esta repetido, aumento el contador de sumCarrito
        if (itemRepetido==true){
            item.sumCarrito+=1
            item.stock-=1
            actualizarCarrito()
        }else{//si no esta repetido, agrego el producto entero
            carrito.push(item)
            item.stock-=1
            actualizarCarrito()
    }
    }
    crearLayout(listaProductosConStock)
}

//Elimiar producto especifico del carrito
const eliminarCarrito = (prodId)=>{
    const item = carrito.find((prod)=>prod.id === prodId)
    //busco indice donde esta el item a retirar
    const indice = carrito.indexOf(item)
    carrito.splice(indice,1);
    //actualizo a stock original
    item.stock=item.stockTope;
    //Actualizo a valor inicial la cantidad de elementos para sumar al carrito
    item.sumCarrito=1
    actualizarCarrito();
    crearLayout(listaProductosConStock)
}

//REGISTRA CUALQUEIR CAMBIO EN EL CARRITO, ELIMINACION O AGREGADO
const actualizarCarrito = () =>{
    contenedorCarrito.innerHTML="";
    carrito.forEach((prod)=>{
        const div = document.createElement("div")
        div.className = ("articuloEnCarrito")
        div.innerHTML=`
            <p>${prod.nombre}</p>
            <p>Precio individual: $${prod.precio}</p>
            <p>Precio total: $${(prod.precio)*(prod.sumCarrito)}</p>
            <p>Cantidad: <span id="cantidad">${prod.sumCarrito}</span></p>
            <button onclick="eliminarCarrito(${prod.id})" class="btnEliminarProducto"><i class="fas fa-trash-alt"</button>
        `
        contenedorCarrito.append(div)
    })
    //CANTIDAD DE PRODUCTOS EN CARRITO
    let contadorArticulos = document.getElementById("contadorArticulos")
    let contadorTotal=0
    carrito.forEach((prod)=>{
        contadorTotal+=prod.sumCarrito
        }
    )
    contadorArticulos.innerText=contadorTotal;

    //PRECIO TOTAL DE PRODUCTOS EN CARRITO
    let precioTotal = document.getElementById("precioTotal")
    let sumPrecios=0
    carrito.forEach((prod)=>{
        sumPrecios+=(prod.precio)*(prod.sumCarrito)
        }
    )
    precioTotal.innerText=`El precio total es de: $${sumPrecios}`;
}

