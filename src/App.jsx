import Header from "./components/Header"
import { TaskList } from "./components/TaskList"
import { useState,useEffect } from "react";

function App() {
  const [initialTasks, setInitialTasks] = useState([]);

  const [value, setValue] = useState("");

  const [pending, setPending] = useState(0);

  const handleAdd = (event) => {
    event.preventDefault();
    const newTasks = [...initialTasks, {title:value,isChecked:false}]
    const newPending = parseInt(pending)+1
    setInitialTasks(newTasks);
    setValue("");
    setPending(newPending);

    localStorage.setItem('tasks',JSON.stringify(newTasks));
    localStorage.setItem('pending',parseInt(newPending));
  };

  const handleDeleteAll = () => {
    setInitialTasks([])
    setPending(0);

    localStorage.setItem('tasks',[]);
    localStorage.setItem('pending',0);
  }

  const handleDeleteOne = (item)=>{
    var newTasks = initialTasks.filter(task => task.title !== item);
    var newPending = 0

    newTasks.map((task)=>{
      console.log(task)
      if (!task.isChecked){
        newPending+=1
      }
    })

    setInitialTasks(newTasks);
    setPending(newPending);

    localStorage.setItem('tasks',JSON.stringify(newTasks));
    localStorage.setItem('pending',newPending);
  }

  const handleChangeState = (title, newState) => {
    const newTasksValue = [...initialTasks]
    newTasksValue.map((task) =>{
      if(task.title === title){
        task.isChecked = newState
      }
    })
    

    var pendings = localStorage.getItem('pending')
    pendings = parseInt(pendings)
    if(newState){
      pendings -= 1;
    }else{
      pendings += 1;
    }

    localStorage.setItem('pending', pendings)
    localStorage.setItem('tasks', JSON.stringify(newTasksValue))

    setPending(pendings)
    setInitialTasks(newTasksValue);
  };

  const newValue = (event) =>{
    setValue(event.target.value)
  }

  useEffect(()=>{
    console.log("holis")
    const localStorageTasks = localStorage.getItem('tasks');
    const storedTasks = JSON.parse(localStorageTasks);
    const localPendingTasks = localStorage.getItem('pending');

    
    if(localPendingTasks !== null){
      setPending(localPendingTasks)
    }
    if(storedTasks!==null){
      console.log(storedTasks);
      setInitialTasks(storedTasks)
    }
  },[])

  return (
    <div className="App">
      <Header />
      <form onSubmit={handleAdd}>
        <input type="text" id = "newTask" onChange={newValue} value={value}></input>
        <button type="submit">Añadir</button>
      </form>
      <TaskList list={initialTasks} onDeleteOne={handleDeleteOne} onChangeState={handleChangeState}/>
      <div>
        <label>You have {pending} pending task(s)</label>
        <button onClick={handleDeleteAll}>Clear All</button>
      </div>
      
    </div>
  );
}

export default App