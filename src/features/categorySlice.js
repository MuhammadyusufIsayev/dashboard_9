import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asinxron funksiyalar: kategoriyalarni olish, qo'shish, o'chirish va yangilash
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/categories'); // API endpoint-ni moslashtiring
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addCategory = createAsyncThunk('categories/addCategory', async (category, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/categories', category); // API endpoint-ni moslashtiring
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (category, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/api/categories/${category.id}`, category); // API endpoint-ni moslashtiring
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/categories/${id}`); // API endpoint-ni moslashtiring
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// categorySlice ni yaratish
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Qo'shimcha synxron reducerlar kerak bo'lsa qo'shishingiz mumkin
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
