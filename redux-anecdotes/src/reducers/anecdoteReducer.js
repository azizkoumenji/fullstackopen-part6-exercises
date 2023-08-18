import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    newAnec(state, action) {
      return [...state, action.payload];
    },
    vote(state, action) {
      const anecdote = action.payload;
      return state.map((anec) => (anec.id !== anecdote.id ? anec : anecdote));
    },
    setAnecs(state, action) {
      return action.payload;
    },
  },
});

export const { newAnec, vote, setAnecs } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecs(anecdotes));
  };
};

export const createAnec = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(newAnec(newAnecdote));
  };
};

export const addVote = (content) => {
  const newContent = { ...content, votes: content.votes + 1 };
  return async (dispatch) => {
    const addedContent = await anecdoteService.addVote(newContent);
    dispatch(vote(addedContent));
  };
};

export default anecdoteSlice.reducer;
