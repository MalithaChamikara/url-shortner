import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch URLs from the server
export const fetchUrls = createAsyncThunk("urls/fetchUrls", async ({ name, date }) => {
    try {
        const response = await axios.get("http://localhost:5000/api/urls", {
            params: { name, date },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching URLs:", error);
        throw error;
    }
})

// Update URL
export const updateUrl = createAsyncThunk('urls/updateUrl', async ({ id, data }) => {
    const response = await axios.put(`/api/urls/${id}`, data);
    return response.data;
});

// Delete URL
export const deleteUrl = createAsyncThunk('urls/deleteUrl', async (id) => {
    await axios.delete(`/api/urls/${id}`);
    return id; // Return the ID of the deleted URL
});

// craete slice for url which will contain the state and reducers
const urlSlice = createSlice({
    name: "urls",
    initialState: {
        urls: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUrls.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUrls.fulfilled, (state, action) => {
                state.loading = false;
                state.urls = action.payload;
            })
            .addCase(fetchUrls.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUrl.fulfilled, (state, action) => {
                const index = state.urls.findIndex((url) => url.id === action.payload.id);
                if (index !== -1) {
                    state.urls[index] = action.payload; // Update the URL in the state
                }
            })
            .addCase(deleteUrl.fulfilled, (state, action) => {
                state.urls = state.urls.filter((url) => url.id !== action.payload); // Remove the URL from the state
            });
    },
})

export default urlSlice.reducer;
