'use client'
import React from "react";
interface ActionsProps{
    isInSolution: boolean;
    onSolveSelect: () => void;
    onResetSelect: () => void;
    onBackSelect: () => void;
    onHintSelect: () => void;
}

export default function Actions({ isInSolution, onSolveSelect, onResetSelect, onBackSelect, onHintSelect} : ActionsProps){
    return (
        <div className="actions">
          <div className="solve" onClick={onSolveSelect}>
            <div className="icon"></div>
            <div className="text">Solve</div>
          </div>
          {!isInSolution && (
                <div className="hint" onClick={onHintSelect}>
                    <div className="icon"></div>
                    <div className="text">Hint</div>
                </div>
            )}
          
          <div className="erase" onClick={onResetSelect}>
            <div className="icon"></div>
            <div className="text">Erase</div>
          </div>
          <div className="new" onClick={onBackSelect}>
            <div className="icon"></div>
            <div className="text">Back</div>
          </div>
        </div>
    );
}