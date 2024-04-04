import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import {ButtonAppBar} from './ButtonAppBar';
import {
    addTaskAC,
    addTodolistTaskHandlerAC,
    changeIsDoneAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskReducer
} from "./state/TaskReducer";
import {
    addTodolistHandlerAC,
    changeFilterAC,
    changeTodolistTitleAC,
    deletTodolistAC,
    TodolistReducer
} from "./state/TodolistReducer";
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/Store';
import {TodolistWithRedux} from './TodolistWithRedux';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export type FilterValuesType = "all" | "active" | "completed";
export type TasksType = {
    [key: string]: TaskType[]
}
export type TodolistType = {
    id: string
    title: string
    filter: string
}

function AppWithRedux() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    // let [tasks, dispatchTasks] = useReducer( TaskReducer,
    //     {
    //         [todolistId1]: [
    //             {id: v1(), title: "HTML&CSS", isDone: true},
    //             {id: v1(), title: "JS", isDone: true},
    //             {id: v1(), title: "ReactJS", isDone: false},
    //             {id: v1(), title: "Rest API", isDone: false},
    //             {id: v1(), title: "GraphQL", isDone: false},
    //         ],
    //         [todolistId2]: [
    //             {id: v1(), title: "HTML&CSS", isDone: true},
    //             {id: v1(), title: "JS", isDone: true},
    //             {id: v1(), title: "ReactJS", isDone: false},
    //             {id: v1(), title: "Rest API", isDone: false},
    //             {id: v1(), title: "GraphQL", isDone: false},
    //         ],
    //     });

    // const [todolists, dispatchTodolists] = useReducer(TodolistReducer,[
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'},
    // ])

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    // const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    function removeTask(todolistId: string, id: string) {
        // let filteredTasks = tasks[todolistId].filter(t => t.id !== id);
        // setTasks({...tasks, [todolistId]: filteredTasks});
        dispatch(removeTaskAC(todolistId, id))
    }

    function addTask(todolistId: string, title: string) {
        // let newTask = {id: v1(), title: title, isDone: false};
        // let newTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]};
        // setTasks(newTasks);
        dispatch(addTaskAC(todolistId, title))
    }

    // let [filter, setFilter] = useState<FilterValuesType>("all");
    function changeFilter(todolistId: string, value: FilterValuesType) {
        // setTodolists(todolists.map((el) => el.id === todolistId ? {...el, filter: value} : el))
        dispatch(changeFilterAC(todolistId, value))
    }

    const changeIsDone = (todolistId: string, id: string, isDone: boolean) => {
        // const findTask = tasks.find(el=>el.id===id)
        // if(findTask){
        //     findTask.isDone=isDone
        //     setTasks([...tasks])
        // }
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone: isDone} : el)})
        dispatch(changeIsDoneAC(todolistId, id, isDone))
    }

    const deletTodolist = (todolistId: string) => {
        // setTodolists(todolists.filter(el => el.id !== todolistId))
        dispatch(deletTodolistAC(todolistId))

        // delete tasks[todolistId]
    }
    const addTodolistHandler = (newTask: string) => {
        const newID = v1()
        // const newTodolist = {id: newID, title: newTask, filter: 'all'}
        // setTodolists([...todolists, newTodolist])
        // setTasks({...tasks, [newID]: []})
        dispatch(addTodolistHandlerAC(newTask, newID))
        dispatch(addTodolistTaskHandlerAC(newID))
    }

    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title} : el)})
        dispatch(changeTaskTitleAC(todolistId, id, title))
    }

    const changeTodolisTitle = (todolistId: string, title: string) => {
        // setTodolists(todolists.map(el => el.id === todolistId ? {...el, title} : el))
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    return (
        <div className="App">

            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm onClick={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((el) => {
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodolistWithRedux
                                        todolistID={el.id}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
