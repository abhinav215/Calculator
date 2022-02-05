const evaluate = (state) => {
  console.log(state);
  const c = parseFloat(state.current);
  const p = parseFloat(state.pre);
  console.log(p, c, state.operation);
  let result = "";
  if (isNaN(c) || isNaN(p)) {
    return "";
  }
  switch (state.operation) {
    case "*":
      result = p * c;
      break;
    case "-":
      result = p - c;
      break;
    case "+":
      result = p + c;
      break;
    case "/":
      result = p / c;
      break;
  }
  return result.toString();
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "add-digit":
      if (state.overwrite) {
        return {
          ...state,
          current: payload.digit,
          overwrite: false,
        };
      }
      if (state.current === "0" && payload.digit === "0") {
        //console.log("zeroooo");
        return state;
      }
      if (payload.digit === "." && state.current.includes(".")) {
        //console.log("already point hai");
        return state;
      }
      //console.log("add-digit");
      return {
        ...state,
        current: `${state.current || ""}${payload.digit}`,
      };

    case "clear":
      console.log("clear");
      return {
        ...state,
        current: null,
        pre: null,
        operation: null,
      };

    case "delete-digit":
      if (state.overwrite) {
        return {
          ...state,
          current: null,
          overwrite: false,
        };
      }
      if (state.current === null) {
        return state;
      }
      if (state.current.length === 1) {
        return {
          ...state,
          current: null,
        };
      }
      console.log("delete-digit");
      return {
        ...state,
        current: state.current.slice(0, -1),
      };

    case "equal":
      if (
        state.pre === null ||
        state.current === null ||
        state.operation === null
      ) {
        console.log("insufficiant info");
        return { ...state };
      }
      console.log("equal");
      return {
        ...state,
        overwrite: true,
        pre: null,
        current: evaluate(state),
        operation: null,
      };

    case "choose-op":
      if (state.current === null && state.pre == null) {
        console.log("sab kuch null hai");
        return {};
      }
      if (state.current === null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.pre == null) {
        console.log("operation performing");
        return {
          ...state,
          pre: state.current,
          current: null,
          operation: payload.operation,
        };
      }
      console.log("choose-op");
      return {
        ...state,
        pre: evaluate(state),
        current: null,
        operation: payload.operation,
      };
    default:
      return state;
  }
};
