import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ApiTokenState {
  id: string | null;
  user_id: string | null;
  token: string | null;
  created_at: string | Date | null;
  last_used: string | Date | null;
}

const initialState: ApiTokenState = {
  id: "",
  user_id: "",
  token: null,
  created_at: "",
  last_used: "",
};

const apiTokenSlice = createSlice({
    name: "apiToken",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<ApiTokenState>) => {
            state.id = action.payload.id;
            state.token = action.payload.token;
            state.user_id = action.payload.user_id;
            state.created_at = action.payload.created_at;
            state.last_used = action.payload.last_used;
        },
        clearToken: (state) => {
            state.id = "";
            state.token = null;
            state.user_id = "";
            state.created_at = "";
            state.last_used = "";
        },
    },
});

export const { setToken, clearToken } = apiTokenSlice.actions;
export default apiTokenSlice.reducer;