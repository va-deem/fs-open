import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, allClicks }) => {
  const all = good + neutral + bad;
  const average = allClicks.reduce((acc, item) => acc + item, 0) / allClicks.length;
  const positive = good / allClicks.length * 100;

  if (allClicks.length > 0) {
    return (
      <table>
        <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive + " %"} />
        </tbody>
      </table>
    );
  }

  return <div>No feedback yet</div>;
};

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleClickGood = () => {
    setAll(allClicks.concat(1));
    setGood(good + 1);
  };

  const handleClickNeutral = () => {
    setAll(allClicks.concat(0));
    setNeutral(neutral + 1);
  };

  const handleClickBad = () => {
    setAll(allClicks.concat(-1));
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" handleClick={handleClickGood} />
      <Button text="Neutral" handleClick={handleClickNeutral} />
      <Button text="Bad" handleClick={handleClickBad} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}
                  allClicks={allClicks} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
