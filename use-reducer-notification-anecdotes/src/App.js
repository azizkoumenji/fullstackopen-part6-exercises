import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { addVote, getAnecdotes } from "./requests";
import { useNotificationDispatch } from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const updateAnecVotes = useMutation(addVote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const handleVote = (anecdote) => {
    updateAnecVotes.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({
      type: "SET_NOTIFICATION",
      payload: `Voted "${anecdote.content}"`,
    });
    setTimeout(() => {
      dispatch({ type: "SET_NOTIFICATION", payload: "" });
    }, 5000);
  };

  const result = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return (
      <div>anecdote service not available due to problems in the server</div>
    );
  }

  const anecdotes = result.data;

  return (
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
  );
};

export default App;
