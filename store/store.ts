import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import componentReducer from "./reduces/components";
import fixedElementsReducer from "./reduces/fixedElements";

/**
 * Store configuration
 */
export const store = configureStore({
  reducer: {
    components: componentReducer,
    fixedElements: fixedElementsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
