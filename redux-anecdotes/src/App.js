import { useSelector, useDispatch } from "react-redux";
import { vote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

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
            Has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>Vote</button>
          </div>
        </div>
      ))}
      <AnecdoteForm />
    </div>
  );
};

export default App;
