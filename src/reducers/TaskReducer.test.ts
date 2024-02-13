import {v1} from "uuid";
import {
    addTaskAC,
    addTodolistTaskHandlerAC,
    changeIsDoneAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskReducer
} from "./TaskReducer";
import {TasksType} from "../App";

let tasks: TasksType
const todolistId1: string = v1();
const todolistId2: string = v1();

beforeEach(()=>{
    tasks = {
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        [todolistId2]: [
            {id: '4', title: "HTML&CSS", isDone: true},
            {id: '5', title: "JS", isDone: true},
            {id: '6', title: "ReactJS", isDone: false},
        ],
    };
})

test('should be delete task', () => {
    const tasksCopy = TaskReducer(tasks, removeTaskAC(todolistId1, '1'))

    expect(tasksCopy[todolistId1].length).toBe(2)
    expect(tasksCopy[todolistId1][0].id).toBe('2')
})

test('should be add task', () => {
    const tasksCopy = TaskReducer(tasks, addTaskAC(todolistId2, 'Test'))

    expect(tasksCopy[todolistId2].length).toBe(4)
    expect(tasksCopy[todolistId2][0].title).toBe('Test')
})

test('should be change isDone', () => {
    const tasksCopy = TaskReducer(tasks, changeIsDoneAC(todolistId1, '2', false))

    expect(tasksCopy[todolistId1].length).toBe(3)
    expect(tasksCopy[todolistId1][1].isDone).toBe(false)
})

test('should be add task in new todolist', () => {
    const tasksCopy = TaskReducer(tasks, addTodolistTaskHandlerAC('3'))

    expect(tasksCopy['3'].length).toBe(0)
})

test('should be change task title', () => {
    const tasksCopy = TaskReducer(tasks, changeTaskTitleAC(todolistId2, '4', 'TS'))

    expect(tasksCopy[todolistId2][0].id).toBe('4')
    expect(tasksCopy[todolistId2][0].title).toBe('TS')
    expect(tasksCopy[todolistId2].length).toBe(3)
})