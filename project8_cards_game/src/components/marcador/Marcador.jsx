import Carta from "../carta/Carta"
import '../carta/Carta.css'
import './Marcador.css'

function Marcador({aciertos, fallos, figura, juegoIniciado}) {
    return (
		<div className="scoreboard">
			<div className="scoreboard__score">
				<div className="scoreboard__score-text">
					<div className="scoreboard__successes-ball"></div>
					<p>{aciertos} aciertos</p>
				</div>
				<div className="scoreboard__score-text">
					<div className="scoreboard__failures-ball"></div>
					<p>{fallos} fallos</p>
				</div>
			</div>
			<div className="scoreboard__card-search">
				<p>Encuentra la fruta</p>
				{!juegoIniciado ? (
					<div className={"card__container-notshow"}>?</div>
				) : (
					<>
						<div className={"card__container-show"}>{figura}</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Marcador
