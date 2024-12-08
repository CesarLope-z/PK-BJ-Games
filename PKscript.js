const iniciar = document.querySelector("#boton");
const cartasPlayer = document.querySelector("#cartasPlayer");
const cartasMesa = document.querySelector("#cartasMesa");
const rivalUno = document.querySelector("#rivalUno");
const rivalDos = document.querySelector("#rivalDos");

const start = document.querySelector("#start");
const pass = document.querySelector("#pass");
const bet = document.querySelector("#bet");
const out = document.querySelector("#out");

const uno = document.querySelector("#uno");
const dies = document.querySelector("#dies");
const cien = document.querySelector("#cien");
const mil = document.querySelector("#mil");

const dineroApostado = document.querySelector("#dineroApostado");
const cuadro = document.querySelector("#cuadro");
const dineroText = document.querySelector("#dineroText");

const textGanador = document.querySelector("#textGanador");
const GContenedor = document.querySelector("#GContenedor");

const tipos = [
    { name: 'Hearts', symbol: '♥', color: 'red' },
    { name: 'Diamonds', symbol: '♦', color: 'red' },
    { name: 'Clubs', symbol: '♣', color: 'black' },
    { name: 'Spades', symbol: '♠', color: 'black' }
];
const numeros = [ 
    {numero: 2, letra: '2'},
    {numero: 3, letra: '3'},
    {numero: 4, letra: '4'},
    {numero: 5, letra: '5'},
    {numero: 6, letra: '6'},
    {numero: 7, letra: '7'},
    {numero: 8, letra: '8'},
    {numero: 9, letra: '9'},
    {numero: 10, letra: '10'},
    {numero: 11, letra: 'J'},
    {numero: 12, letra: 'Q'},
    {numero: 13, letra: 'K'},
    {numero: 14, letra: 'A'}
];
let cartasCreadas = []
let cartasmesa = []
let cartasjugador = []
let cartasrival1 = []
let cartasrival2 = []

let dinero = 100;
let apuesta = 0;

document.addEventListener("DOMContentLoaded", () => {
    dineroText.textContent = "$"+ dinero;
    GContenedor.style.display = 'none';
    desactivar(0,pass)
    desactivar(0,bet)
})
// iniciar.addEventListener("click", x);
start.addEventListener("click", () => {
    dineroText.textContent = "$"+ dinero;
    apuesta=0;
    GContenedor.style.display = 'none';
    borrar()
    generarCartasJ();
    setTimeout( generarCartasR , 3000);
    desactivar(1,bet)
    desactivar(0,start)
});
pass.addEventListener("click", seguir);
bet.addEventListener("click", () => {
    desactivar(1,pass)
    if(apuesta<5){
        alert("Apuesta minima $5")
        desactivar("red", cuadro)
        return;
    }
    seguir()
});
out.addEventListener("click", outofgame)
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

function generarCartasJ() {
    const carta1 = generarDato("P");
    const carta2 = generarDato("P");

    cartasjugador.push(carta1, carta2);

    generarCarta(carta1)
    generarCarta(carta2)

}
function generarCartasD() {

    const carta1 = generarDato("D");
    const carta2 = generarDato("D");
    const carta3 = generarDato("D");

    cartasmesa.push(carta1, carta2, carta3);
    // console.log(cartasmesa)

    generarCarta(carta1)
    generarCarta(carta2)
    generarCarta(carta3)
    
}
function generarCartasR() {

    const carta1 = generarDato("R1");
    const carta2 = generarDato("R1");

    cartasrival1.push(carta1, carta2);

    generarCarta(carta1)
    generarCarta(carta2)


    const carta3 = generarDato("R2");
    const carta4 = generarDato("R2");

    cartasrival2.push(carta3, carta4);

    generarCarta(carta3)
    generarCarta(carta4)
    
}

function generarDato(type) {

    const cartaNumero = numeros[Math.floor(Math.random() * (numeros.length))];
    const cartaTipo = tipos[Math.floor(Math.random() * (tipos.length))];

    const cartaId = `${cartaNumero.letra}-${cartaTipo.name}`;

        // Verificar si la carta ya fue generada
        if (!cartasCreadas.includes(cartaId)) {
            
            cartasCreadas.push(cartaId);
            return { cartaNumero, cartaTipo, type };
        }else{
            const nuevaCarta = generarDato(type)
            return nuevaCarta
        }

}

