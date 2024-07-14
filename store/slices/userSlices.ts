import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserCredential } from "@firebase/auth";


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

export default userSlice;
