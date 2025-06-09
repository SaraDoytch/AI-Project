import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/Interface";

interface AuthState {
  currentUser: IUser | null;
}

const storedUser = localStorage.getItem("currentUser");
const initialState: AuthState = {
  currentUser: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    loginRegister: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { login, loginRegister, logout } = authSlice.actions;
export default authSlice.reducer;
