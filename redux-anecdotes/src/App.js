import { useSelector, useDispatch } from "react-redux";
import { newAnec, vote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anec.value;
    event.target.anec.value = "";

    dispatch(newAnec(content));
  };

  function compareNumbers(a, b) {
    return b.votes - a.votes;
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(compareNumbers).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anec" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
