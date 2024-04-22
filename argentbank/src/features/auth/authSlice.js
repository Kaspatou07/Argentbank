// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const authenticateUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Password is invalid');
        } else {
          throw new Error(data.message || 'La connexion a échoué.');
        }
      }
      localStorage.setItem('token', data.body.token);
      return data.body.token;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token; 
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data)
      if (!response.ok) throw new Error(data.message || 'Impossible de récupérer le profil.');
      return data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUsername = createAsyncThunk(
  'user/updateUsername',
  async (newUsername, { getState, rejectWithValue }) => {
    const token = getState().auth.token; 
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: newUsername }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Impossible de mettre à jour le nom d\'utilisateur.');
      return newUsername; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem('token');
    return true;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const toggleEditMode = () => ({
  type: 'auth/toggleEditMode',
});




export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    isAuthenticated: Boolean(localStorage.getItem('token')),
    isLoading: false,
    error: null,
    userProfile: null,
    editMode: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.userProfile = null; 
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = { ...state.userProfile, userName: action.payload };
        
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      builder.addCase('auth/toggleEditMode', (state) => {
        state.editMode = !state.editMode;
      });
      
  },
});

export default authSlice.reducer;
