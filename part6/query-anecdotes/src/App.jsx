import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, voteAnecdote } from "./utils/requests";
import { notificationReducer } from "./reducers/notificationReducer";
import { useReducer } from "react";
import NotificationContext from "./context/notificationContext";

const App = () => {
  const [notification, setNotification] = useReducer(notificationReducer, "");
  const queryClient = useQueryClient();
  const voteForAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
  });
  const handleVote = (anecdote) => {
    voteForAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });

    setNotification({
      type: "SET",
      data: `you voted for '${anecdote.content}'`,
    });

    setTimeout(() => {
      setNotification({ data: "" });
    }, 2000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    console.log(result.error);
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data.sort((a, b) => b.votes - a.votes) || [];

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default App;
