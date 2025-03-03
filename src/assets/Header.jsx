import React from "react";
export default function Header(props) {
  const gameStatus = props.gameWon
    ? "You Won! Good Job!"
    : "Game Over! You Lose!";
  return (
    <header>
      <h1>Assembly</h1>
      <h5>
        Guess the word within 8 attempts to keep the programming world safe from
        Assembly!
      </h5>
    </header>
  );
}
