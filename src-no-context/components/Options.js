function Options({ options, correctOption, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered ? (index === correctOption ? 'correct' : 'wrong') : ''
          }`}
          key={index}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
