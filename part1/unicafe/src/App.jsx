import { useState } from "react";

const RateButton = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text} </button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <li>
      {text} {value}
    </li>
  );
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <ul>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="% of positive values" value={positive} />
    </ul>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = total !== 0 ? ((good - bad) / total).toFixed(2) : undefined;
  const positive =
    total !== 0 ? ((good / total) * 100).toFixed(2) + " %" : undefined;

  return (
    <div>
      <section>
        <h1>give feedback</h1>
        <RateButton handleClick={() => setGood(good + 1)} text="good" />
        <RateButton
          handleClick={() => setNeutral(neutral + 1)}
          text="neutral"
        />
        <RateButton handleClick={() => setBad(bad + 1)} text="bad" />
      </section>
      <section>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive}
        />
      </section>
    </div>
  );
};

export default App;
