import { useState } from "react";
import Header from "./assets/Header";
import Hangman from "./assets/Languages";
import CurrentWord from "./assets/CurrentWord";
import clsx from "clsx";
import { languages } from "./assets/languagesArray";
import { words } from "./assets/RandomWord";
import Confetti from "react-confetti";

function App() {
  const [currentWord, setCurrentword] = useState(() => getNewWord());
  //=======Get a random word===========
  function getNewWord() {
    return words[Math.floor(Math.random() * words.length)];
  }
  //=======Make an array of letters from current word===========
  const word = currentWord.split("");
  const wordArray = word.map((letter) => letter.toUpperCase());
  //=======================Guessed letters======================
  const [guessedLetter, setGuessedLetter] = useState([]);
  //================letters for our keyboard===================
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const keyboard = alphabet.split("");
  // Count incorrect guesses (letters that are not in the word)
  const count = guessedLetter.filter(
    (letter) => !wordArray.includes(letter)
  ).length;
  const gameLose = count === languages.length;
  const wordIsGuessed = currentWord
    .split("")
    .every((letter) => guessedLetter.includes(letter.toUpperCase()));
  //==================================================================
  const alphabetArray = keyboard.map((letter) => {
    const isCorrect =
      guessedLetter.includes(letter.toUpperCase()) &&
      wordArray.some((l) => l.toUpperCase() === letter.toUpperCase());
    const isWrong = guessedLetter.includes(letter.toUpperCase()) && !isCorrect;
    return (
      <button
        key={letter}
        className={clsx(
          "keyboard-letter",
          { correct: isCorrect },
          { wrong: isWrong }
        )}
        aria-label={`This is a letter ${letter.toUpperCase()}`}
        onClick={() => checkingLetter(letter.toUpperCase())}
        disabled={
          gameLose ||
          wordIsGuessed ||
          guessedLetter.includes(letter.toUpperCase())
        }
        aria-disabled={
          gameLose ||
          wordIsGuessed ||
          guessedLetter.includes(letter.toUpperCase())
        }
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  //=====================Checking the letter===================
  function checkingLetter(value) {
    const found = !guessedLetter.includes(value);
    if (found) {
      setGuessedLetter((prevGuessedLetter) => [...prevGuessedLetter, value]);
    }
  }
  //=====================New Game===================
  function newGame() {
    setGuessedLetter([]);
    setCurrentword(getNewWord);
  }

  return (
    <main>
      {wordIsGuessed && <Confetti />}
      <Header />
      <Hangman gameWon={wordIsGuessed} count={count} />
      <CurrentWord
        letterArray={wordArray}
        guessedLetter={guessedLetter}
        youLose={gameLose}
      />
      <section className="keyboard">{alphabetArray}</section>
      {(wordIsGuessed || gameLose) && (
        <button className="new-game" onClick={newGame}>
          New Game
        </button>
      )}
    </main>
  );
}

export default App;
