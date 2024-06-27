interface StartProps{
    handleChoosingGame: () => void
    handleChoosingSolve: () => void
}
export default function Start( {handleChoosingGame, handleChoosingSolve}: StartProps ){
    return (
        <div className="start_options">
            <div className="option_card" onClick={() => {handleChoosingGame()}}>New Game</div>
            <div className="option_card" onClick={() => {handleChoosingSolve()}}>Solve Game</div>
        </div>
    );
}