import {useReducer} from "react";
import {
    addTodolistHandlerAC,
    changeFilterAC,
    changeTodolistTitleAC,
    deletTodolistAC,
    TodolistReducer
} from "./TodolistReducer";
import {TodolistType} from "../App";

let todolists: TodolistType[]

beforeEach(() => {
    todolists = [
        {id: '1', title: 'What to learn', filter: 'all'},
        {id: '2', title: 'What to buy', filter: 'all'},
    ]
})

test('should be change filter', () => {
    const todolistCopy = TodolistReducer(todolists, changeFilterAC('1', "active"))

    expect(todolistCopy.length).toBe(2)
    expect(todolistCopy[0].filter).toBe("active")
})

test('should be delete todolist', () => {
    const todolistCopy = TodolistReducer(todolists, deletTodolistAC('2'))

    expect(todolistCopy.length).toBe(1)
    expect(todolistCopy[0].title).toBe('What to learn')

})

test('should be add new todolist', () => {
    const todolistCopy = TodolistReducer(todolists, addTodolistHandlerAC('What to change?', '3'))

    expect(todolistCopy.length).toBe(3)
    expect(todolistCopy[2].title).toBe('What to change?')
    expect(todolistCopy[2].filter).toBe('all')
})

test('should be change todolist title', () => {
    const todolistCopy = TodolistReducer(todolists, changeTodolistTitleAC('2', 'Bob'))

    expect(todolistCopy.length).toBe(2)
    expect(todolistCopy[1].title).toBe('Bob')
})