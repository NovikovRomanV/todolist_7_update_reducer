import {TasksType} from "../AppWithRedux";
import {v1} from "uuid";
import { deletTodolistAC } from "./TodolistReducer";

const initialState: TasksType = {}

export const TaskReducer = (state= initialState, action: TaskReducerType):TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            let filteredTasks = state[action.payload.todolistId].filter(t => t.id !== action.payload.id);
            return {...state, [action.payload.todolistId]: filteredTasks}
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "CHANGE-IS-DONE": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {...el, isDone: action.payload.isDone} : el)}
        }
        case "ADD-TODOLIST-TASK-HANDLER": {
            return {...state, [action.payload.newID]: []}
        }
        case "CHANGE-TASK-TITLE": {
            let title = action.payload.title
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {...el, title} : el)}
        }
        case "DELET-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }
        default: return state
    }
}


type TaskReducerType = RemoveTaskType | AddTask | ChangeIsDoneType | AddTodolistHandlerType | ChangeTaskTitleType | DeleteTaskType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTask = ReturnType<typeof addTaskAC>
type ChangeIsDoneType = ReturnType<typeof changeIsDoneAC>
type AddTodolistHandlerType = ReturnType<typeof addTodolistTaskHandlerAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type DeleteTaskType = ReturnType<typeof deletTodolistAC>

export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            id,
        }
    } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            title,
        }
    } as const
}

export const changeIsDoneAC = (todolistId: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-IS-DONE',
        payload: {
            todolistId,
            id,
            isDone,
        }
    } as const
}

export const addTodolistTaskHandlerAC = (newID: string) => {
    return {
        type: 'ADD-TODOLIST-TASK-HANDLER',
        payload: {newID},
    } as const
}

export const changeTaskTitleAC = (todolistId: string, id: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            id,
            title,
        },
    } as const
}

// export const deletTodolistAC = (todolistId: string) => {
//     return {
//         type: 'DELET-TODOLIST',
//         payload: {
//             todolistId
//         }
//     } as const
// }



