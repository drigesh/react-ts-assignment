import React, { useState } from 'react'
import TodoContext from './TodoContext'
import { TodoTask } from '../../common/Interfaces';


type Prop = {
    children?: React.ReactNode;
}

function TodoState({children}: Prop) {
    const [todoList, setTodoList] = useState<TodoTask[]>([{
        id: 1,
        heading: 'My Todo',
        selected: false,
        list: [{
            id: 1,
            selected: false,
            heading: 'first',
            parent_id: 1
        },{
            id: 2,
            selected: false,
            heading: 'second',
            parent_id: 1
        },{
            id: 3,
            selected: false,
            heading: 'third',
            parent_id: 1
        }]
    },
    {
        id: 1,
        heading: 'Your ToDo',
        selected: false,
        list: [{
            id: 1,
            selected: false,
            heading: 'first',
            parent_id: 1
        },{
            id: 2,
            selected: false,
            heading: 'second',
            parent_id: 1
        },{
            id: 3,
            selected: false,
            heading: 'third',
            parent_id: 1
        }]
    }])

  return (
    <TodoContext.Provider value={{todoList, setTodoList}}>
        {children}
    </TodoContext.Provider>
  )
}

export default TodoState