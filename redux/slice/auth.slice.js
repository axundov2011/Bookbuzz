// redux/slice/auth.slice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { pages } from '@/services/requests';

// Async login action creator
export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
  const response = await pages.postLogin(params);
  return response.data;
});

// Initial state and reducer setup
const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
        state.isAuthenticated = true;
        state.data = action.payload;
        state.error = null;
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.data = null;
        state.status = 'idle';
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Selectors to access auth state
export const selectAuthData = (state) => state.auth.data;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
