// components/Keyboard.tsx
"use client"
import React from "react";

interface KeyboardProps{
    onNumberSelect: (number: number) => void;
}

export default function Keyboard({ onNumberSelect }: KeyboardProps) {
  let numbersCards = [];

  for (let i = 0; i < 9; i++) {
    numbersCards.push(
      <div key={i} className="number">
        <div
          className="cell white"
          onClick={() => onNumberSelect(i + 1)}
        >
          {i + 1}
        </div>
        <div className="percentageBar"></div>
      </div>
    );
  }

  return <div className="numbers">{numbersCards}</div>;
}
