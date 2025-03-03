import { languages } from "./languagesArray";
import clsx from "clsx";

export default function Hangman(props) {
  const { count, gameWon } = props;

  // Language buttons with opacity logic based on mistakes
  const languageArray = languages.map((language, index) => (
    <button
      className="hangman-lang"
      key={language.name}
      style={{
        backgroundColor: language.backgroundColor,
        color: language.color,
        opacity: index < count ? "0.5" : "1", // Only dim languages affected by mistakes
      }}
      aria-label={
        index < count
          ? `You lose ${language.name} language`
          : `This is ${language.name} language`
      }
      disabled
    >
      {index < count ? "💀 " : ""}
      {language.name}
    </button>
  ));

  // Check if the game is lost
  const gameLose = count === languages.length;

  // Define status conditions
  const farewell = !gameLose && !gameWon && count > 0;
  const youLose = gameLose && !gameWon;
  const youWon = !gameLose && gameWon;
  // Build a string for the game message based on mistakes
  const gameMessage = languages
    .slice(0, count)
    .map((language, index) =>
      index > 0 ? `&& ${language.name}` : `${language.name}`
    )
    .join(" "); // Join the names with '&&' for a formatted message

  //

  const gameStatus = (
    <section
      aria-live="polite"
      role="status"
      className={clsx("game-status", { correct: youWon }, { wrong: youLose })}
    >
      {farewell && (
        <>
          <h2>Farewell</h2> <p>{gameMessage}</p>
        </>
      )}
      {youLose && (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )}
      {youWon && (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )}
    </section>
  );

  return (
    <>
      {gameStatus}
      <div className="lang-field">{languageArray}</div>
    </>
  );
}
