alert('Bienvenido/a a ¡DeDe MakeUp!');

//var seguir comprando
let continuarComprando = false;

//var precio total
let precioTotal = 0;

//Objetos - nombre, precio y stock
function Producto(nombre,precio,stock){
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.detalle = function(){
        alert('Producto: '+this.nombre+'\nPrecio: $'+this.precio+'\nStock: '+this.stock);
    }
}

//Maquillaje
let mascaraPestaña = new Producto('Mascara de pestaña',15,20);
let broncer = new Producto('Broncer',17,10);
let base = new Producto('Base',18,10);

//Perfume
let perfumeHombre = new Producto('Perfume de hombre',48,8);
let perfumeMujer = new Producto('Perfume de mujer',52,7);
let perfumeBebe = new Producto('Perfume de bebe',63,9);

//Skincare
let aguaMicelar = new Producto('Agua micelar',7,18);
let aguaBifasica = new Producto('Agua bifasica',12,19);
let cremaHumectante = new Producto('Crema humectante',9,17);

//constantes de operaciones
const suma = (a,b) => (a+b);
const resta = (a,b) => (a-b);
const multiplicar = (a,b) => (a*b);

//a es el monto y b es el porcentaje de interes a aplicar
const interes = (a,b) => ((a*(b/100))+a);

//array lista de productos comprados
let listaCompra = [];
let cantidadProductosDiferentesComprados = 0;


//inicio de programa
do{

    //Menu general
    let eleccionProductoGeneral = menu('maquillaje','perfumes','skincare','salir');

    //var producto interno
    let eleccionProductoEspecifico;

    //si la opcion no es mayor a 4 ni menor a 1 entra al bucle del menu elegido
    if ((eleccionProductoGeneral <= '4')&&(eleccionProductoGeneral>'0')){
        continuarComprando = true;
        switch (eleccionProductoGeneral){

            case '1':
                eleccionProductoEspecifico = menu('Mascara de pestaña','Broncer','Base','Salir');
                //if y case para eleccion de producto a comprar
                if (eleccionProductoEspecifico <= 4){
                    switch (eleccionProductoEspecifico){
                        case '1':
                            mascaraPestaña.detalle();//muestro detalles del producto
                            mascaraPestaña.stock = comprar(mascaraPestaña.precio,mascaraPestaña.stock);//cambio el stock de los productos comprados
                            cantidadProductosDiferentesComprados = facturaCompra(mascaraPestaña.nombre,cantidadProductosDiferentesComprados);//agrego el elemento comprado a una lista para mostrar al final
                            break;
                        case '2':
                            broncer.detalle();
                            broncer.stock = comprar(broncer.precio,broncer.stock);
                            cantidadProductosDiferentesComprados = facturaCompra(broncer.nombre,cantidadProductosDiferentesComprados);
                            break;
                        case '3':
                            base.detalle();
                            base.stock = comprar(base.precio,base.stock);
                            cantidadProductosDiferentesComprados = facturaCompra(base.nombre,cantidadProductosDiferentesComprados);
                            break;
                        case '4': break;
                    }
                }
                break;

            case '2':
                eleccionProductoEspecifico = menu('Perfume de Mujer','Perfume de Hombre','Perfume de Bebe','Salir');
                //if y case para eleccion de producto a comprar
                if (eleccionProductoEspecifico <= 4){
                    switch (eleccionProductoEspecifico){
                        case '1':
                            perfumeMujer.detalle();
                            perfumeMujer.stock = comprar(perfumeMujer.precio,perfumeMujer.stock);
                            cantidadProductosDiferentesComprados = facturaCompra(perfumeMujer.nombre,cantidadProductosDiferentesComprados);
                            break;
                        case '2':
                            perfumeHombre.detalle();
                            perfumeHombre.stock = comprar(perfumeHombre.precio,perfumeHombre.stock);
                            cantidadProductosDiferentesComprados = facturaCompra(perfumeHombre.nombre,cantidadProductosDiferentesComprados);
                            break;
                        case '3':
                            perfumeBebe.detalle();
                            perfumeBebe.stock = comprar(perfumeBebe.precio,perfumeBebe.stock);
                            cantidadProductosDiferentesComprados = facturaCompra(perfumeBebe.nombre,cantidadProductosDiferentesComprados);
                            break;
                        case '4': break;
                    }
                }
                break;

            case '3':
                eleccionProductoEspecifico = menu('Agua micelar','Agua Bifasica','Crema Humectante','Salir');
                // if y case para eleccion de producto a comprar
                if (eleccionProductoEspecifico <= 4){
                    switch (eleccionProductoEspecifico){
                        case '1':
                            aguaMicelar.detalle();
                            aguaMicelar.stock = comprar(aguaMicelar.precio,aguaMicelar.stock);
                            cantidadProductosDiferentesComprados = facturaCompra(aguaMicelar.nombre,cantidadProductosDiferentesComprados);
                            break;
                        case '2':
                            aguaBifasica.detalle();
                            aguaBifasica.stock = comprar(aguaBifasica.precio,aguaBifasica.stock);
                            cantidadProductosDiferentesComprados = facturaCompra(aguaBifasica.nombre,cantidadProductosDiferentesComprados);
                            break;
                        case '3':
                            cremaHumectante.detalle();
                            cremaHumectante.stock = comprar(cremaHumectante.precio,cremaHumectante.stock);
                            cantidadProductosDiferentesComprados = facturaCompra(cremaHumectante.nombre,cantidadProductosDiferentesComprados);
                            break;
                        case '4': break;
                    }
                }
                break;

            case '4':
                eleccionProductoEspecifico = 'Salir';
                break;

            default:
                eleccionProductoEspecifico = 'Producto no encontrado';
                alert('Vuelva a intentar');
                break;
        }
    }

    //si repito bucle
    let salir = prompt('Usted esta por salir del sitio web de ¡DeDe MakeUp!\n¿Desea comprar algo mas?\n1 - SI\n2 - NO')
    if ((salir.toLowerCase() == 'no') ||(salir.toLocaleLowerCase() == '2')){
        continuarComprando = false;
    }else{
        continuarComprando = true;
    }

    //comprobar si quiere seguir comprando para renovar bucle
}while (continuarComprando == true);

