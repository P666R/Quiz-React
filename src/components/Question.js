import Options from './Options';

function Question({ question: { question, options, correctOption, points } }) {
  return (
    <div>
      <h4>{question}</h4>
      <Options options={options} />
    </div>
  );
}

export default Question;
