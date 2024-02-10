import {FilterValuesType, TodolistType} from "../App";

export const TodolistReducer = (state: TodolistType[], action: TodolistReducerType): TodolistType[] => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.value} : el)
        }
        case "DELET-TODOLIST": {
            return state.filter(el => el.id !== action.todolistId)
        }
        case "ADD-TODOLIST-HANDLER": {
            const newTodolist = {id: action.newID, title: action.newTask, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let title = action.title
            return state.map(el => el.id === action.todolistId? {...el, title} : el)
        }
        default: return state

    }
}

type TodolistReducerType = ChangeFilterAC | DeletTodolistType | AddTodolistHandlerType | ChangeTodolistTitleType

type ChangeFilterAC = ReturnType<typeof changeFilterAC>
type DeletTodolistType = ReturnType<typeof deletTodolistAC>
type AddTodolistHandlerType = ReturnType<typeof addTodolistHandlerAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>

export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        todolistId,
        value,
    } as const
}

export const deletTodolistAC = (todolistId: string) => {
    return {
        type: 'DELET-TODOLIST',
        todolistId,
    } as const
}

export const addTodolistHandlerAC = (newTask: string, newID: string) => {
    return {
        type: 'ADD-TODOLIST-HANDLER',
        newTask,
        newID,
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId,
        title,
    } as const
}