//inica la pregunta de cuotas si es que el usuario ha realizado alguna compra
if (precioTotal>0){
    mostrarFactura(listaCompra,cantidadProductosDiferentesComprados);
    cuotas();
}
alert('Gracias por su visita');

//Fin de programa

//*****************************************************************************************/


//funcion de menu de eleccion de productos
function menu(op1,op2,op3,op4){
    let compra = prompt('1 - Deseo Comprar '+op1+'\n2 - Deseo comprar '+op2+'\n3 - Deseo comprar '+op3+'\n4 - Deseo '+op4);
    switch(compra){
        case '1':alert('Entrando al menu de '+op1);return compra
        case '2':alert('Entrando al menu de '+op2);return compra
        case '3':alert('Entrando al menu de '+op3);return compra
        case '4':alert('Desea '+op4);return compra
        default: alert('El producto no esta en nuestra base de datos');return compra;
    }
};

//funcion de comprar y control de stock
function comprar(precioProducto,stockProducto){
    let precioParcial = 0;
    let cantidadAComprar = prompt('Que cantidad del producto desea comprar? Cuesta $'+precioProducto+' y disponemos de '+stockProducto+' unidades.')
    if (cantidadAComprar <= stockProducto){
        alert('Usted compro '+cantidadAComprar+' unidad/es');
        stockProducto -= cantidadAComprar;
        precioParcial = multiplicar(cantidadAComprar,precioProducto);
        alert('Suma un total de : $'+precioParcial);
        precioTotal += precioParcial;
        alert('Lleva comprando hasta ahora: $'+precioTotal);
    }else{
        alert('No disponemos esa cantidad')
    }
    return stockProducto;
}

//funcion de pago sin interes y en cuotas con interes
function cuotas(){
    let cantidadCuotas;
    do{
        cantidadCuotas = prompt('¿Como desea pagar?\n1 - Contado\n2 - Cuotas')
        if (cantidadCuotas == '1'){
            alert('Estupendo, no le aplico interes\nSu monto a pagar es de $'+precioTotal)
        }else if(cantidadCuotas == '2'){
            //el usuario elige la cantidad de cuotas que desea utilizar para pagar el importe total
            cantidadCuotas = prompt('¿En cuantas cuotas desea comprar?\n1 - Tres cuotas con 10% de interes\n2 - Seis cuotas con 20% de interes\n3 - Nueve cuotas con 30% de interes\n4 - Doce cuotas con 40% de interes')
            let porcentajeInteres;
            switch (cantidadCuotas){
                case '1': porcentajeInteres = 10;break;
                case '2': porcentajeInteres = 20;break;
                case '3': porcentajeInteres = 30;break;
                case '4': porcentajeInteres = 40;break;
                default: porcentajeInteres = 0;break;
            }

            if (porcentajeInteres != 0){
                //aplico interes al precio total
                precioTotal = interes(precioTotal,porcentajeInteres);
                alert('Su monto total es de $'+precioTotal);

                //informa cantidad de cuotas y precio de cada cuota
                alert('Debera pagar '+(cantidadCuotas*3)+' cuotas de $'+(precioTotal/(cantidadCuotas*3))+' cada una.')
            }else{
                cantidadCuotas=0;
                alert('Opcion no valida, elija nuevamente su forma de pago');
            }
        }else{
            alert('Opcion no valida')
            cantidadCuotas = 0;
        }
    }while (cantidadCuotas == '0');
}

//funcion para ir agregando a un arreglo los productos que se van comprando
function facturaCompra (productoAdquirido,indice){
    listaCompra[indice]=productoAdquirido;
    indice = indice + 1;
    console.log('estoy en factura compra'+indice)
    return indice;
}

//funcion que muestra la lista de los productos adquiridos
function mostrarFactura(listaProductos,indice){
    let factura ='Los articulos adquiridos son:\n';
    console.log('estoy en omnstrar factura')
    for (let i=0; i < indice;i++){
        factura = factura + listaProductos[i]+'\n';
    }
    alert(factura);
}

