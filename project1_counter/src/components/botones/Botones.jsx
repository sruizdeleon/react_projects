import "./Botones.css"

function Botones({onSumar, onRestar}) {

	return (
		<div className="card__actions">
			<button onClick={onSumar} className="button">
				+
			</button>
			<button onClick={onRestar} className="button">
				-
			</button>
		</div>
	);
}

export default Botones