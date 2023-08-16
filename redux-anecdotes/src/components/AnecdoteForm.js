import { useDispatch } from "react-redux";
import { newAnec } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anec.value;
    event.target.anec.value = "";

    dispatch(newAnec(content));
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
