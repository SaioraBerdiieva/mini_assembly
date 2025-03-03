import CurrentWord from "./CurrentWord";

export default function Keyboard(props) {
    let style ={
  backgroundColor: "#fcba29"}
  return (
    <button
      className="keyboard-letter"
      aria-label={`This is a letter ${props.letter.toUpperCase()}`}
    >
      {props.letter.toUpperCase()}
    </button>
  );
}
