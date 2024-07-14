import { createAppAsyncThunk } from "..";
import actionNameCreator from "../actionNameCreator";
import { auth, logout, signIn } from "../firebase";
import { setErrorMessage, setIsLoading, setUser } from "../slices/userSlices";

const anc = actionNameCreator("user");

export const setupUserTriggers = createAppAsyncThunk(
  anc("setupUserTriggers"),
  async (_params, { dispatch }) => {
    auth.onAuthStateChanged((userData) => {
      if (userData) {
        dispatch(setUser(userData));
      } else {
        dispatch(setUser(null));
      }
    });
  }
);

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
      dispatch(setUser(userData!.user));
    } catch (e: any) {
      dispatch(setErrorMessage(e.message));
    }
    dispatch(setIsLoading(false));
  }
);

export const logoutUser = createAppAsyncThunk(
  anc("logoutUser"),
  async (_params, { dispatch, getState }) => {
    dispatch(setIsLoading(true));
    await logout();
    dispatch(setUser(null));
    dispatch(setIsLoading(false));
  }
);