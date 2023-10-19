import { Task } from "./Task";

export const TaskList = (props) => {
    const { list,onDeleteOne,onFinish } = props;

    const handleDeleteOne = (title) => {
        onDeleteOne(title)
    }

    const handleFinish = (title, isChecked) => {
        onFinish(title, isChecked)
    }

    return(
        <ul>
            {list.map((task)=>(
                <Task title = {task.title} onDelete={handleDeleteOne} isFinish = {task.isChecked} onFinish={handleFinish}/>
            ))}
        </ul>
    )
}