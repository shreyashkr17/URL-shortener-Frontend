import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { stat } from "fs";
interface UserState {
  id: string | null;
  username: string;
  email: string;
  token: string ;
}

const initialState: UserState = {
  id: null,
  username: "",
  email: "",
  token: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ id: string; username: string; email: string; token: string; }>
    ) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.id = null;
      state.username = "";
      state.email = "";
      state.token = "";
    },
    updateUser: (
      state,
      action: PayloadAction<{ username?: string; email?: string }>
    ) => {
      if (action.payload.username) {
        state.username = action.payload.username;
      }
      if (action.payload.email) {
        state.email = action.payload.email;
      }
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
