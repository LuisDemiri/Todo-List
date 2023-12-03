import './App.css';
import {useState,useEffect} from 'react';
import { Checkbox } from 'antd';

const App = () => {
  const[task,setTask] = useState('')
  const [allTasks,setAllTasks] = useState(JSON.parse(localStorage.getItem('allTasks')) || []);

  const addTask=()=>{
    let allTasksCopy = [...allTasks]

    allTasksCopy.push(task)
    setAllTasks(allTasksCopy)
  }

  const onChange = (taskId) => {

    let allTasksCopy = [...allTasks]

     allTasksCopy = allTasks.map((item) =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );

    setAllTasks(allTasksCopy);
  
  };

  const onDelete =(taskId)=>{
    let allTasksCopy = [...allTasks]
     let allTasksUpdated = allTasksCopy.filter((item)=>item.id != taskId)
     setAllTasks(allTasksUpdated)
  }

  useEffect(() => {
    localStorage.setItem("allTasks",JSON.stringify(allTasks));
  }, [allTasks])
  
  return (
    <div className="App">
        <input value={task.name} onChange={(e)=>setTask({name: e.target.value, id: Math.random(),completed: false})} />
      <button onClick={()=>addTask()} >Add</button>

      {allTasks?.map((item)=>{
        return <div>
        <Checkbox checked={item.completed} onChange={()=>onChange(item.id)}><p className={item.completed ? 'checked' : ""}>{item.name}</p></Checkbox>
        <button onClick={()=>onDelete(item.id)}>Delete</button>
        </div>
      })}

    </div>
  );
}

export default App;
