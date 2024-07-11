import {
  combineReducers,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlices";

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      user: userSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();

export const getStore = (store: RootState) => store;
