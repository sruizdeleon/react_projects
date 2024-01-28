import { useState } from "react"
import Titulo from "../titulo/Titulo"
import "./Contador.css"
import Botones from "../botones/Botones";


export default function Contador() {
	const [contador /* lectura*/, setContador /* escritura */] = useState(0);
	//hago reactiva la variable contador con un lado de lectura y otro de escritura, hacemos explicito que un cambio se pinte en la pantalla.

	function sumar() {
		setContador(contador + 1);
	}

	function restar() {
		setContador(contador - 1);
	}

	return (
		<div className="card">
			<div className="card__header">
				<Titulo color="red"></Titulo>
			</div>
			<div className="card__body">
				<h5 className="card__copy">{contador}</h5>
			</div>
			<div className="card__footer">
				<Botones onSumar={sumar} onRestar={restar}></Botones>
			</div>
		</div>
	);
}