function generarCarta(datos){
    
    const carta = document.createElement('div');

    carta.classList.add('card');
    carta.classList.add('cardAnimation');
    if (datos.cartaTipo.color === 'red') {
        carta.classList.add('red');
    }
    carta.innerHTML = `
                <div class="card-face card-front"></div>
                <div class="card-face card-back">
                    <div class="numero left">${datos.cartaNumero.letra}</div>
                    <div class="tipo">${datos.cartaTipo.symbol}</div>
                    <div class="numero right">${datos.cartaNumero.letra}</div>
                </div>
    `;

    if(datos.type === "P"){
        
        carta.onclick = function() {
            carta.classList.remove('cardAnimation');
            setTimeout(() => {
                carta.classList.toggle('girada'); // Alterna la clase girada
            }, 0.1)};
        cartasPlayer.appendChild(carta)

    }else if(datos.type === "D"){
        carta.classList.remove("cardAnimation")
        setTimeout(() => {
            carta.classList.toggle('girada'); // Alterna la clase girada
        }, 0.1)
        
        cartasMesa.appendChild(carta)
    }else if(datos.type === "R1"){
        carta.classList.add("rival")
        rivalUno.appendChild(carta)
    }else if(datos.type === "R2"){
        carta.classList.add("rival")
        rivalDos.appendChild(carta)
    }
    

}

function desactivar(activar, boton) {

    if(activar === 1){
        boton.disabled = false;
        boton.classList.remove("disable")
    }else if(activar === "red"){
        boton.classList.add("rojo")
        boton.classList.remove("blanco")
    }else{
        boton.disabled = true;
        boton.classList.add("disable")
    }

    
    
}

