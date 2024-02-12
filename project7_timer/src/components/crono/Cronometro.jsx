import { useState } from "react";
import CronoButtons from "../cronoButtons/CronoButtons";
import './Cronometro.css'

const DEFAULTTIME = "00:00:00:00";
let centesimas = 0;
let runningTime = null;

const Cronometro = () => {
	const [tiempo, setTiempo] = useState(DEFAULTTIME);
	const [tiempoActivo, setTiempoActivo] = useState(false);
	const [vueltas, setVueltas] = useState(1);
	const [registros, setRegistros] = useState([]);

	function start() {
		if (runningTime === null) {
			runningTime = setInterval(() => {
				centesimas++;
				const h = Math.floor(centesimas / (100 * 60 * 60));
				const m = Math.floor((centesimas / (100 * 60)) % 60);
				const s = Math.floor((centesimas % (100 * 60)) / 100);
				const c = Math.floor((centesimas % (60 * 60)) % 100);
				setTiempo(
					`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
						.toString()
						.padStart(2, "0")}:${c.toString().padStart(2, "0")}`
				);
			}, 10);
		}
		setTiempoActivo(true);
	}

	function stop() {
		clearInterval(runningTime);
		runningTime = null;
		setTiempoActivo(false);
	}

	function lap() {
		if (registros.length === 0) {
			setRegistros([...registros, { lap: `Vuelta ${vueltas}`, time: tiempo }]);
			setVueltas(vueltas + 1);
		} else if (registros.length > 0 && registros[registros.length - 1].time !== tiempo) {
			setRegistros([...registros, { lap: `Vuelta ${vueltas}`, time: tiempo }]);
			setVueltas(vueltas + 1);
		}
	}

	function reset() {
		centesimas = 0;
		setTiempo(DEFAULTTIME);
		setRegistros([]);
		setVueltas(1);
		tiempoActivo ? setTiempoActivo(true) : setTiempoActivo(false);
	}

	return (
		<>
			<div className="cronometro">
				<div className="display">
					<h1 className="display__title">Cronómetro</h1>
					<p className="display__time">{tiempo}</p>
					<CronoButtons className="display__panel"
						tiempoActivo={tiempoActivo}
						onStart={start}
						onStop={stop}
						onLap={lap}
						onReset={reset}
					></CronoButtons>
				</div>
				{registros.length > 0 ? (
					<div className="registers">
						<h2 className="registers__title">Registros</h2>
						<div className="registers__container">
							{registros.map((registro, i) => (
								<pre className="registers__line" key={i}>{`${registro.lap} -- ${registro.time}`}</pre>
							))}
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
};

export default Cronometro;
