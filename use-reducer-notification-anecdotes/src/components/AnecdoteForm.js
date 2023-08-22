import { useNotificationDispatch } from "../NotificationContext";
import { createAnecdote } from "../requests";
import { useMutation, useQueryClient } from "react-query";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      console.log(anecdotes);
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecMutation.mutate({ content, votes: 0 });
    dispatch({
      type: "SET_NOTIFICATION",
      payload: `Created "${content}" anecdote`,
    });
    setTimeout(() => {
      dispatch({ type: "SET_NOTIFICATION", payload: "" });
    }, 5000);
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
