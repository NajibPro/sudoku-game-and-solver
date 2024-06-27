"use client"
import { useState } from "react";
import useSudokuBoardViewModel from "./board.viewModel";

const useSudokuGameViewModel = () => {
  //the screens are [start screen, play screen, solve sudoku screen, and setting level screen]
  const [inWhichScreen, setInWhichScreen] = useState<number>(0)
  const [giveUpCount, setGiveUpCount] = useState<number>(0)
  const [explainingMsgContent, setExplainingMsgContent] = useState<string | null>(null)

  const sudokuBoardViewModel = useSudokuBoardViewModel();


  const handleNumberSelect = (number: number) => {
    if(inWhichScreen == 2){
      setExplainingMsgContent("Enter a valid Sudoku problem")
    }
    if (sudokuBoardViewModel.selectedCell.row !== null && sudokuBoardViewModel.selectedCell.col !== null) {
      sudokuBoardViewModel.handleCellChange(
        sudokuBoardViewModel.selectedCell.row,
        sudokuBoardViewModel.selectedCell.col,
        number,
        null
      );
    }
  };

  const handleHintClick = () => {
    if (sudokuBoardViewModel.selectedCell.row !== null && sudokuBoardViewModel.selectedCell.col !== null && sudokuBoardViewModel.sudoku.solution) {
      let correctFilling: number | null = sudokuBoardViewModel.sudoku.solution[sudokuBoardViewModel.selectedCell.row][sudokuBoardViewModel.selectedCell.col].digit;
      console.log(sudokuBoardViewModel.sudoku.solution)

      if(correctFilling){
        sudokuBoardViewModel.handleCellChange(sudokuBoardViewModel.selectedCell.row, sudokuBoardViewModel.selectedCell.col, correctFilling, true)
      }
    }
      
  }

  const handleSolutionClick = () => {
    if(!sudokuBoardViewModel.sudoku.isValidBoard() && inWhichScreen == 2){
      setExplainingMsgContent("the board entered is not valid, it can not be solved")
    }else{
      sudokuBoardViewModel.sudoku.solve();
      setGiveUpCount(giveUpCount+1)
    }
  }

  const handleEraseClick = () => {
    if (sudokuBoardViewModel.selectedCell.row !== null && sudokuBoardViewModel.selectedCell.col !== null) {
      sudokuBoardViewModel.handleCellChange(
        sudokuBoardViewModel.selectedCell.row,
        sudokuBoardViewModel.selectedCell.col,
        null,
        null
      );
    }
  }

  const handleBackClick = () => {
    setExplainingMsgContent(null)
    setInWhichScreen(0)
  }

  const handleNewSolveClick = () => {
    sudokuBoardViewModel.getNewGame(null)
    setExplainingMsgContent("Enter a valid Sudoku problem")
    setInWhichScreen(2)
  }

  const handleNewGameClick = () => {
    setInWhichScreen(3)
  }

  const handleLevelSelect = (level: 'easy' | 'medium' | 'hard' | 'expert' | null) => {
    sudokuBoardViewModel.getNewGame(level)
    setInWhichScreen(1)
  }

  return {
    sudokuBoardViewModel,
    handleNumberSelect,
    inWhichScreen,
    setInWhichScreen,
    giveUpCount,
    setGiveUpCount,
    handleHintClick,
    handleSolutionClick,
    handleEraseClick,
    explainingMsgContent,
    handleLevelSelect,
    handleBackClick,
    handleNewSolveClick,
    handleNewGameClick,
  };
};

export default useSudokuGameViewModel;