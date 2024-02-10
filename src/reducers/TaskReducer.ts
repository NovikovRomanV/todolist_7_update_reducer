import {TasksType} from "../App";
import {v1} from "uuid";

export const TaskReducer = (state:TasksType, action: TaskReducerType):TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            let filteredTasks = state[action.todolistId].filter(t => t.id !== action.id);
            return {...state, [action.todolistId]: filteredTasks}
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case "CHANGE-IS-DONE": {
            return {...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.id ? {...el, isDone: action.isDone} : el)}
        }
        case "ADD-TODOLIST-HANDLER": {
            return {...state, [action.newID]: []}
        }
        case "CHANGE-TASK-TITLE": {
            let title = action.title
            return {...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.id ? {...el, title} : el)}
        }
        default: return state
    }
}

type TaskReducerType = RemoveTaskType | AddTask | ChangeIsDoneType | AddTodolistHandlerType | ChangeTaskTitleType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTask = ReturnType<typeof addTaskAC>
type ChangeIsDoneType = ReturnType<typeof changeIsDoneAC>
type AddTodolistHandlerType = ReturnType<typeof addTodolistTaskHandlerAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        id,
    } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        todolistId,
        title,
    } as const
}

export const changeIsDoneAC = (todolistId: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-IS-DONE',
        todolistId,
        id,
        isDone,
    } as const
}

export const addTodolistTaskHandlerAC = (newID: string) => {
    return {
        type: 'ADD-TODOLIST-HANDLER',
        newID,
    } as const
}

export const changeTaskTitleAC = (todolistId: string, id: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todolistId,
        id,
        title,
    } as const
}



