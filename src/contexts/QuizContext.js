import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
  questions: [],
  //! status -> 'loading', 'error', 'ready','active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };

    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
        highscore: state.highscore,
      };

    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };

    default:
      throw new Error('Unknown action');
  }
}

function QuizProvider({ children }) {
  //! useReducer hook
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  //! derived states
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:9000/questions');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        dispatch({ type: 'dataReceived', payload: data });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
      }
    }
    fetchData();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
        numQuestions,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('QuizContext was used outside of the QuizProvider');
  return context;
}

export { QuizProvider, useQuiz };
