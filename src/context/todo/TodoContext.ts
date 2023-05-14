import React, { createContext } from "react";
import { TodoContextType } from "../../common/Types";

const TodoContext = createContext<TodoContextType | null>(null);

export default TodoContext

