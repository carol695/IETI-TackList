import { Task } from "./Task";

export const TaskList = (props) => {
    const { list,onDeleteOne, onChangeState} = props;

    const handleDeleteOne = (title) => {
        onDeleteOne(title)
    }

    const handleChangeState = (title, newIschecked) => {
        onChangeState(title, newIschecked)
    };


    return(
        <ul>
            {list.map((task)=>(
                <Task title = {task.title} isPending = {task.isChecked} onDelete={handleDeleteOne} onChangeState={handleChangeState}/>
            ))}
        </ul>
    )
}