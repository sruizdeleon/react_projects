import { useState } from "react";
import "./App.css";

function App() {
	const [contador, setContador] = useState(0);

	return (
		<div className="counter">
			<h1 className="counter__title">CONTADOR</h1>
			<h2 className="counter__text" data-testid="contador">
				{contador}
			</h2>
			<div className="counter__button-container">
				<button className="counter__button" data-testid="boton-suma" onClick={() => setContador(contador + 1)}>
					+
				</button>
				<button className="counter__button" data-testid="boton-resta" onClick={() => setContador(contador - 1)}>
					-
				</button>
			</div>
		</div>
	);
}

export default App;
