//import { ACTIONS } from "./App";

export default function DigitButton({ digit, dispatch }) {
  //console.log(digit);
  return (
    <button onClick={() => dispatch({ type: "add-digit", payload: { digit } })}>
      {digit}
    </button>
  );
}
