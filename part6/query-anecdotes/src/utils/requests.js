export const getAnecdotes = async () => {
  const res = await fetch("http://localhost:3001/anecdotes");
  return await res.json();
};

export const addAnecdote = async (content) => {
  const res = await fetch("http://localhost:3001/anecdotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
  return await res.json();
};

export const voteAnecdote = async (updatedAnecdote) => {
  const res = await fetch(
    `http://localhost:3001/anecdotes/${updatedAnecdote.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAnecdote),
    }
  );
  return await res.json();
};
