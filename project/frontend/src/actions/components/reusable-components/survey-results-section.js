import "./reusable-components.css";

export default function SurveyResultsSection({ question, results = [] }) {
  return (
    <section className="survey-results-section">
      {question ? <h2 className="survey-results-question">{question}</h2> : null}

      <div className="survey-results-grid">
        {results.map((result, key) => (
          <div className="survey-result-item" key={key}>
            <strong className="survey-result-percent">{result.percent}</strong>
            <p className="survey-result-text">{result.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
