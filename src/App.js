import React, { useReducer, useState } from "react";
import "./index.css";
import OperationButton from "./OperationButton";
import DigitButton from "./DigitButton";
import { reducer } from "./Reducer";

//"add-digit"
//"choose-op"
//"clear"
//"delete-digit"
//"equal"

const formater = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

function formating(number) {
  if (number == null) {
    return;
  }
  const [integer, decimal] = number.split(".");
  if (decimal == null) {
    return formater.format(integer);
  }
  return `$(formater.format(integer).decimal)`;
}

function App() {
  const [{ pre, current, operation }, dispatch] = useReducer(reducer, {});
  //console.log("hello", current);

  //dispatch({ type: "add-digit", payload: { digit: 1 } });

  console.log(pre, current, operation);

  return (
    <>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {formating(pre)}
            {operation}
          </div>
          <div className="current-operand">{formating(current)}</div>
        </div>
        <button
          className="span-two"
          onClick={() => dispatch({ type: "clear" })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: "delete-digit" })}>DEL</button>
        <OperationButton dispatch={dispatch} operation="÷" />
        <DigitButton dispatch={dispatch} digit="1" />
        <DigitButton dispatch={dispatch} digit="2" />
        <DigitButton dispatch={dispatch} digit="3" />
        <OperationButton dispatch={dispatch} operation="*" />
        <DigitButton dispatch={dispatch} digit="4" />
        <DigitButton dispatch={dispatch} digit="5" />
        <DigitButton dispatch={dispatch} digit="6" />
        <OperationButton dispatch={dispatch} operation="+" />
        <DigitButton dispatch={dispatch} digit="7" />
        <DigitButton dispatch={dispatch} digit="8" />
        <DigitButton dispatch={dispatch} digit="9" />
        <OperationButton dispatch={dispatch} operation="-" />
        <DigitButton dispatch={dispatch} digit="." />
        <DigitButton dispatch={dispatch} digit="0" />
        <button
          className="span-two"
          onClick={() => dispatch({ type: "equal" })}
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;
