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
//variable que guarda los elementos filtrados por checkbox
let nuevaLista=[]

//botones para filtrar por categoria
let filtroMacetas = document.getElementById('macetaFiltro')
let filtroArboles = document.getElementById('arbolFiltro')
let filtroFlores = document.getElementById('florFiltro')
//boton para borrar storage
let btnBorrarStorage=document.getElementById("btnBorrarStorage")
//variable donde ingresan la palabra a buscar
let buscador=document.getElementById("buscador")
//variable donde almacenaremos los productos agregados al carrito
let contenedorCarrito = document.getElementById("carritoArticulos")
//variable contenedora de las card de los productos con stock
let catalogo = document.getElementById("catalogoVentas");
//variable donde le asigno el nombre del usuario al carrito
let nombreCarrito = document.getElementById("nombreCarrito")
//boton para vaciar el carrito completo
const btnVaciarCarrito = document.getElementById("botonVaciarCarrito")
//boton para finalizar compra del carrito
const btnFinalizarCompra = document.getElementById("botonFinalizarCompra")
//variable del layout del inicio de sesion
let pantallaLogin = document.getElementById("login")
//variable para asignar el ingreso a la sesion
let headerLogin = document.getElementById("headerLogin")
//boton que permite guardar el nombre ingresado por el usuario
const botonLogin = document.getElementById("botonLog");
//boton que permite registrar el usuario
const botonRegistro = document.getElementById("botonRegistro");


//variable para agregar info de ubicacion
let ubicacion=document.getElementById("ubicacion");
//variable para juntar la informacion y llevarla a otra parte del codigo->btnFinalizarCompra
let ubicacionEnvio
fetch('https://api.getgeoapi.com/v2/ip/check?api_key=e54eecc4dbf75015bfa538699b0e61bd4784ee86&format={jason}')
	.then(response => response.json())
	.then(data => {
        console.log(data);
        ubicacionEnvio=data.city.name
        ciudad = document.createElement("div");
        ciudad.innerHTML=`<h5>Nuestros envíos llegan exitosamente hasta <b>${ubicacionEnvio}</b>!</h5>`
        ubicacion.append(ciudad);
    })
	.catch(err => console.error(err));



