import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  let anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  function compareNumbers(a, b) {
    return b.votes - a.votes;
  }

  anecdotes = anecdotes.sort(compareNumbers);
  const regex = new RegExp(filter, "i");
  anecdotes = anecdotes.filter((object) => regex.test(object.content));
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
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
