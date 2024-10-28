import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../lib/types";

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: JSON.parse(localStorage.getItem("user") || "null"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
