import React, { memo } from 'react';
import {SuperCheckbox} from './components/SuperCheckbox';
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './Todolist.module.css'
import { useDispatch } from 'react-redux';
import { removeTaskAC } from './state/TaskReducer';

type TaskPropsType = {
    taskId: string
    isDone: boolean
    titleTask: string
    todolistID: string
    changeIsDoneHandler: (isDone: boolean, taskId: string) => void
    addTitleHandler: (taskId: string, title: string) => void

}

export const TaskWithRedux = memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(props.todolistID, props.taskId))
    return <li>
        <SuperCheckbox
            className={props.isDone ? s.isDone : ''}
            checked={props.isDone}
            callBack={(isDone)=>props.changeIsDoneHandler(isDone, props.taskId)}
            size="small"
        />
        <EditableSpan title={props.titleTask} addTitleHandler={(title) => props.addTitleHandler(props.taskId, title)}/>
        <IconButton onClick={onClickHandler} aria-label="delete" size="small" color="default">
            <DeleteIcon fontSize="small"/>
        </IconButton>
    </li>
})



