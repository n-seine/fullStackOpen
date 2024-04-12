import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const getInitialVotes = () => {
    let votes = [];
    for (let i = 0; i < anecdotes.length; i++) {
      votes.push({ anecdote: i, votes: 0 });
    }
    return votes;
  };
  const initialVotes = getInitialVotes();
  const [votes, setVotes] = useState(initialVotes);
  const [selected, setSelected] = useState(0);
  const topRatedAnecdote = votes.find(
    (anecdote) =>
      anecdote.votes === Math.max(...votes.map((anecdote) => anecdote.votes))
  );

  const selectAnotherAnecdote = (current) => {
    let newAnecdote = Math.floor(Math.random() * anecdotes.length);
    while (newAnecdote === current) {
      newAnecdote = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(newAnecdote);
  };

  const handleVote = (anecdoteIndex) => {
    const anecdote = votes.find((vote) => vote.anecdote === anecdoteIndex);
    const newVotes = votes
      .filter((vote) => vote.anecdote !== anecdoteIndex)
      .concat({
        anecdote: anecdoteIndex,
        votes: anecdote.votes + 1,
      });
    setVotes(newVotes);
  };
  return (
    <main>
      <h1>Random dev anecdote</h1>

      <div>{anecdotes[selected]}</div>
      <button
        onClick={() => {
          selectAnotherAnecdote(selected);
        }}
      >
        Pick an anecdote
      </button>
      <button onClick={() => handleVote(selected)}>Vote</button>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[topRatedAnecdote.anecdote]}</p>
        <p>is the best one, with {topRatedAnecdote.votes} votes</p>
      </div>
    </main>
  );
};

export default App;
