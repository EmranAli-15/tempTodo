import {
    createSlice, PayloadAction
} from "@reduxjs/toolkit";

type TTodo = {
    id: string;
    title: string;
    description: string;
    isCompleted?: boolean;
};

type TInitialState = {
    todos: TTodo[];
}

const initialState: TInitialState = {
    todos: []
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TTodo>) => {
            state.todos.push({ ...action.payload, isCompleted: false });
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((item) => item.id !== action.payload);
        },
        toggleTodo: (state, action:PayloadAction<string>) => {
            const todo = state.todos.find(todo=> todo.id === action.payload);
            todo!.isCompleted = !todo?.isCompleted;

            const completed = state.todos.filter(task => {return task.isCompleted === true});
            const pending = state.todos.filter(todo =>  {return todo.isCompleted === false});

            state.todos = [...pending, ...completed];
        }
    },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;