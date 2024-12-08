const pedir = document.querySelector("#pedir");
const plantarse = document.querySelector("#plantarse");
const reiniciar = document.querySelector("#reiniciar");

const areaPlayer = document.querySelector("#areaPlayer");
const areaDealer = document.querySelector("#areaDealer");

const playerScore = document.querySelector("#playerScore");
const dealerScore = document.querySelector("#dealerScore");


// Baraja de cartas
const tipos = [
    { name: 'Hearts', symbol: '♥', color: 'red' },
    { name: 'Diamonds', symbol: '♦', color: 'red' },
    { name: 'Clubs', symbol: '♣', color: 'black' },
    { name: 'Spades', symbol: '♠', color: 'black' }
];
const numeros = [    '2', '3', '4', '5', '6', '7', '8', '9', '10','J', 'Q', 'K', 'A'
];
let cartasPlayer=[]

let puntajeJugador = 0;
let puntajeDealer = 0;

//primero crear el numero y tipo, luego crear la carta y luego darla ubicacion si es del dealer o mia
// agregar el puntaje
// 
document.addEventListener("DOMContentLoaded", () => {
    const datos = generarDatos("D");
    const cartaShow = generarCarta(datos);
    areaDealer.appendChild(cartaShow);
    dineroText.textContent = "$"+dinero

    pedir.disabled = true;
    pedir.classList.add("disable")
    plantarse.disabled = true;
    plantarse.classList.add("disable")



})

pedir.addEventListener("click", () => {
    const datos = generarDatos("P");
    const cartaShow = generarCarta(datos);
    areaPlayer.appendChild(cartaShow);
    uno.disabled = true;
    uno.classList.add("disable")
    dies.disabled = true;
    dies.classList.add("disable")
    cien.disabled = true;
    cien.classList.add("disable")
    mil.disabled = true;
    mil.classList.add("disable")
    reiniciar.disabled = true;
    reiniciar.classList.add("disable")
    ganaPierde(puntajeJugador)

})

plantarse.addEventListener("click", dealer)

reiniciar.addEventListener("click", () => {
    areaDealer.innerHTML=` `
    areaPlayer.innerHTML=` `
    cartasPlayer = []
    puntajeJugador = 0;
    puntajeDealer = 0;
    apuesta = 0;
    dineroApostado.textContent = "$" + "0"
    mostrarPuntajes(0,0)
    const datos = generarDatos("D");
    const cartaShow = generarCarta(datos);
    areaDealer.appendChild(cartaShow);
    pedir.disabled = true;
    pedir.classList.add("disable")
    plantarse.disabled = true;
    plantarse.classList.add("disable")

    uno.disabled = false;
    uno.classList.remove("disable")
    dies.disabled = false;
    dies.classList.remove("disable")
    cien.disabled = false;
    cien.classList.remove("disable")
    mil.disabled = false;
    mil.classList.remove("disable")

    playerScore.classList.remove("Brojo")
    dealerScore.classList.remove("Brojo")
    playerScore.classList.remove("Bverde")
    dealerScore.classList.remove("Bverde")

})


function generarDatos(type) {

    const cartaNumero = numeros[Math.floor(Math.random() * (numeros.length))];
    const cartaTipo = tipos[Math.floor(Math.random() * (tipos.length))];
    return { cartaNumero, cartaTipo, type };

}

function mostrarPuntajes(P, D){
    playerScore.textContent = P
    dealerScore.textContent = D

}

