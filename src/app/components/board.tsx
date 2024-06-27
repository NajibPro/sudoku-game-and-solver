// components/Board.tsx
"use client"
import React from "react";
import useSudokuBoardViewModel from "../viewModels/board.viewModel";

interface BoardProps{
  sudokuBoardViewModel: any;
}

export default function Board({ sudokuBoardViewModel }: BoardProps) {
  let subgrids = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let subGridStartRow = i * 3;
      let subGridStartCol = j * 3;
      let subgrid = [];
      for (let k = subGridStartRow; k < subGridStartRow + 3; k++) {
        for (let l = subGridStartCol; l < subGridStartCol + 3; l++) {
          const cellFixed = sudokuBoardViewModel.sudoku.getCell(k, l).isFixed;
          const cellDigit = sudokuBoardViewModel.sudoku.getCell(k, l).digit;
          subgrid.push(
            <div
              key={`${k}-${l}`}
              className={`cell ${cellFixed ? "white" : ""} ${
                sudokuBoardViewModel.isHighlightedCell(k, l) ? "highlighted" : ""
              } ${
                sudokuBoardViewModel.isSelectedCell(k, l) ? "clicked" : ""
              } ${
                sudokuBoardViewModel.isWronglyFilledCell(k, l) && !cellFixed || (sudokuBoardViewModel.isWronglyFilledCell(k, l) && sudokuBoardViewModel.isHighlightedCell(k, l) && sudokuBoardViewModel.sudoku.getCell(sudokuBoardViewModel.selectedCell.row, sudokuBoardViewModel.selectedCell.col).digit == cellDigit) ? "wrong" : ""
              }`}
              onClick={() => sudokuBoardViewModel.handleCellClick(k, l)}
            >
              {cellDigit ? cellDigit : ""}
            </div>
          );
        }
      }

      subgrids.push(
        <div key={`${i}-${j}`} className="subgrid">
          {subgrid}
        </div>
      );
    }
  }

  return <div className="board">{subgrids}</div>;
}
