import './CronoButtons.css'

const CronoButtons = ({onStart, onStop, onLap, onReset, tiempoActivo}) => {

    function botonStartStop(){
        if(tiempoActivo) {
            onStop()
        } else {
            onStart()
        }
    }

    return (
		<>
			{tiempoActivo ? (
				<button className="button button__time button__time--stop" onClick={botonStartStop}>
					Stop
				</button>
			) : (
				<button className="button button__time button__time--start" onClick={botonStartStop}>
					Start
				</button>
			)}
			<div className="button__set">
				<button className="button__secundary" onClick={onLap}>
					Lap
				</button>
				<button className="button__secundary" onClick={onReset}>
					Reset
				</button>
			</div>
		</>
	);
}

export default CronoButtons
