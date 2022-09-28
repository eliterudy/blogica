import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../config/types";

export interface initialStateUser {
  isLoadingUser: boolean;
  errMessUser: null | string;
  user: User | null;
}

const initialState: initialStateUser = {
  isLoadingUser: true,
  errMessUser: null,
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