//funcion para crear los objetos en caso de no tener registros previos de ellos
function crearObjetos(){
    listaProductosCompleta = listaFlores.concat(listaArboles,listaMacetas)

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

//ARREGLAR PARA CASO DE CERRAR SESION Y AGREGAR SWEET ALERT DE SEGURO SALIR

//Registrar una cuenta nueva en el local storage
botonRegistro.addEventListener('click',()=>{
    pantallaLogin.innerHTML=""
        registrar = document.createElement("div");
        registrar.className = "loguearse";
        registrar.innerHTML=`

            <input type="text" id="textoLog" placeholder="Nombre">
            <input type="password" id="passLogOriginal" placeholder="Nueva Contraseña"></input>
            <input type="password" id="passLogRepetir" placeholder="Repetir Contraseña"></input>
            <button id="enviarRegistro" type="button">Registrarse</button>
            `

        pantallaLogin.append(registrar);
        const enviarRegistro = document.getElementById("enviarRegistro")
        enviarRegistro.addEventListener('click',()=>{
            let nombre=document.getElementById("textoLog")
            let passLogOriginal=document.getElementById("passLogOriginal")
            let passLogRepetir=document.getElementById("passLogRepetir")
            nombre=nombre.value
            passLogOriginal=passLogOriginal.value
            passLogRepetir=passLogRepetir.value
            passLogOriginal===passLogRepetir ? crearCuenta(nombre,passLogOriginal):pantallaLogin.innerHTML="";
        })

})

//funcion para crear una cuenta y almacenarla en el storage
function crearCuenta(nombreUser,passUser){
    localStorage.setItem(`usuario${nombreUser}`,JSON.stringify(nombreUser))
    localStorage.setItem(`password${nombreUser}`,passUser)
    Toastify({
        text: "Cuenta creada exitosamente",
        className: "info",
        gravity:"top",
        position:"right",
        style: {
          background: "linear-gradient(to right, #295d09, #295d09)",
          color:"#e9ebed"
        }
      }).showToast();
    pantallaLogin.innerHTML=""
}

//Loguearse
botonLogin.addEventListener('click',()=>{
        pantallaLogin.innerHTML=""
        loguear = document.createElement("div");
        loguear.className = "loguearse";
        loguear.innerHTML=`

            <input type="text" id="textoLog" placeholder="Nombre">
            <input type="password" id="passLogOriginal" placeholder="Nueva Contraseña"></input>
            <button id="enviarInformacion" type="button">Loguearse</button>
            `

        pantallaLogin.append(loguear);
        const enviarInformacion = document.getElementById("enviarInformacion")
        enviarInformacion.addEventListener('click',()=>{
            let nombre=document.getElementById("textoLog")
            let passLogOriginal=document.getElementById("passLogOriginal")
            nombre=nombre.value
            passLogOriginal=passLogOriginal.value
            //RECUPERAR DEL STORAGE
            loguearCuenta(nombre,passLogOriginal)
            pantallaLogin.innerHTML=""
        })

})

function loguearCuenta(nombreUser,passUser){
    let nombreGuardado=JSON.parse(localStorage.getItem(`usuario${nombreUser}`));
    let passGuardada=localStorage.getItem(`password${nombreUser}`);
    if((nombreGuardado==nombreUser)&&(passGuardada==passUser)){
        mostrarLoginLayout(nombreGuardado)
        Toastify({
            text: "Logueado correctamente",
            className: "info",
            gravity:"top",
            position:"right",
            style: {
              background: "linear-gradient(to right, #295d09, #295d09)",
              color:"#e9ebed"
            }
          }).showToast();
    }else{
        Toastify({
            text: "Error",
            className: "info",
            gravity:"top",
            position:"right",
            style: {
              background: "linear-gradient(to right, #660000, #ff0000)",
              color:"#e9ebed"
            }
          }).showToast();
    }
}



//mostrar en pantalla el estado iniciado de sesion con nombre de usuario
function mostrarLoginLayout(usuario){
    headerLogin.innerHTML=""
    bienvenidoUsuario = document.createElement("div");
        bienvenidoUsuario.className = "bienvenidoUsuario";
        bienvenidoUsuario.innerHTML=
            `
            <h3>Bienvenido ${usuario}!
            <button id="cerrarSesion" class="btn cerrarSesion" >Cerrar sesion</button>
            `
        headerLogin.append(bienvenidoUsuario);
        const botonCerrarSesion=document.getElementById("cerrarSesion")
        botonCerrarSesion.addEventListener('click',()=>{
            bienvenidoUsuario.innerHTML=""

            //Recuperar botones de inicio y crear cuenta al salir sesion
            //guardar login en storage al recargar la pagina
        })
}



//BARRA DE BUSQUEDA

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
        prod.stock=prod.stockTope
        prod.sumCarrito=1;
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
    Toastify({
        text: "Carrito vaciado",
        className: "info",
        gravity:"bottom",
        position:"left",
        style: {
          background: "linear-gradient(to right, #d10000, #d10000)",
          color:"#e9ebed"
        }
      }).showToast();
})

