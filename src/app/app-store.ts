import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import placeAutocompleteReducer from '../features/place-autocomplete/place-autocomplete-slice';

export const store = configureStore({
  reducer: {
    placeAutocomplete: placeAutocompleteReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
