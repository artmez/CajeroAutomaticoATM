//Fecha y Hora
// Formatear 1 en 01
const zeroFill = n => {
    return ('0' + n).slice(-2);
}

// Crea el Intervalo
const interval = setInterval(() => {
    // Obtiene la fecha
    const now = new Date();

    // Formatear fecha como dd/mm/aaaa hh:ii:ss
    const dateTime = zeroFill((now.getUTCDate() + 1)) + '/' + zeroFill(now.getMonth()) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());

    // Desplegar la fecha en el documento
    document.getElementById('fecha').innerHTML = dateTime;
}, 1000);




//Variables

const datosUsuarios = [
    {
        nombre: "Ana",
        apellido: "Rodriguez",
        numero: "1234",
        nip: "1234",
        balance: 500.33,
    },
    {
        nombre: "Pedro",
        apellido: "Vela",
        numero: "1111",
        nip: "1111",
        balance: 1756.87,
    },
    {
        nombre: "Veronica",
        apellido: "Jimenez",
        numero: "9999",
        nip: "9999",
        balance: 345.22,
    }
];

const recuadroTeclado = document.querySelector("#right");
const recuadroOpciones = document.querySelector("#left");
const pantallaEntrada = document.querySelector("#entrada");
const pantallaSalida = document.querySelector("#ventana");
const btnCancelar = document.querySelector("#cancelar");
const btnCorregir = document.querySelector("#corregir");
const btnAceptar = document.querySelector("#aceptar");
const btnSaldo = document.querySelector("#saldo");
const btnRetiro = document.querySelector("#retiro");
const btnDeposito = document.querySelector("#deposito");
const botones = document.querySelectorAll(".calc")


let usuarioSeleccionado = "";
let password = "";
let estatus = "inicio";
let contador = 1;
let saldo = 0;
let numeroCliente = "";

//Funciones

function reinicia() {
    recuadroOpciones.style.visibility = "hidden";
    pantallaEntrada.value = "";
    pantallaEntrada.placeholder = "Ingrese su número de cliente:";
    pantallaSalida.value = "";
    usuarioSeleccionado = "";
    password = "";
    estatus = "inicio";
    contador = 1;
    saldo = 0;
    numeroCliente = "";
}

function identificaUsuario() {
    numeroCliente = pantallaEntrada.value;
    datosUsuarios.forEach(e => {
        if (numeroCliente === e.numero) {
            usuarioSeleccionado = e.nombre;
            password = e.nip;
            pantallaEntrada.value = "";
            pantallaEntrada.placeholder = "Ingrese su NIP:";
            pantallaSalida.value = `Hola ${usuarioSeleccionado}! Ingrese su Número de Identificación Personal:`;
            estatus = "password";
        }
    });
    if (estatus === "inicio") {
        pantallaEntrada.value = "";
        pantallaSalida.value = "Número de cliente incorrecto. Intente de nuevo.";
        numeroCliente = "";
        return estatus = "inicio";
    }
} 

function ingresaPassword() {
    while (contador <= 3) {
        if (pantallaEntrada.value === password) {
            pantallaEntrada.value = "";
            pantallaEntrada.placeholder = "";
            pantallaSalida.value = "Seleccione una Opción";
            recuadroOpciones.style.visibility = "visible";
            estatus = "opciones";
            obtieneSaldo();
            return;
        } else {
            console.log(contador);
            pantallaEntrada.value = "";
            pantallaSalida.value = `NIP Incorrecto. Intente de Nuevo. Intento ${contador} de 3.`;
            contador++;
            return;
        }
    }
    contador = 1;
    reinicia();
}

function menuOpciones() {
    pantallaSalida.value = "Seleccione una Opción"
    pantallaEntrada.value = "";
    pantallaEntrada.placeholder = "";
}


function obtieneSaldo() {
    for (let i = 0; i <= datosUsuarios.length; i++) {
        if (usuarioSeleccionado === datosUsuarios[i].nombre) {
            return saldo = datosUsuarios[i].balance;
        }
    }
}

function actualizaSaldo() {
    for (let i = 0; i <= datosUsuarios.length; i++) {
        if (usuarioSeleccionado === datosUsuarios[i].nombre) {
            return datosUsuarios[i].balance = saldo;
        }
    }
}


function hazUnDeposito() {
    pantallaEntrada.value = "";
    pantallaEntrada.placeholder = "Ingrese Monto a Depositar";
    pantallaSalida.value = "Depósito a su cuenta en Moneda Nacional.";
    estatus = "deposito";
}

function operacionDeposito() {
    if (pantallaEntrada.value === "") {
        pantallaSalida.value = "No se ingresó ninguna cantidad. El saldo no cambió.";
        pantallaEntrada.value = "";
        pantallaEntrada.placeholder = "Ingrese Monto a Depositar";
    } else {
        saldo = saldo + Number(pantallaEntrada.value);
        pantallaSalida.value = `Acaba de depositar $${Number(pantallaEntrada.value)} a su cuenta. El saldo actualizado es de $ ${+ saldo.toFixed(2)}`;
        actualizaSaldo();
        pantallaEntrada.value = "";
        pantallaEntrada.placeholder = "";
        estatus = "opciones";
    }
}

function hazUnRetiro() {
    pantallaEntrada.value = "";
    pantallaEntrada.placeholder = "Ingrese Monto a Retirar";
    pantallaSalida.value = "Retiro de su cuenta en Moneda Nacional.";
    estatus = "retiro";
}

function operacionRetiro() {
    if (pantallaEntrada.value === "") {
        pantallaSalida.value = "No se ingresó ninguna cantidad. El saldo no cambió.";
        pantallaEntrada.value = "";
        pantallaEntrada.placeholder = "Ingrese Monto a Retirar";
    } else {
        if (Number(pantallaEntrada.value) > saldo) {
            pantallaEntrada.value = "";
            pantallaEntrada.placeholder = "Ingrese Monto a Retirar";
            pantallaSalida.value = "No se cuenta con saldo suficiente, intente de nuevo.";
        } else {
            saldo = saldo - Number(pantallaEntrada.value);
            actualizaSaldo();
            pantallaSalida.value = `Acaba de retirar $${Number(pantallaEntrada.value)}. El saldo actualizado es de $${saldo.toFixed(2)}`;
            pantallaEntrada.value = "";
            pantallaEntrada.placeholder = "";
            estatus = "opciones";
        }
    }
}

/* function ding() {
    var sound = new  Audio("https://www.fesliyanstudios.com/play-mp3/387");  
    sound.play();
} */

// Listeners

reinicia();

/* botones.forEach (e => {
    e.addEventListener("click", ding);
}) */


btnCorregir.addEventListener("click", () => {
    let texto = pantallaEntrada.value;
    pantallaEntrada.value = texto.slice(0, -1);
})

btnCancelar.addEventListener("click", reinicia);

btnAceptar.addEventListener("click", () => {
    if (pantallaEntrada.value === "") {
        pantallaSalida.value = ("No ingresaste ningún número. Intenta de nuevo");
    } else {
        if (estatus === "inicio") identificaUsuario();
        else if (estatus === "password") ingresaPassword();
        else if (estatus === "opciones") menuOpciones();
        else if (estatus === "deposito") operacionDeposito();
        else if (estatus === "retiro") operacionRetiro();
    }
})

btnSaldo.addEventListener("click", () => {
    obtieneSaldo();
    pantallaSalida.value = "Su saldo es de: $" + saldo.toFixed(2);
})

btnDeposito.addEventListener("click", hazUnDeposito);

btnRetiro.addEventListener("click", hazUnRetiro);