//array para agregar los productos con stock
let listaProductosCompleta=[];
//filtro los productos con stock
let listaProductosConStock = [];
//lista de productos filtrados
let arrayProductosFiltrados=[];
//array para agregar la lista de nombres productos con stock
let listaProductosNombre = [];
//variable a usar para la barra de busqueda
let palabraFiltrada=""
//Array para ir agregarndo los productos seleccionados al carrito
let carrito=[]

//Variable para guardar el nombre del usuario al iniciar sesion
let nombreComprador;


//para limpiar storage al comprobar guardados y cargados
//localStorage.clear()


//variable donde almacenaremos los productos agregados al carrito
let contenedorCarrito = document.getElementById("carritoArticulos")
//variable contenedora de las card de los productos con stock
let catalogo = document.getElementById("catalogoVentas");
//variable donde le asigno el nombre del usuario al carrito
let nombreCarrito = document.getElementById("nombreCarrito")
//boton que permite guardar el nombre ingresado por el usuario
const botonNombre = document.getElementById("botonLog");
//boton para vaciar el carrito completo
const btnVaciarCarrito = document.getElementById("botonVaciarCarrito")

//funcion para crear los objetos en caso de no tener registros previos de ellos
function crearObjetos(){
    listaProductosCompleta = [productoA,productoB,productoC,productoD,productoE,productoF,productoG,productoH,productoI,productoJ];
    listaProductosConStock = listaProductosCompleta.filter((elemento)=>elemento.stock>0);

    //Prepara una lista de solo los nombres de los productos que tienen stock
    for(const producto of listaProductosConStock){
        listaProductosNombre.push(producto.nombre);
    }
}


//funcion para crear y actualizar el layout con las interacciones del usuario
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


//comprobamos el estado y procedemos
function comprobarStorage(){
    //asignamos a valor Jason el contenido, si es que tiene, para proceder a llenarlo o recuperar informacion
    let valorJson=JSON.parse(localStorage.getItem('listaProductosConStock'))
    if (valorJson==null){
        crearObjetos()
        localStorage.setItem("carrito",JSON.stringify(carrito))
        localStorage.setItem("listaProductosConStock",JSON.stringify(listaProductosConStock))
        listaProductosConStock=JSON.parse(localStorage.getItem('listaProductosConStock'))
    }else{
        listaProductosConStock=JSON.parse(localStorage.getItem('listaProductosConStock'));
        carrito=JSON.parse(localStorage.getItem('carrito'))

    }
}

//funcion que guarda los cambios realizados en el storage
function guardarStorageLayout(){
    localStorage.setItem("listaProductosConStock",JSON.stringify(listaProductosConStock))
}


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

/*ver como implementar funcion para qeu cuando utiliza el buscador y agrega al carrito, este no vuelva a 0 */
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

//funcion que guarda los cambios relizados en el carrito
function guardarStorageCarrito(){
    localStorage.setItem("carrito",JSON.stringify(carrito))
}

//funcion que carga la informacion guardada al carrito
function cargarCarritoStorage(){
    carrito=JSON.parse(localStorage.getItem('carrito'))
}


//BOTON VACIAR CARRITO
btnVaciarCarrito.addEventListener("click",()=>{
    //actualizo todos los stock y valores iniciales
    for(const prod of carrito){
        console.log("CARRITO: nombre "+prod.nombre+" y stock "+prod.stock)
        prod.stock=prod.stockTope
        prod.sumCarrito=1;
        console.log("CARRITO: nombre "+prod.nombre+" y stock "+prod.stock)
    }
    //RENUEVO STOCK DE LISTA CON STOCK
    //ERROR QUE SURGIA AL RECARGAR LA PAG Y LUEGO VACIAR CARRITO
    for(const prod of listaProductosConStock){
        prod.stock=prod.stockTope
        prod.sumCarrito=1;
    }

    carrito.length=0;
    actualizarCarrito()
    crearLayout(listaProductosConStock)
    guardarStorageLayout()
    guardarStorageCarrito()
})

//AGREGAR AL CARRITO CON CADA CLICK
const agregarCarrito = (prodId) => {

    //controlar cantidad de stock para permitir compra
    const item = listaProductosConStock.find((prod)=>prod.id===prodId)
    //variable para saber que hacer si esta repetido
    let itemRepetido = carrito.some((prod)=>prod.id===item.id)
    //controlo que la compra no supere la cantidad de stock
    if(item.stock >0){
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
    guardarStorageLayout()
    guardarStorageCarrito()
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
    guardarStorageLayout()
    guardarStorageCarrito()
    actualizarCarrito();
    crearLayout(listaProductosConStock)
}


//REGISTRA CUALQUIER CAMBIO EN EL CARRITO, ELIMINACION O AGREGADO
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

//CARGO TODA LA PAGINA POR PRIMERA VEZ, COMPROBANDO STORAGE Y CARGANDO LA INFORMACION

comprobarStorage()
cargarCarritoStorage()
actualizarCarrito()
crearLayout(listaProductosConStock)
