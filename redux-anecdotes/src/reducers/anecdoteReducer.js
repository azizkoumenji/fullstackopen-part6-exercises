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
      const id = action.payload;
      const anecToChange = state.find((a) => a.id === id);
      const changedAnec = {
        ...anecToChange,
        votes: anecToChange.votes + 1,
      };
      return state.map((anec) => (anec.id !== id ? anec : changedAnec));
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

export default anecdoteSlice.reducer;
