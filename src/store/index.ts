import { createSlice, configureStore, Reducer } from "@reduxjs/toolkit";
import { Userinfo, UserState } from "../@types/model";
import { persistReducer, persistStore as createPersistStore, WebStorage } from "redux-persist";
import thunk from "redux-thunk";
import storageSession from "redux-persist/lib/storage/session";
import { Platform } from "react-native";
import { Persistor } from "redux-persist/es/types";
import { deleteItemAsync } from "../utils/util";

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
      deleteItemAsync("user").catch((e) => console.log(e));
    },
  },
});

export const { login, logout } = user.actions;

const persistConfig = Platform.OS === "web" ? {
  key: "root",
  storage: storageSession,
} : {} as { key: string; storage: WebStorage; };

let userReducer: Reducer = {} as Reducer;
// web 端持久化
// https://juejin.cn/post/7107532107282382878
if (Platform.OS === "web") {
  userReducer = persistReducer(persistConfig, user.reducer);
} else {
  userReducer = user.reducer;
}


export const store = configureStore({
  reducer: userReducer,
  middleware: [thunk],
});

export const persistStore = Platform.OS === "web" ? createPersistStore(store) : {} as Persistor;

export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
