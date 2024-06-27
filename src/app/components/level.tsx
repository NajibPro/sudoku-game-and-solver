interface LevelProps{
    handleChoosingLevel: (level: 'easy' | 'medium' | 'hard' | 'expert') => void;
}

export default function Level({ handleChoosingLevel }: LevelProps){
    return (
        <div className="levels">
            <div className="explaining_text">Choose game level</div>
            <div className="list">
                <div className="option_card" onClick={() =>{handleChoosingLevel('easy')}}>Easy</div>
                <div className="option_card" onClick={() =>{handleChoosingLevel('medium')}}>Medium</div>
                <div className="option_card" onClick={() =>{handleChoosingLevel('hard')}}>Hard</div>
                <div className="option_card" onClick={() =>{handleChoosingLevel('expert')}}>Expert</div>
            </div>
        </div>
        

    );
}