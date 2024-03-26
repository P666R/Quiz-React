import { useReducer } from 'react';

//! initial state for useReducer
const initialState = {
  count: 0,
  step: 1,
};

//! reducer function with current state and action object as parameters
function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case 'inc':
      //! return a brand new object
      return { ...state, count: state.count + state.step };

    case 'dec':
      return { ...state, count: state.count - state.step };

    case 'setCount':
      return { ...state, count: action.payload };

    case 'setStep':
      return { ...state, step: action.payload };

    case 'reset':
      return initialState;

    default:
      throw new Error('Unknown action');
  }
}

function DateCounter() {
  //! useReducer with reducer function and initial state
  const [state, dispatch] = useReducer(reducer, initialState);

  //! destructuring state
  const { count, step } = state;

  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    //! dispatching an action object with type
    dispatch({ type: 'dec' });
  };

  const inc = function () {
    //! dispatching an action object with type
    dispatch({ type: 'inc' });
  };

  const defineCount = function (e) {
    //! dispatching an action object with type and payload
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    //! dispatching an action object with type and payload
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    //! dispatching an action object with type
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
