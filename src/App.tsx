import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import { ButtonAppBar } from './ButtonAppBar';
import {
    addTaskAC,
    addTodolistTaskHandlerAC,
    changeIsDoneAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskReducer
} from "./reducers/TaskReducer";
import {
    addTodolistHandlerAC,
    changeFilterAC,
    changeTodolistTitleAC,
    deletTodolistAC,
    TodolistReducer
} from "./reducers/TodolistReducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TasksType = {
   [key: string]: TaskType[]
}
export type TodolistType = {
    id: string
    title: string
    filter: string
}
function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    let [tasks, dispatchTasks] = useReducer( TaskReducer,
        {
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
        });

    const [todolists, dispatchTodolists] = useReducer(TodolistReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    function removeTask(todolistId: string, id: string) {
        // let filteredTasks = tasks[todolistId].filter(t => t.id !== id);
        // setTasks({...tasks, [todolistId]: filteredTasks});
        dispatchTasks(removeTaskAC(todolistId, id))
    }

    function addTask(todolistId: string, title: string) {
        // let newTask = {id: v1(), title: title, isDone: false};
        // let newTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]};
        // setTasks(newTasks);
        dispatchTasks(addTaskAC(todolistId, title))
    }

    // let [filter, setFilter] = useState<FilterValuesType>("all");


    function changeFilter(todolistId: string, value: FilterValuesType) {
        // setTodolists(todolists.map((el) => el.id === todolistId ? {...el, filter: value} : el))
        dispatchTodolists(changeFilterAC(todolistId, value))
    }

    const changeIsDone = (todolistId: string, id: string, isDone: boolean) => {
        // const findTask = tasks.find(el=>el.id===id)
        // if(findTask){
        //     findTask.isDone=isDone
        //     setTasks([...tasks])
        // }
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone: isDone} : el)})
        dispatchTasks(changeIsDoneAC(todolistId, id, isDone))
    }

    const deletTodolist = (todolistId: string) => {
        // setTodolists(todolists.filter(el => el.id !== todolistId))
        dispatchTodolists(deletTodolistAC(todolistId))
        delete tasks[todolistId]
    }
    const addTodolistHandler = (newTask: string) => {
        const newID = v1()
        // const newTodolist = {id: newID, title: newTask, filter: 'all'}
        // setTodolists([...todolists, newTodolist])
        // setTasks({...tasks, [newID]: []})
        dispatchTodolists(addTodolistHandlerAC(newTask, newID))
        dispatchTasks(addTodolistTaskHandlerAC(newID))
    }

    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title} : el)})
        dispatchTasks(changeTaskTitleAC(todolistId, id, title))
    }

    const changeTodolisTitle = (todolistId: string, title: string) => {
        // setTodolists(todolists.map(el => el.id === todolistId ? {...el, title} : el))
        dispatchTodolists(changeTodolistTitleAC(todolistId, title))
    }

    return (
        <div className="App">

            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm onClick={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((el) => {
                        let tasksForTodolist = tasks[el.id];

                        if (el.filter === "active") {
                            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding:'10px'}}>
                                    <Todolist key={el.id}
                                              todolistId={el.id}
                                              title={el.title}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeIsDone={changeIsDone}
                                              deletTodolist={deletTodolist}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolisTitle={changeTodolisTitle}
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

export default App;
