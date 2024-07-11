import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserCredential } from "@firebase/auth";

import { createAppAsyncThunk } from "..";
import actionNameCreator from "../actionNameCreator";
import { signIn } from "../firebase";

const initialUserState: {
  user: UserCredential["user"] | null;
  errorMessage: string | null;
  isLoading: boolean;
} = {
  user: null,
  isLoading: false,
  errorMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUser(state, action: PayloadAction<UserCredential["user"] | null>) {
      state.user = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { setIsLoading, setUser, setErrorMessage } = userSlice.actions;

const anc = actionNameCreator("user");

export const loginUser = createAppAsyncThunk(
  anc("loginUser"),
  async (
    { email, password }: { email: string; password: string },
    { dispatch, getState }
  ) => {
    dispatch(setErrorMessage(null));
    dispatch(setIsLoading(true));
    try {
      const userData = await signIn(email, password);
      dispatch(setUser(userData.user));
    } catch (e: any) {
      dispatch(setErrorMessage(e.message));
    }
    dispatch(setIsLoading(false));
  }
);

export default userSlice;