btnFinalizarCompra.addEventListener("click",()=>{
    Swal.fire({
        title: '¡Compra realizada con exito!',
        icon: 'success',
        text:`Sera enviada a ${ubicacionEnvio}`,
        timer: 5000,
      })

    //Realizo la misma ejecucion del boton vaciar carrito

    //actualizo todos los stock y valores iniciales
    for(const prod of carrito){
        prod.stock=prod.stockTope
        prod.sumCarrito=1;
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
        Toastify({
            text: "Agregado al carrito",
            className: "info",
            gravity:"bottom",
            position:"left",
            style: {
              background: "linear-gradient(to right, #69ab3d, #aed36c)",
              color:"#463500"
            }
          }).showToast();
    }
    guardarStorageLayout()
    guardarStorageCarrito()
    crearLayout(listaProductosConStock)
}

//Agregar unidades del producto al carrito
const agregarUnidadCarrito = (prodId)=>{
    //Selecciono el item del carrito
    const item = carrito.find((prod)=>prod.id === prodId)
    //consulto el stock actual del item en carrito y procedo a if
    item.sumCarrito<item.stockTope && agregarCarrito(prodId);
    guardarStorageLayout()
    guardarStorageCarrito()
    actualizarCarrito();
    crearLayout(listaProductosConStock)
}

//restar unidades del producto del carrito
const eliminarUnidadCarrito = (prodId)=>{
    //Selecciono el item del carrito
    const item = carrito.find((prod)=>prod.id === prodId)
    //consulto el stock actual del item en carrito y procedo a if
    if (item.sumCarrito>1){
        item.sumCarrito-=1
        item.stock+=1;
    }else{eliminarCarrito(prodId)}
    guardarStorageLayout()
    guardarStorageCarrito()
    actualizarCarrito();
    crearLayout(listaProductosConStock)
    Toastify({
        text: "Eliminado correctamente",
        className: "info",
        gravity:"bottom",
        position:"left",
        style: {
          background: "linear-gradient(to right, #d10000, #d10000)",
          color:"#e9ebed"
        }
      }).showToast();
}


//Elimiar producto especifico del carrito
const eliminarCarrito = (prodId)=>{
    //Selecciono el item del carrito
    const item = carrito.find((prod)=>prod.id === prodId)
    //busco indice donde esta el item a retirar
    const indice = carrito.indexOf(item)
    //elimino el articulo
    carrito.splice(indice,1);
    //actualizo a stock original
    item.stock=item.stockTope;
    //Actualizo a valor inicial la cantidad de elementos para sumar al carrito
    item.sumCarrito=1
    guardarStorageLayout()
    guardarStorageCarrito()
    actualizarCarrito();
    crearLayout(listaProductosConStock)
    Toastify({
        text: "Producto eliminado",
        className: "info",
        gravity:"bottom",
        position:"left",
        style: {
          background: "linear-gradient(to right, #d10000, #d10000)",
          color:"#e9ebed"
        }
      }).showToast();
}


//REGISTRA CUALQUIER CAMBIO EN EL CARRITO, ELIMINACION O AGREGADO
const actualizarCarrito = () =>{
    contenedorCarrito.innerHTML="";
    carrito.forEach((prod)=>{
        const div = document.createElement("div")
        div.className = ("articuloEnCarrito")
        div.innerHTML=`
            <img src="${prod.img}">
            <p>${prod.nombre}</p>
            <p>Cantidad:<span id="cantidad">${prod.sumCarrito}</span></p>
            <p>Precio unidad: $${prod.precio}</p>
            <p>Precio total: $${(prod.precio)*(prod.sumCarrito)}</p>
            <div class="botonesCarrito">
                <button onclick="agregarUnidadCarrito(${prod.id})" class="btnAgregarSacarProducto"><i class="fa-regular fa-plus">  1  </i></button>
                <button onclick="eliminarUnidadCarrito(${prod.id})" class="btnAgregarSacarProducto"><i class="fa-solid fa-delete-left">  1  </i></button>
                <button onclick="eliminarCarrito(${prod.id})" class="btnAgregarSacarProducto"><i class="fas fa-trash-alt"></i></button>
            </div>
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


//function que filtra por la categoria seleccionada y muetra el layout actualizado
function filtrarCategoriaAgregada(categoriaElegida){
    for(const elem of listaProductosConStock){
        if(elem.categoria==categoriaElegida){
            nuevaLista.push(elem)
        }
    }
    crearLayout(nuevaLista)
}

//function que filtra por la categoria seleccionada y muetra el layout actualizado
function filtrarCategoriaEliminada(categoriaElegida){
    /*No utilize splice porque me salteaba elementos y no los borraba de la lista correctamente*/

    //creo nuevo arreglo para guardar lista nueva
    let listaReemplazante=[]
    if (nuevaLista.length!=0){
        for(const elem of nuevaLista){
            if(elem.categoria!==categoriaElegida){
                listaReemplazante.push(elem);
            }
        }
        nuevaLista.length=0
        nuevaLista = nuevaLista.concat(listaReemplazante)
        crearLayout(nuevaLista)
    }
    //Si no hay categoria elegida, creo la lista original
    if(!(filtroArboles.checked)&&!(filtroMacetas.checked)&&!(filtroFlores.checked)){
        console.log("Entre al todos false")
        crearLayout(listaProductosConStock)
    }
}


filtroArboles.addEventListener('click',()=>{
    filtroArboles.checked ? filtrarCategoriaAgregada("arbol"):filtrarCategoriaEliminada("arbol")
})
filtroMacetas.addEventListener('click',()=>{
    filtroMacetas.checked ? filtrarCategoriaAgregada("maceta"):filtrarCategoriaEliminada("maceta")
})
filtroFlores.addEventListener('click',()=>{
    filtroFlores.checked ? filtrarCategoriaAgregada("flor"):filtrarCategoriaEliminada("flor")
})

//boton para borrar storage ante cualquier necesidad del desarrollador o el tester
btnBorrarStorage.addEventListener("click",()=>{
    localStorage.clear();
    Toastify({
        text: "Storage Borrado, RECARGUE LA PÁGINA",
        className: "info",
        gravity:"bottom",
        position:"left",
        style: {
          background: "#d10000",
          color:"#ffffff"
        }
      }).showToast();
})

//CARGO TODA LA PAGINA POR PRIMERA VEZ, COMPROBANDO STORAGE Y CARGANDO LA INFORMACION
//
comprobarStorage()
cargarCarritoStorage()
crearLayout(listaProductosConStock)
actualizarCarrito()
