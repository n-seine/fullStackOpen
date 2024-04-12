import { useState } from "react";

const RateButton = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text} </button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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
        <h1>statistics</h1>
        {good + neutral + bad === 0 ? (
          <p>Click a button to give feedback</p>
        ) : (
          <ul>
            <li>good :{good}</li>
            <li>neutral :{neutral}</li>
            <li>bad :{bad}</li>
          </ul>
        )}
      </section>
    </div>
  );
};

export default App;
