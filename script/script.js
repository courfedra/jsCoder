alert('Bienvenido/a a ¡DeDe MakeUp!');

//var seguir comprando
let continuarComprando = false;

//var precio total
let precioTotal = 0;

//Constantes de precio y stock

//Maquillaje precio
const precioMascaraPestaña = 15;
const precioBroncer = 17;
const precioBase = 18;

//Maquillaje stock
let stockMascaraPestaña = 20;
let stockBroncer = 10;
let stockBase = 10;

//Perfumes precio
const precioPerfumeMujer = 52;
const precioPerfumeHombre = 48;
const precioPerfumeBebe = 63;

//Perfumes stock
let stockPerfumeMujer = 7;
let stockPerfumeHombre = 8;
let stockPerfumeBebe = 9;

//Skincare precio
const precioAguaMicelar = 7;
const precioAguaBifasica = 12;
const precioCremaHumectante = 9;

//Skincare stock
let stockAguaMicelar = 18;
let stockAguaBifasica = 19
let stockCremaHumectante = 17;


//constantes de operaciones
const suma = (a,b) => (a+b);
const resta = (a,b) => (a-b);
const multiplicar = (a,b) => (a*b);

//a es el monto y b es el porcentaje de interes a aplicar
const interes = (a,b) => ((a*(b/100))+a);

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
                        case '1': stockMascaraPestaña = comprar(precioMascaraPestaña,stockMascaraPestaña);break;
                        case '2': stockBroncer = comprar(precioBroncer,stockBroncer);break;
                        case '3': stockBase = comprar(precioBase,stockBase);break;
                        case '4': break;
                    }
                }
                break;

            case '2':
                eleccionProductoEspecifico = menu('Perfume de Mujer','Perfume de Hombre','Perfume de Bebe','Salir');
                //if y case para eleccion de producto a comprar
                if (eleccionProductoEspecifico <= 4){
                    switch (eleccionProductoEspecifico){
                        case '1': stockPerfumeMujer = comprar(precioPerfumeMujer,stockPerfumeMujer);break;
                        case '2': stockPerfumeHombre = comprar(precioPerfumeHombre,stockPerfumeHombre);break;
                        case '3': stockPerfumeBebe = comprar(precioPerfumeBebe,stockPerfumeBebe);break;
                        case '4': break;
                    }
                }
                break;

            case '3':
                eleccionProductoEspecifico = menu('Agua micelar','Agua Bifasica','Crema Humectante','Salir');
                // if y case para eleccion de producto a comprar
                if (eleccionProductoEspecifico <= 4){
                    switch (eleccionProductoEspecifico){
                        case '1': stockAguaMicelar = comprar(precioAguaMicelar,stockAguaMicelar);break;
                        case '2': stockAguaBifasica = comprar(precioAguaBifasica,stockAguaBifasica);break;
                        case '3': stockCremaHumectante = comprar(precioCremaHumectante,stockCremaHumectante);break;
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
    cuotas();
}
alert('Gracias por su visita');

//Fin de programa

//*****************************************************************************************/


//funcion de menu de eleccion de productos
function menu(op1,op2,op3,op4){
    let compra = prompt('1 - Deseo Comprar '+op1+'\n2 - Deseo comprar '+op2+'\n3 - Deseo comprar '+op3+'\n4 - Deseo '+op4);
    switch(compra){
        case '1':alert('Desea comprar '+op1);return compra
        case '2':alert('Desea comprar '+op2);return compra
        case '3':alert('Desea comprar '+op3);return compra
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
        stockProducto = stockProducto - cantidadAComprar
        precioParcial = multiplicar(cantidadAComprar,precioProducto);
        alert('Suma un total de : $'+precioParcial);
        precioTotal = precioTotal+precioParcial;
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

