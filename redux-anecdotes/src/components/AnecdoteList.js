import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotesUnordered = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  function compareNumbers(a, b) {
    return b.votes - a.votes;
  }

  let anecdotes = [...anecdotesUnordered].sort(compareNumbers);
  const regex = new RegExp(filter, "i");
  anecdotes = anecdotes.filter((object) => regex.test(object.content));

  const handleClick = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(setNotification(`You voted "${anecdote.content}"`));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 5000);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            Has {anecdote.votes}
            <button onClick={() => handleClick(anecdote)}>Vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
