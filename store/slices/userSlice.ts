import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string | null;
  displayName: string | null;
}

const initialUserState: {
  user: User | null;
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
    setUser(state, action: PayloadAction<User | null>) {
      if (state.user && state.user.id === action.payload?.id) {
        return;
      }
      state.user = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { setIsLoading, setUser, setErrorMessage } = userSlice.actions;

export default userSlice;
