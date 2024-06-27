"use client"
import { useState, useEffect } from 'react';
import Sudoku from '../models/sudoku';
import Cell from '../models/cell';

interface CellPosition {
  row: number | null;
  col: number | null;
}

interface HighlightedCell {
  row: number;
  col: number;
}

const useSudokuBoardViewModel = () => {
  const [sudoku, setSudoku] = useState(new Sudoku());
  const [selectedCell, setSelectedCell] = useState<CellPosition>({ row: null, col: null });
  const [highlightedCells, setHighlightedCells] = useState<HighlightedCell[]>([]);
  const [completionPercentages, setCompletionPercentages] = useState<number[]>(Array(9).fill(0));
  const [isCompleted, setIsCompleted] = useState(false);
  const [level, setLevel] = useState<"easy" | "medium" | "hard" | "expert" | null>(null);
  const [gameCount, setGameCount] = useState<number>(0)

  useEffect(() => {
    if(level){
      sudoku.initializeBoard(level);
      updateCompletionPercentages();
    }else{
      let newSudoku = new Sudoku()
      setSudoku(newSudoku)
    }
  }, [gameCount]);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
    updateHighlightedCells(row, col);
  };

  const handleBoardClick = () => {
    setSelectedCell({ row: null, col: null });
    setHighlightedCells([]);
  };

  const isHighlightedCell = (row: number, col: number) => {
    return highlightedCells.some(cell => cell.row === row && cell.col === col);
  }

  const isSelectedCell = (row: number, col: number) => {
    return selectedCell.col == col && selectedCell.row == row
  }

  const isWronglyFilledCell = (row: number, col: number) => {
    let cellDigit = sudoku.getCell(row, col).digit
    if(cellDigit == null) return false;

    return !sudoku.isValidFilling(row, col, cellDigit);
  }

  const updateHighlightedCells = (row: number, col: number) => {
    const newHighlightedCells: HighlightedCell[] = [];

    // Highlight the same row and column
    for (let i = 0; i < 9; i++) {
      if (i !== col) newHighlightedCells.push({ row, col: i });
      if (i !== row) newHighlightedCells.push({ row: i, col });
    }

    // Highlight the same subgrid
    const subgridRowStart = Math.floor(row / 3) * 3;
    const subgridColStart = Math.floor(col / 3) * 3;
    for (let r = subgridRowStart; r < subgridRowStart + 3; r++) {
      for (let c = subgridColStart; c < subgridColStart + 3; c++) {
        if (r !== row || c !== col) newHighlightedCells.push({ row: r, col: c });
      }
    }

    setHighlightedCells(newHighlightedCells);
  };

  const handleCellChange = (row: number, col: number, value: number | null, isFixed: boolean | null) => {
    try {
      sudoku.setCell(row, col, value, isFixed == null ? undefined : isFixed);
      updateCompletionPercentages();
      //this line is added so the sudoku board will be updated once we use a hint, it will be removed when we 
      //work with percentages next time
      handleCellClick(row, col)
      if (sudoku.isValidBoard()) {
        setIsCompleted(true);
      }
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  const updateCompletionPercentages = () => {
    const counts = Array(9).fill(0);
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const digit = sudoku.getCell(row, col).digit;
        if (digit !== null) counts[digit - 1]++;
      }
    }
    setCompletionPercentages(counts.map(count => (count / 9) * 100));
  };

  const getNewGame = (level: "easy" | "medium" | "hard" | "expert" | null) => {
    setLevel(level)
    setGameCount(gameCount+1)
  }

  return {
    sudoku,
    selectedCell,
    highlightedCells,
    completionPercentages,
    isCompleted,
    handleCellClick,
    handleBoardClick,
    handleCellChange,
    isHighlightedCell,
    isSelectedCell,
    isWronglyFilledCell,
    level,
    setLevel,
    getNewGame,
  };
};

export default useSudokuBoardViewModel;
