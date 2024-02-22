import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';

const initialState = {
  questions: [],
  //! loading, error, ready, active, finished states
  status: 'loading',
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'loading':
      return { ...state, status: 'loading' };

    case 'error':
      return { ...state, status: 'error' };

    case 'ready':
      return { ...state, status: 'ready' };

    case 'active':
      return { ...state, status: 'active' };

    case 'finished':
      return { ...state, status: 'finished' };

    default:
      throw new Error('Unknown action');
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();
        dispatch({ type: 'dataReceived', payload: data });
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        <p>1</p>
        <p>question</p>
      </Main>
    </div>
  );
}
