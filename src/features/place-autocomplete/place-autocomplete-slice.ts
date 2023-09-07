import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/app-store';
import { findSuggestions, type PlaceSuggestion } from './place-autocomplete-api';

export interface PlaceSuggestionsState {
  value: PlaceSuggestion[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PlaceSuggestionsState = {
  value: [],
  status: 'idle',
};

export const fetchSuggestions = createAsyncThunk('place-autocomplete/fetchSuggestions', async (query: string) => {
  const response = await findSuggestions(query);
  return response.data;
});

export const placeAutocompleteSlice = createSlice({
  name: 'placeAutocomplete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const getSuggestions = (state: RootState) => state.placeAutocomplete.value;

export default placeAutocompleteSlice.reducer;
