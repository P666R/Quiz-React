import Options from './Options';

function Question({
  question: { question, options, correctOption, points },
  dispatch,
  answer,
}) {
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
