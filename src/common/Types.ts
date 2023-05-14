import { IAuthState, TodoTask } from "./Interfaces";

export type TodoContextType = {
    todoList: TodoTask[],
    setTodoList: React.Dispatch<React.SetStateAction<TodoTask[]>>; 
}

export type Prop = {
    children?: React.ReactNode;
}

export type AuthContextType = { 
    authState: IAuthState; 
    setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>; 
}