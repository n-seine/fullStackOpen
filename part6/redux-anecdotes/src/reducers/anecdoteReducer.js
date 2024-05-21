const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const create = (content) => {
  return {
    type: "create",
    payload: {
      content,
    },
  };
};

export const voteForAnecdote = (id) => ({
  type: "vote",
  payload: {
    id,
  },
});

const initialState = anecdotesAtStart.map(asObject);

const anecdotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "vote": {
      const id = action.payload.id;
      const updatedAnecdote = state.find((a) => a.id === id);
      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...updatedAnecdote, votes: updatedAnecdote.votes + 1 }
          : anecdote
      );
    }

    case "create": {
      const anecdote = action.payload.content;
      return state.concat(asObject(anecdote));
    }
    default:
      return state;
  }
};

export default anecdotesReducer;
