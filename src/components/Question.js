import Options from './Options';
import { useQuiz } from '../contexts/QuizContext';

function Question() {
  const { questions, index, dispatch, answer } = useQuiz();
  const { question, options, correctOption } = questions.at(index);

  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        correctOption={correctOption}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  );
}

export default Question;
