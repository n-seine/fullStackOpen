import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addAnecdote } from "../utils/requests";
import { useContext, useReducer } from "react";
import { notificationReducer } from "../reducers/notificationReducer";
import NotificationContext from "../context/notificationContext";

const AnecdoteForm = () => {
  const QueryClient = useQueryClient();
  const [notification, setNotification] = useContext(NotificationContext);

  const onSuccessfulCreation = (content) => {
    setNotification({
      type: "SET",
      data: `added anecdote : '${content}'`,
    });

    setTimeout(() => {
      setNotification({ data: "" });
    }, 2000);

    QueryClient.invalidateQueries({ queryKey: ["anecdotes"] });
  };

  const onErrorOnCreation = (content) => {
    setNotification({
      type: "SET",
      data: `'${content}' content is too short,it must have 5 characters or more`,
    });
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: (anecdote) => addAnecdote(anecdote),
    onSuccess: (anecdote) => onSuccessfulCreation(anecdote.content),
    onError: (anecdote) => onErrorOnCreation(anecdote.content),
  });
  console.log(newAnecdoteMutation);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    console.log(content);
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
