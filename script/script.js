//variable para saber si desea seguir comprando
let seguirComprando = false;

//variable para saber si su busqueda esta dentro de las opciones ofrecidas
let esValido = false;

/*variable para llevar cuenta de la cantidad de veces que ha comprado, no de articulos invididuales*/
let cantidadDeCompras=0;

//array para guardar los detalles de la compra realizada --individual
let compraRealizada = [];

//array para guardar los detalles de toda la compra realizada --total
let carrito=[];

//Objetos - nombre, precio y stock
function Producto(nombre,precio,stock){
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock||0;
}

//Flores,Arbustos y Arboles
let productoA = new Producto('roja',120,70);
let productoB = new Producto('blanca',150,30);
let productoC = new Producto('azul',100,50);
let productoD = new Producto('amarilla',200,0);
let productoE = new Producto('naranja',1500,25);
let productoF = new Producto('rosa',1000,25);


//INICIO DE PROGRAMA
alert('Bienvenidos a La Arboleria');
let opcionElegida='';
let indiceDeOpcionElegida=0;
do{
    //Arrays con productos completos
    let listaProductosCompleta = [productoA,productoB,productoC,productoD,productoE,productoF];

    //array para agregar los productos con stock
    let listaNombresProductos = [];

    //filtro los productos con stock
    listaNombresProductos = listaProductosCompleta.filter((elemento)=>elemento.stock>0);

    //array para agregar la lista de nombres productos con stock
    let listaProductosConStock = [];

    //Prepara una lista de solo los nombres de los productos que tienen stock
    for(const producto of listaNombresProductos){
        listaProductosConStock.push(producto.nombre);
    }

    //Menu para acceder a las opciones de compra
    opcionElegida = menu(listaProductosConStock);

    //Controlo si la opcion elegida esta incluida en la lista de flores a comprar
    esValido = listaProductosConStock.some((elemento)=>elemento===opcionElegida);
    
    //Si es valido ejecuto la compra, sino pediremos si desea volver a comprar
    if (esValido==true){
        alert('Excelente, a mi teambien me gustan las  de color '+opcionElegida)
        
        //muestro caracteristicas del producto elegido y guardo el indice del producto
        indiceDeOpcionElegida = mostrarCaracteristicas(opcionElegida,listaNombresProductos)
        
        //operacion de compra y actualizacion de stock
        compraRealizada = comprar(indiceDeOpcionElegida,listaNombresProductos,opcionElegida)
        cantidadDeCompras+=1;
        actualizarFactura(compraRealizada,carrito,cantidadDeCompras);
    }else{
        alert('Elegiste flores de color: '+opcionElegida+' y lamentablemente no lo tenemos en este momento.')
    }

    //valido si desea seguir comprando
    seguirComprando=volverComprar();

}while (seguirComprando == true);

//muestro toda la compra realizada por consola
mostrarFactura(carrito);

alert('Gracias por su visita')

//INICIO DE FUNCIONES

//funcion que muestra menu y retorna la opcion escrita
function menu(opciones){
    let eleccion = prompt('¿Que color de flor desea comprar?\n\n- '+opciones.join('\n- '));
    return eleccion;
};

//Funcion para mostrar caracteristicas del producto elegido
function mostrarCaracteristicas(opcion,array){
    for(i=0;i < (array.length);i++){
        if (array[i].nombre==opcion){
            break;
        }
    };
    alert('Las flores de color '+array[i].nombre+' tiene la siguiente informacion:\n- Este producto cuesta: $'+array[i].precio+'\n- Disponemos de '+array[i].stock+' unidades');
    return i;
};

//funcion para comprar el producto
function comprar(i,arrayElegido,colorFlor){
    let deseaComprar;
    deseaComprar = prompt('Desea adquirir flores '+colorFlor+'? SI/NO');
    if ((deseaComprar.toLowerCase())==='si'){
        let cantidadAComprar=0;
        let gastoTotal=0;
        let factura=0;
        //pregunto la cantidad a comprar
        cantidadAComprar = prompt('Cuantas flores '+colorFlor+' desea comprar?\nCuestan $'+arrayElegido[i].precio+' cada una')
        //compruebo si hay suficiente stock para el pedido
        if(arrayElegido[i].stock>=cantidadAComprar){
            //sumo el total de plantas por el precio de la misma
            gastoTotal = gastoTotal+cantidadAComprar*arrayElegido[i].precio
            //le resto al stock original la cantidad comprada
            arrayElegido[i].stock-=cantidadAComprar;
            alert('¡Compra exitosa!')
            return factura = new Producto(colorFlor,gastoTotal,cantidadAComprar);
        }else{alert('No disponemos de suficiente stock de flores '+colorFlor)}
    }else{
        alert('Esperamos volverte a ver.');
        return factura = new Producto(colorFlor,0,0);}
}

function actualizarFactura(articuloComprado,alCarrito,indice){
    alCarrito[indice]=articuloComprado;
}

//funcion que recorre los elementos del arreglo,los muestra en consola
//y otorga el importe total
function mostrarFactura(alCarrito){
    alCarrito.forEach((elemento)=>console.log(elemento))
    let pagoTotal=0;
    alCarrito.forEach((elemento)=>pagoTotal+=elemento.precio)
    alert('Su compra llega a un total de $'+pagoTotal);
    
}

//funcion que pregunta si desea seguir comprando y retorna booleano
function volverComprar(){
    let comprarMas=false;
    comprarMas=prompt('Desea seguir comprando? SI/NO')
    if (comprarMas.toLowerCase()==='si'){
        return true;
    }else{return false;}
}