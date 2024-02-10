import './Carta.css'

function Carta({figura, volteada, onClick}) {
    return (
        <>
            {!volteada?
                <div className={"card__container-notshow"} onClick={onClick}>?</div>
                :<div className={"card__container-show"} onClick={onClick}>
                    {figura}
                </div>
            }
        </>
	);
}

export default Carta
