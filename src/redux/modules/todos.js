import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// chunk
// 윗부분에서는 서버 통신 관련 부분을 작성한다.
// -> axios 관련 로직을 작성한다. (get, post, patch, delete)
// 성공하던(fulfilled), 실패하던(rejected) 결과값이 나온다.
// 그 결과 값에 따라서!

// 두 가지의 인풋을 받는다.
// 1. 이 thunk 의 이름 (이 비동기 통신 - 액션의 이름)
// 2. 비동기 통신 로직 (async 함수)
// createAsyncThunk('문자', async (매개변수, thunkAPI)=>{})

// 0. 값 조회
export const __getTodosThunk = createAsyncThunk(
  'GET_TODOS',
  async (arg, thunkAPI) => {
    try {
      // 무조건!
      const todos = await axios.get('http://localhost:4000/todos');
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
  'ADD_TODO',
  async (arg, thunkAPI) => {
    try {
      // 시도할 내용
      const response = await axios.post('http://localhost:4000/todos', arg);
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

// 2. delete
export const __deleteTodoThunk = createAsyncThunk(
  'DELETE_TODO',
  async (arg, thunkAPI) => {
    try {
      // 삭제할 내용
      const response = await axios.delete(
        `http://localhost:4000/todos/${arg}`,
        arg
      );
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

// 3. switch
export const __switchTodoThunk = createAsyncThunk(
  'SWITCH_TODO',
  async (arg, thunkAPI) => {
    try {
      // 스위치할 내용
      const response = await axios.patch(
        `http://localhost:4000/todos/${arg.id}`,
        arg
      );
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
  name: 'todos',
  initialState,
  reducers: {
    // // addTodo: (state, action) => {
    // //   return [...state, action.payload];
    // // }, // action creator의 이름
    // removeTodo: (state, action) => {
    //   return state.filter((item) => item.id !== action.payload);
    // }, // action creator의 이름
    // switchTodo: (state, action) => {
    //   return state.map((item) => {
    //     if (item.id === action.payload) {
    //       return { ...item, isSuccess: !item.isDone };
    //     } else {
    //       return item;
    //     }
    //   });
    // }, // action creator의 이름
  },
  extraReducers: {
    [__getTodosThunk.fulfilled]: (state, action) => {
      state.todos = action.payload;
    },
    [__getTodosThunk.rejected]: (state, action) => {
      //
    },
    [__addTodoThunk.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
    },
    [__addTodoThunk.rejected]: (state, action) => {
      //
    },
    [__deleteTodoThunk.fulfilled]: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    [__deleteTodoThunk.rejected]: (state, action) => {
      //
    },
    [__switchTodoThunk.fulfilled]: (state, action) => {
      state.todos = state.todos.map((i) => {
        if (i.id === action.payload) {
          return { ...i, isDone: !i.isDone };
        } else {
          return i;
        }
      });
    },
    [__switchTodoThunk.rejected]: (state, action) => {
      //
    },
  },
});

export const { removeTodo, switchTodo } = todosSlice.actions;
export default todosSlice.reducer;
