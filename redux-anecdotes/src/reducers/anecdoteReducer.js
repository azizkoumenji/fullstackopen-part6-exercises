import { createSlice } from "@reduxjs/toolkit";

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
export default anecdoteSlice.reducer;
