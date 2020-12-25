import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState({});

  const handleClickNext = () => {
    const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min)) + min;
    setSelected(getRandomNumber(0, props.anecdotes.length - 1));
  };

  const handleClickVote = () => {
    const rating = votes[selected] + 1 || 1;
    setVote({ ...votes, [selected]: rating });
  };

  const findMostPopular = () => {
    const all = Object.entries(votes);
    return all.length > 0
      ? all.sort((a, b) => a[1] - b[1]).pop()[0]
      : selected;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>
        <p>
          has {votes[selected] || 0} votes
        </p>
        <button onClick={handleClickVote}>vote</button>
        <button onClick={handleClickNext}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[findMostPopular()] || props.anecdotes[selected]}
      <div>
        has {votes[findMostPopular()] || 0} votes
      </div>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);
