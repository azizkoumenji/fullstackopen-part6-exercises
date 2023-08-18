import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";
import { newAnec } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anec.value;
    event.target.anec.value = "";
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(newAnec(newAnecdote));
    dispatch(setNotification(`You submitted "${content}"`));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 5000);
  };

  return (
    <>
      <h2>Create</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anec" />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