function apostar(agregar) {

    desactivar(0,pass)

    
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

function seguir(){

    
    if(!cartasmesa.length){
        generarCartasD()
        desactivar(1,pass)
        return;
    }

    if(cartasmesa.length <= 4){
        const carta1 = generarDato("D");
        cartasmesa.push(carta1);
        generarCarta(carta1)
        return;
    }else{
        const cartasrivales = document.querySelectorAll(".rival")

        cartasrivales.forEach((carta) => {

            carta.classList.remove("cardAnimation")
            setTimeout(() => carta.classList.add("girada"), 50);
            
        })
        desactivar(1,start)

        const manoJugador = analizarCartas(cartasjugador)
        const manoRival1 = analizarCartas(cartasrival1)
        const manoRival2 = analizarCartas(cartasrival2)

        ganador(manoJugador, manoRival1,manoRival2, false)

        console.log("el jugador tiene:")
        console.log(manoJugador[0].id)
        console.log("el rival 1 tiene:")
        console.log(manoRival1[0].id)
        console.log("el rival 2 tiene:")
        console.log(manoRival2[0].id)
    }
    

}

function outofgame() {

    if(!cartasmesa.length){
        
        generarCartasD()
        desactivar(1,pass)
    }

    if(cartasmesa.length <= 4){
        const carta1 = generarDato("D");
        cartasmesa.push(carta1);
        generarCarta(carta1)

        const carta2 = generarDato("D");
        cartasmesa.push(carta2);
        generarCarta(carta2)
            
    }

    const cartasrivales = document.querySelectorAll(".rival")

    cartasrivales.forEach((carta) => {

        carta.classList.remove("cardAnimation")
        setTimeout(() => carta.classList.add("girada"), 50);
        
    })

    desactivar(1,start)
    
    const manoJugador = analizarCartas(cartasjugador)
    const manoRival1 = analizarCartas(cartasrival1)
    const manoRival2 = analizarCartas(cartasrival2)

    ganador(manoJugador, manoRival1,manoRival2, true)

    // console.log("el jugador tiene:")
    // console.log(manoJugador)
    console.log("el rival 1 tiene:")
    console.log(manoRival1[0].id)
    console.log(manoRival1)
    console.log("el rival 2 tiene:")
    console.log(manoRival2[0].id )
    console.log(manoRival2)
    
    
}

function analizarCartas(cartasAnalizadas) {
    let mano = [];

    let cartasJyD = cartasAnalizadas.concat(cartasmesa)
    const soloNumeros = cartasJyD.map(item => item.cartaNumero.numero);
    
    cartasAnalizadas.forEach(carta => {
        let numero = carta.cartaNumero.numero
        let tipo = carta.cartaTipo.symbol
        let cantidad = 0;
        let cantidadTipo = 0;

        cartasJyD.forEach(cartasJuntas => {
            if(tipo === cartasJuntas.cartaTipo.symbol){
                cantidadTipo = cantidadTipo+1
            }
            if(numero === cartasJuntas.cartaNumero.numero){
                cantidad = cantidad+1
            }

            let cartaMas2 = Number(cartasJuntas.cartaNumero.numero)+2
            let cartaMas1 = Number(cartasJuntas.cartaNumero.numero)+1
            let cartaMen1 = Number(cartasJuntas.cartaNumero.numero)-1
            let cartaMen2 = Number(cartasJuntas.cartaNumero.numero)-2

            if(
                soloNumeros.includes(cartaMas1) && 
                soloNumeros.includes(cartaMas2) &&
                soloNumeros.includes(cartaMen1) &&
                soloNumeros.includes(cartaMen2) &&
                mano.length < 1
            ){
                mano.push({ "id":4, "mano":"escalera", "numero":cartaMas2})}

            ////////////ESCALERA AQUI///////////////////.,.,.,.,.,.,.,.,.,..;;'.;..;,;.,;.'.;,',;.',;.//
        });


        //color
        if(cantidadTipo>=5){
            mano.push({ "id":5, "mano":"color", tipo})
        }
    
        if (cantidad===2) {
                mano.push({ "id":1, "mano":"par", numero})
        }else if(cantidad===3){
            mano.push({ "id":3, "mano":"trio", numero})
        }else if(cantidad===4){
            mano.push({ "id":7, "mano":"poker", numero})
        }
    });

    if(!mano.length){
        if (cartasAnalizadas[0].cartaNumero.numero>cartasAnalizadas[1].cartaNumero.numero) {
        mano.push({ "id":0, "mano":"cartaAlta", "numero":cartasAnalizadas[0].cartaNumero.numero})
        }else if (cartasAnalizadas[0].cartaNumero.numero<cartasAnalizadas[1].cartaNumero.numero) {
            mano.push({ "id":0, "mano":"cartaAlta", "numero":cartasAnalizadas[1].cartaNumero.numero})
        }
    }else if(mano.length === 2 && mano[0].mano === "par" && mano[1].mano === "par" && mano[0].numero !== mano[1].numero){
        if(mano[0].numero > mano[1].numero){
            mano.push({"id":2, "mano":"doble Par", "numero": mano[0].numero})
        }else{
            mano.push({"id":2, "mano":"doble Par", "numero": mano[1].numero})
        }
        
        mano.shift();
        mano.shift();
        
    }else if(mano.length === 2 && mano[0].mano === "par" && mano[1].mano === "par" && mano[0].numero === mano[1].numero){
        mano.shift();
        
    }else if(mano.length === 2 && mano[0].mano === "trio" && mano[1].mano === "trio"){
        mano.push({"id":3, "mano":"trio", "numero":mano[0].numero })
        mano.shift();
        mano.shift();
        
    }
    
    
    return mano;

}

function borrar() {
    if(cartasmesa.length){
        cartasMesa.innerHTML=` `;
        cartasPlayer.innerHTML=` `;
        rivalUno.innerHTML=` `;
        rivalDos.innerHTML=` `;
        cartasCreadas = []
        cartasmesa = []
        cartasjugador = []
        cartasrival1 = []
        cartasrival2 = []
       
    }
}

function ganador(J,R1,R2, outJ) {
    desactivar(0,pass)
    desactivar(0,out)
    desactivar(0,bet)

    if( J[0].id > R1[0].id &&  J[0].id > R2[0].id && outJ === false){
        textoGanador(`Gana Jugador con ${J[0].mano}`)
        dinero = dinero+apuesta
    }else if( R1[0].id > J[0].id &&  R1[0].id > R2[0].id){
        textoGanador(`Perdiste, Rival tenia ${R1[0].mano}`)
        dinero = dinero-apuesta
    }else if( R2[0].id > J[0].id &&  R2[0].id > R1[0].id){
        textoGanador(`Perdiste, Rival tenia ${R2[0].mano}`)
        dinero = dinero-apuesta
    }else{

        if(J[0].numero > R2[0].numero && J[0].numero > R2[0].numero && outJ === false){
            textoGanador(` Gana Jugador con ${J[0].mano}`)
            dinero = dinero+apuesta
        }else if(R1[0].numero > R2[0].numero){
            textoGanador(` Gana Rival con ${R1[0].mano}`)
            dinero = dinero-apuesta
        }else if(R1[0].numero < R2[0].numero){
            textoGanador(`Gana Rival con ${R1[0].mano}`)
            dinero = dinero-apuesta
        }else{
            textoGanador(`Error de sistema: Tu mano: ${J[0].mano}`)
        }

    }
}

function textoGanador(texto) {
    GContenedor.style.display = 'block';
    textGanador.textContent = texto
    
}