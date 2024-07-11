import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPages } from "@/services/requests";

// Async login action creator
export const fetchLogin = createAsyncThunk(
    "auth/fetchLogin",
    async (params, { rejectWithValue }) => {
      try {
        const response = await loginPages.postLogin(params);
        console.log("API response:", response);
        if (response.data.isError) {
          return rejectWithValue(response.data.errorMessage);
        }
        return response.data.result; // Ensure this line is returning the correct object
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

// Initial state and reducer setup
const initialState = {
    data: null,
    token: null, // Ensure token is initialized
    status: "idle",
    error: null,
  };

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        state.isAuthenticated = false;
        state.data = null;
        state.token = null;
        state.status = "idle";
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchLogin.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.isAuthenticated = true;
          state.data = action.payload;
          state.token = action.payload?.jwt; // Safeguard to avoid accessing undefined properties
        })
        .addCase(fetchLogin.rejected, (state, action) => {
          state.status = "failed";
          state.isAuthenticated = false;
          state.error = action.payload || action.error.message;
        });
    },
  });
  

// Selectors to access auth state
export const selectAuthData = (state) => state.auth.data;
export const selectAuthToken = (state) => state.auth.token; // JWT token seçici
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export const { logout } = authSlice.actions; // logout actions dışa aktar

export default authSlice.reducer;
