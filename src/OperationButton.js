//import { ACTIONS } from "./App";

export default function DigitButton({ operation, dispatch }) {
  return (
    <button
      onClick={() => dispatch({ type: "choose-op", payload: { operation } })}
    >
      {operation}
    </button>
  );
}
