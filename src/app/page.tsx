"use client"
import { useState, useEffect } from 'react';
import { Outfit } from "next/font/google";
import Board from "@/app/components/board";
import Keyboard from "@/app/components/keyboard";
import useSudokuGameViewModel from "@/app/viewModels/sudokuGame.viewModel";
import Actions from "@/app/components/actions";
import Start from "@/app/components/start";
import Level from "@/app/components/level";

const outfit = Outfit({ subsets: ['latin'] });

export default function SudokuGame() {
  const sudokuGameViewModel = useSudokuGameViewModel();
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [isSmallHeightScreen, setIsSmallHeightScreen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 870);
      setIsSmallHeightScreen(window.innerHeight < 678)
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const shouldDisplayBoard = !((sudokuGameViewModel.inWhichScreen === 0 || sudokuGameViewModel.inWhichScreen === 3) && isSmallScreen);
  const shouldDisplayGameTitle = sudokuGameViewModel.inWhichScreen === 0 || sudokuGameViewModel.inWhichScreen === 3 || !isSmallHeightScreen

  return (
    <>
      <div className="background"></div>
      <main className={`${outfit.className} game`}>
      {shouldDisplayGameTitle && <div className="gameName">Sudoku</div>}
        
        {shouldDisplayBoard && <Board sudokuBoardViewModel={sudokuGameViewModel.sudokuBoardViewModel} />}
        <div className="info">
          <div className="gameName">Sudoku</div>
          {sudokuGameViewModel.explainingMsgContent && <div className="message">{sudokuGameViewModel.explainingMsgContent}</div>}
          <div className="container">
            {sudokuGameViewModel.inWhichScreen == 0 && <Start handleChoosingGame={sudokuGameViewModel.handleNewGameClick} handleChoosingSolve={sudokuGameViewModel.handleNewSolveClick}></Start>}

            {sudokuGameViewModel.inWhichScreen == 3 && <Level handleChoosingLevel={sudokuGameViewModel.handleLevelSelect}></Level>}

            {(sudokuGameViewModel.inWhichScreen == 1 || sudokuGameViewModel.inWhichScreen == 2) &&
              <Keyboard onNumberSelect={sudokuGameViewModel.handleNumberSelect}></Keyboard>
            }

            {(sudokuGameViewModel.inWhichScreen == 1 || sudokuGameViewModel.inWhichScreen == 2) &&
              <Actions
                isInSolution={sudokuGameViewModel.inWhichScreen == 2}
                onSolveSelect={sudokuGameViewModel.handleSolutionClick}
                onResetSelect={sudokuGameViewModel.handleEraseClick}
                onBackSelect={sudokuGameViewModel.handleBackClick}
                onHintSelect={sudokuGameViewModel.handleHintClick}
              ></Actions>
            }
          </div>
        </div>
      </main>
    </>
  );
}
