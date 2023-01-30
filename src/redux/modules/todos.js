import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 0. 값 조회
export const __getTodos = createAsyncThunk(
  "GET_TODOS",
  async (arg, thunkAPI) => {
    try {
      // 무조건!
      const todos = await axios.get("http://localhost:4000/todos");
      // console.log("todos.data", todos.data);
      return thunkAPI.fulfillWithValue(todos.data);
    } catch (err) {
      // 만약 오류가 나면 여기!
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// 1. 추가
export const __addTodoThunk = createAsyncThunk(
  "ADD_TODO",
  async (arg, thunkAPI) => {
    try {
      // 시도할 내용
      const response = await axios.post("http://localhost:4000/todos", arg);
      // console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data);
      // return thunkAPI.fulfillWithValue(arg);
    } catch (err) {
      // 오류가 났을 때의 내용
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// initial states
const initialState = {
  todos: [],
  isSuccess: false,
  isLoading: false,
  error: null,
};

// createSlice의 결과물 -> action creators와 reducers
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // addTodo: (state, action) => {
    //   return [...state, action.payload];
    // }, // action creator의 이름
    removeTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    }, // action creator의 이름
    switchTodo: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isDone: !item.isDone };
        } else {
          return item;
        }
      });
    }, // action creator의 이름
  },
  extraReducers: {
    [__getTodos.fulfilled]: (state, action) => {
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      //
    },
    [__addTodoThunk.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
    },
    [__addTodoThunk.rejected]: (state, action) => {
      //
    },
  },
});

export const { removeTodo, switchTodo } = todosSlice.actions;
export default todosSlice.reducer;
