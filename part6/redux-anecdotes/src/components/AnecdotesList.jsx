import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
const AnecdotesList = () => {
  const anecdotesList = useSelector(({ filter, anecdotes }) =>
    filter.length
      ? anecdotes.filter((a) =>
          a.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes
  );
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(voteForAnecdote(id));
  };
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotesList
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdotesList;
