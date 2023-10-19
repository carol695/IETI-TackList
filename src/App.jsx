import Header from "./components/Header"
import { TaskList } from "./components/TaskList"
import { useState } from "react";

function App() {
  const [initialTasks, setInitialTasks] = useState([
    {title: "Tarea 1",isChecked:true},
    {title: "Tarea 2",isChecked:true},
    {title: "Tarea 3",isChecked:true}
  ]);

  const [value, setValue] = useState("");

  const [pending, setPending] = useState(0);

  const handleAdd = (event) => {
    event.preventDefault();
    setInitialTasks([...initialTasks, {title:value,isChecked:false}]);
    setValue("");
    setPending(pending+1);
  };

  const handleDeleteAll = () => {
    setInitialTasks([])
    setPending(0);
  }

  const handleDeleteOne = (item)=>{
    const nuevaLista = initialTasks.filter(task => task.title !== item);
    setInitialTasks(nuevaLista);
    setPending(pending-1);
  }

  const newValue = (event) =>{
    setValue(event.target.value)
  }

  const handleFinishTask = (title, newIsChecked)=>{
    if(newIsChecked){
      setPending(pending+1);
    }else{
      setPending(pending-1);
    }
  }

  return (
    <div className="App">
      <Header />
      <form onSubmit={handleAdd}>
        <input type="text" id = "newTask" onChange={newValue} value={value}></input>
        <button type="submit">Añadir</button>
      </form>
      <TaskList list={initialTasks} onDeleteOne={handleDeleteOne} onFinish={handleFinishTask} />
      <div>
        <label>You have {pending} pending task(s)</label>
        <button onClick={handleDeleteAll}>Clear All</button>
      </div>
      
    </div>
  );
}

export default App