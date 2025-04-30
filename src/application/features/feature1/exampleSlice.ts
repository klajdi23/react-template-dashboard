import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Example } from './types/ExampleType';

interface ExampleState {
  data: Array<Example>;
  exampleData: Example | null,
  loading: boolean;
}

const initialState: ExampleState = {
  data: [],
  exampleData: null,
  loading: false,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {    
    // list of data example
    fetchDataStart(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action: PayloadAction<Array<Example>>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchDataFailure(state) {
      state.loading = false;
    },
    
    // object of data example
    fetchObjectDataStart(state) {
      state.loading = true;
    },
    fetchObjectDataSuccess(state, action: PayloadAction<Example>) {
      state.loading = false;
      state.exampleData = action.payload
    },
    fetchObjectDataFailure(state, action: PayloadAction<Example>) {
      state.loading = false;
      state.exampleData = null
    }

  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = exampleSlice.actions;
export default exampleSlice.reducer;
