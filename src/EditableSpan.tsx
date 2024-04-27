import React, {ChangeEvent, useState} from "react";


type PropsType = {
    title: string
    addTitleHandler: (title: string)=>void
}

export const EditableSpan = React.memo((props: PropsType) => {
    const [title, setTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)

    const editChange = () => {
        setEdit(!edit)
        if(edit){
            props.addTitleHandler(title)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    console.log(title)
  return(
      edit ?
       <input value={title} onBlur={editChange} onChange={onChangeHandler} autoFocus />
      :<span onDoubleClick={editChange}>{title}</span>
  )
})