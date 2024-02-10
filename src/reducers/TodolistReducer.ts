import {FilterValuesType, TodolistType} from "../App";

export const TodolistReducer = (state: TodolistType[], action: TodolistReducerType): TodolistType[] => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)
        }
        case "DELET-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST-HANDLER": {
            const newTodolist = {id: action.payload.newID, title: action.payload.newTask, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let title = action.payload.title
            return state.map(el => el.id === action.payload.todolistId? {...el, title} : el)
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
        payload: {
            todolistId,
            value,
        },
    } as const
}

export const deletTodolistAC = (todolistId: string) => {
    return {
        type: 'DELET-TODOLIST',
        payload: {todolistId},
    } as const
}

export const addTodolistHandlerAC = (newTask: string, newID: string) => {
    return {
        type: 'ADD-TODOLIST-HANDLER',
        payload: {
            newTask,
            newID,
        }
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            title,
        }
    } as const
}