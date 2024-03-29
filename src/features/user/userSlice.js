import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from './userApi';

const initialState = {
  status: 'idle',
  userInfo:null //this info will be used in case of detailed user info while auth will
  //only be used for loggedInUser id etc checks
};


export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    return response.data;
  }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info can be different or more from logged-in User info
        state.userInfo.orders = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info can be different or more from logged-in User info
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info can be different or more from logged-in User info
        state.userInfo = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;
export default userSlice.reducer;


// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchLoggedInUserOrders } from './userApi';

// const initialState = {
//   userOrders: [],
//   status: 'idle',
// };

// export const fetchLoggedInUserOrderAsync = createAsyncThunk(
//   'user/fetchLoggedInUser',
//   async (id) => {
//     const response = await fetchLoggedInUserOrders(id);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         // this info can be different or more from logged-in User info
//         state.userOrders = action.payload;
//       });
//   },
// });

// export const selectUserOrders = (state)=>state.user.userOrders;

// export const { increment } = userSlice.actions;

// export default userSlice.reducer;