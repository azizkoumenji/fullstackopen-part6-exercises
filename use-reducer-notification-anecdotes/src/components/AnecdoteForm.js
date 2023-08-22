import { useNotificationDispatch } from "../NotificationContext";
import { createAnecdote } from "../requests";
import { useMutation, useQueryClient } from "react-query";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
      dispatch({
        type: "SET_NOTIFICATION",
        payload: `Created "${newAnecdote.content}" anecdote`,
      });
      setTimeout(() => {
        dispatch({ type: "SET_NOTIFICATION", payload: "" });
      }, 5000);
    },
    onError: (err) => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: "Too short anecdote, must have length 5 or more",
      });
      setTimeout(() => {
        dispatch({ type: "SET_NOTIFICATION", payload: "" });
      }, 5000);
    },
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecMutation.mutate({ content, votes: 0 });
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
