import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  function compareNumbers(a, b) {
    return b.votes - a.votes;
  }
  return (
    <>
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
    </>
  );
};

export default AnecdoteList;
