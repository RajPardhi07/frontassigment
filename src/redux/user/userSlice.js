import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';



export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post('https://backendassign-wcqv.onrender.com/api/auth/login', userData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createMember = createAsyncThunk('auth/createMember',
    async (Data, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://backendassign-wcqv.onrender.com/api/member/create', Data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }

);


export const deleteMember = createAsyncThunk(
    'member/deleteMember',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`https://backendassign-wcqv.onrender.com/api/member/delete-member/${id}`)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);

        }
    }
)







const initialState = {
    user: null,
    user2: null,
    member: null,

    error: null,
    loading: false,
    status: "idle",

};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.user2 = null;
            state.token = null;
            state.status = "idle";
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;

                state.token = action.payload.token;
                state.status = 'succeded';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createMember.fulfilled, (state, action) => {

                state.Data = action.payload.Data;
                state.status = 'succeeded';

            })
            .addCase(deleteMember.fulfilled, (state, action) => {
                if (state.member && state.member._id === action.payload) {
                    state.member = null;
                }
                state.loading = false;
                state.error = null;
            });
        builder.addCase(deleteMember.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

    }

})






export const { logout } = authSlice.actions;

export default authSlice.reducer;