function generarCarta(datos){
    cartasPlayer = [...cartasPlayer, datos ]

    console.log(cartasPlayer)
    if(datos.type === "P"){
        const punto = Number(letraACarta(datos.cartaNumero));
        puntajeJugador = puntajeJugador +  punto
        mostrarPuntajes(puntajeJugador, puntajeDealer)

    }else{
        const punto = Number(letraACarta(datos.cartaNumero));
        puntajeDealer = puntajeDealer +  punto
        mostrarPuntajes(puntajeJugador, puntajeDealer)
    }
    
    

    const carta = document.createElement('div');
    carta.classList.add('carta');
    if (datos.cartaTipo.color === 'red') {
        carta.classList.add('red');
    }
    carta.innerHTML = `
    <div class="numero left">${datos.cartaNumero}</div>
        <div class="tipo">${datos.cartaTipo.symbol}</div>
        <div class="numero right">${datos.cartaNumero}</div>
    `;

    return carta;
    

}

function letraACarta(letra){
    let niu = 0
    if (letra === "J" || letra === "Q" || letra === "K") {
        niu = 10;
    }else if(letra === "A"){
        
        if((puntajeJugador + 11) > 21){
            niu = 1;
        }else{
            niu = 11;
        }

    }else{
        niu = letra;
    }
    return niu

}

function dealer(){

    // poner una carta al principio, 
    // al darle plantarse se pone la otra carta, 
    // si es menor a 16 se pone otra
    
    const datos = generarDatos("D")
    const cartaShow = generarCarta(datos)
    areaDealer.appendChild(cartaShow)

    plantarse.disabled = true;
    plantarse.classList.add("disable")
    pedir.disabled = true;
    pedir.classList.add("disable")
    reiniciar.disabled = false;
    reiniciar.classList.remove("disable")
    
    
    if(puntajeDealer<17){
        setTimeout(dealer, 2000);
    }else if(puntajeDealer>21){
        dealerScore.classList.add("Brojo")
        playerScore.classList.add("Bverde")

        dinero = dinero+apuesta
        dineroText.textContent = "$" + dinero

    }else if(puntajeDealer>puntajeJugador || puntajeDealer===puntajeJugador || puntajeJugador>21){
        dealerScore.classList.add("Bverde")
        dinero = dinero-apuesta
        dineroText.textContent = "$" + dinero
    }else if(puntajeDealer<puntajeJugador){
        playerScore.classList.add("Bverde")
        dinero = dinero+apuesta
        dineroText.textContent = "$" + dinero
    }


}

function ganaPierde(puntos){

    
    if(puntos>21){
        playerScore.classList.add("Brojo")
        plantarse.disabled = true;
        plantarse.classList.add("disable")
        pedir.disabled = true;
        pedir.classList.add("disable")
        reiniciar.disabled = false;
        reiniciar.classList.remove("disable")
        dinero = dinero-apuesta
        dineroText.textContent = "" + dinero
    }

}



let dinero = 100;
let apuesta = 0;

const uno = document.querySelector("#uno");
const dies = document.querySelector("#dies");
const cien = document.querySelector("#cien");
const mil = document.querySelector("#mil");
const dineroApostado = document.querySelector("#dineroApostado");
const cuadro = document.querySelector("#cuadro");
const dineroText = document.querySelector("#dineroText");


uno.addEventListener("click", () => {
    apostar(1)
})
dies.addEventListener("click", () => {
    apostar(10)
})
cien.addEventListener("click", () => {
    apostar(100)
})
mil.addEventListener("click", () => {
    apostar(1000)
})

function apostar(agregar) {

    pedir.disabled = false;
    pedir.classList.remove("disable")
    plantarse.disabled = false;
    plantarse.classList.remove("disable")
    
    if((apuesta+agregar) <= dinero){
        apuesta = apuesta + agregar
        dineroApostado.textContent = "$" + apuesta
    }

    if(apuesta>(dinero*0.66)){
        cuadro.classList.add("verde")
        cuadro.classList.remove("blanco")
    }else if(apuesta>(dinero*0.33)){
        cuadro.classList.add("amarillo")
        cuadro.classList.remove("blanco")
    }else if(apuesta<(dinero*0.33)){
        cuadro.classList.add("rojo")
        cuadro.classList.remove("blanco")
    }
    
}

