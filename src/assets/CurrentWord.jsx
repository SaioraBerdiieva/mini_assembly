export default function CurrentWord(props) {
  const { letterArray, guessedLetter, youLose } = props;
  const showWord = letterArray.map((letter, index) =>
    guessedLetter.includes(letter.toUpperCase()) ? (
      <span
        key={index}
        className="guessing-words-letter"
        aria-label={`The word has a letter ${letter.toUpperCase()} `}
      >
        {letter.toUpperCase()}
      </span>
    ) : (
      <span
        key={index}
        className="guessing-words-letter"
        aria-label={`Unguessed letter}`}
      ></span>
    )
  );

  const unguessedWord = letterArray.map((letter, index) => (
    <span
      key={index}
      className="guessing-words-letter"
      aria-label={`The word has a letter ${letter.toUpperCase()}`}
      style={youLose ? { borderBottom: "2px solid rgb(227, 10, 10)" } : {}}
    >
      {letter.toUpperCase()}
    </span>
  ));
  const srWord = !youLose
    ? "Current word:" +
      letterArray
        .map((letter) =>
          guessedLetter.includes(letter) ? letter + "." : "blank."
        )
        .join(" ")
    : "The word was:" + letterArray.map((letter) => letter + ".").join(" ");
  return (
    <>
      {" "}
      <section className="sr-only" aria-live="polite" role="status">
        <p> {srWord}</p>
      </section>
      <div className="guessing-word">{youLose ? unguessedWord : showWord}</div>
    </>
  );
}
