import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Userinfo, UserState } from "../@types/model";

const initialState: UserState = {
  token: "",
  user: {} as Userinfo,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: state => {
      state.token = "";
      state.user = {} as Userinfo;
    },
  },
});

export const { login, logout } = user.actions;

export const store = configureStore({
  reducer: user.reducer,
});

export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
