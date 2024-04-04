import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'
import {AddItemForm} from "./AddItemForm";
import {SuperInput} from "./components/SuperInput";
import {SuperButton} from "./components/SuperButton";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {SuperCheckbox} from './components/SuperCheckbox';
import { useSelector, useDispatch } from 'react-redux';
import { AppRootStateType } from './state/Store';
import { TodolistType, TaskType } from './AppWithRedux';
import { changeFilterAC, changeTodolistTitleAC, deletTodolistAC } from './state/TodolistReducer';
import {addTaskAC, changeIsDoneAC, changeTaskTitleAC, removeTaskAC } from './state/TaskReducer';


export type PropsType = {
    todolistID: string
}

export function TodolistWithRedux({todolistID}: PropsType) {
    const todolist = useSelector<AppRootStateType, TodolistType[]>(state=>state.todolists)
    let tasks = useSelector<AppRootStateType, TaskType[]>(state=> state.tasks[todolistID])
    const dispatch = useDispatch()
    const todolistElem = todolist.find(el=>el.id===todolistID)
    let title = ''
    let filterTasks
    if(todolistElem){
        title=todolistElem.title
        filterTasks = todolistElem.filter
    }

    if (filterTasks === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filterTasks === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    let [buttonActive, setButtonActive] = useState('all')

    const onAllClickHandler = () => {
        setButtonActive('all')
        dispatch(changeFilterAC(todolistID, "all"));
    }
    const onActiveClickHandler = () => {
        setButtonActive('active')
        dispatch(changeFilterAC(todolistID, "active"));
    }
    const onCompletedClickHandler = () => {
        setButtonActive('completed')
        dispatch(changeFilterAC(todolistID, "completed"));
    }
    const changeIsDoneHandler = (checked: boolean, tID: string) => {
        dispatch(changeIsDoneAC(todolistID, tID, checked))
    }
    const deletTodolistHandler = () => {
        dispatch(deletTodolistAC(todolistID))
    }

    const addTaskHandler = (newTask: string) => {
        dispatch(addTaskAC(todolistID, newTask))
    }

    const addTitleHandler = (tID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, tID, newTitle))
    }

    const updateTodolisHandler = (title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title))
    }
 console.log(todolistID)
    return <div>
        <h3>
            <EditableSpan title={title} addTitleHandler={updateTodolisHandler}/>
            <IconButton onClick={deletTodolistHandler} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </h3>
        <div>
            <AddItemForm onClick={addTaskHandler}/>
        </div>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(todolistID, t.id))

                    return <li key={t.id}>
                        <SuperCheckbox
                            className={t.isDone ? s.isDone : ''}
                            checked={t.isDone}
                            callBack={(isDone)=>changeIsDoneHandler(isDone, t.id)}
                            size="small"
                        />
                        <EditableSpan title={t.title} addTitleHandler={(title) => addTitleHandler(t.id, title)}/>
                        <IconButton onClick={onClickHandler} aria-label="delete" size="small" color="default">
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant="contained" color={buttonActive === 'all' ? 'secondary' : 'success'}
                    onClick={onAllClickHandler}>
                All
            </Button>
            <Button variant="contained" color={buttonActive === 'active' ? 'secondary' : 'success'}
                    onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button variant="contained" color={buttonActive === 'completed' ? 'secondary' : 'success'}
                    onClick={onCompletedClickHandler}>
                Completed
            </Button>
        </div>
    </div>
}
