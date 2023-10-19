import { useState } from "react";

export const Task = (props)=>{
    const {title, onDelete, isFinish, onFinish} = props;
    const [isChecked, setIsChecked] = useState(isFinish)

    const handleDelete = ( ) => {
        onDelete(title);
    }

    const handleFinish = () => {
        onFinish(title, isChecked);
    }

    const handleChangeState = () => {
        setIsChecked(!isChecked);
        handleFinish();
    }

    return(
        <li>
            <article>
                <div>
                    <input type="checkbox" checked={isChecked} onChange={handleChangeState} />
                    <label id="{title}" style={isChecked ? { textDecoration: "line-through" } : {}}> {title} </label>
                    <button onClick={handleDelete}>Eliminar</button>
                </div>
            </article>
        </li>
    )
}