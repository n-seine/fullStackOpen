import { create } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdotesForm = () => {
  const dispatch = useDispatch();
  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(create(content));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <label htmlFor="anecdote">A new anecdote :</label>
          <input name="anecdote" id="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdotesForm;
