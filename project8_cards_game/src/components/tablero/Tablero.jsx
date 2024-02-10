import { useEffect, useState } from "react";
import Carta from "../carta/Carta";
import Marcador from "../marcador/Marcador";
import './Tablero.css'


let preparando = true;
let juegoIniciado = false;
let timer = null;
const cartasSeleccionadas = new Array();


export default function Tablero() {

    const [aciertos, setAciertos] = useState(0)
    const [fallos, setFallos] = useState(0)
    const [figuraTurno, setFiguraTurno] = useState(null)
    const [cartas, setCartas] = useState([
		{ figura: "🥭", volteada: true },
		{ figura: "🍏", volteada: true },
		{ figura: "🍉", volteada: true },
		{ figura: "🍌", volteada: true },
		{ figura: "🍊", volteada: true },
		{ figura: "🍈", volteada: true },
	]);


    useEffect(()=>{
        const cartasBarajadas = new Array;
        let posiciones = cartas.map((c,i)=>i)

        while (posiciones.length !== 0) {
            const posAleatoria = Math.floor(Math.random() * (posiciones.length))
            const numero = posiciones.splice(posAleatoria, 1)
            cartasBarajadas.push(cartas[numero])
        }

        setCartas(cartasBarajadas);

        if(timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            const nuevasCartas = new Array;
            cartasBarajadas.forEach((carta) => {
                nuevasCartas.push({ figura: carta.figura, volteada: !carta.volteada });
            });

            setCartas(nuevasCartas);
            preparando = false;
        },5000)

    },[])

    function voltearCarta (c) {
        if(preparando || c.volteada===true || juegoIniciado === false){
            return
        }
        console.log('carta volteada' + c.figura)
        const nuevasCartas = new Array;

        cartas.forEach(carta=>{
            if(carta.figura === c.figura) {
                nuevasCartas.push({figura: c.figura, volteada: !c.volteada})
            } else {
                nuevasCartas.push(carta)
            }
        })

        setCartas(nuevasCartas)

        cartasSeleccionadas.push(c)
        if(c.figura === figuraTurno){
            setAciertos(aciertos+1)
            cambiarTurno()
        } else {
            setFallos(fallos+1)
        }
    }

    function cambiarTurno (){
        const cartasPosibles = new Array;
        cartas.forEach(carta=>{
            if(!cartasSeleccionadas.find(x=>x.figura===carta.figura)){
                cartasPosibles.push(carta)
            }
        })

        if(cartasPosibles.length===0){
            alert(`Fin de partida ${aciertos>=fallos?"Has ganado":"Has perdido"}`)
        } else {
            setFiguraTurno(cartasPosibles[Math.floor(Math.random() * cartasPosibles.length)].figura);
        }
    }

    function comenzar (){
        preparando = false;
        juegoIniciado = true;
        cambiarTurno()
    }

    return (
		<div>
            <h1>Cards game</h1>
			<Marcador figura={figuraTurno} aciertos={aciertos} fallos={fallos} juegoIniciado={juegoIniciado}></Marcador>
			<div className="controls">
				<button disabled={preparando} onClick={comenzar}>
					Comenzar
				</button>
				<button disabled={preparando} onClick={() => window.location.reload()}>
					Reiniciar
				</button>
			</div>
			<div className="panel">
				{cartas.map((carta, i) => (
					<Carta
						key={i}
						figura={carta.figura}
						volteada={carta.volteada}
						onClick={() => voltearCarta(carta)}
					></Carta>
				))}
				{/* Esto es importante: Al hacer el map pasamos por parámetro la propia carta así si la función se ejecuta nos devuelve un evento con todo el objeto de la carta que ha sido pulsada. */}
			</div>
		</div>
	);
}
