import React, {ChangeEvent} from "react";
import Checkbox from '@mui/material/Checkbox';

type PropsType = {
    className: string
    checked: boolean
    callBack: (isDone: boolean) => void
    size: "small" | "medium" | undefined
}

export const SuperCheckbox = (props: PropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <Checkbox
            className={props.className}
            checked={props.checked} size={props.size}
            onChange={onChangeHandler}
        />
    )
}