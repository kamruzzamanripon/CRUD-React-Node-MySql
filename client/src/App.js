import axios from 'axios';
import { useEffect, useState } from "react";
import './App.css';


function App() {
  const [editData, setEditData] = useState('')
  const [editStatus, setEditStatus] = useState(false)
  const [allTodoList, setAllTodoList] = useState('')
  const [addTodoData, setAddTodoData] = useState('')
  const [addPriorityData, setAddPriorityData] = useState('')

  //Fetch All Todo data
  const allTodo = () => {
    axios.get("http://localhost:4000/all").then((response) => {
      console.log("all", response)
      setAllTodoList(response.data);
    });
  };

 
  //ToDo Add Data
  const addDataHandler = (e)=>{
    e.preventDefault();
    //console.log("input Value", addTodoData, addPriorityData)
    axios.post("http://localhost:4000/create",{todo:addTodoData, priority:addPriorityData}).then((response) => {
      console.log("all", response)
      allTodo();
      setAddTodoData('');
      setAddPriorityData('');
    });
  }

  //ToDo Delete 
  const deleteHandler = (e, todo)=>{
    e.preventDefault();
    console.log("todo info", todo.id)
    axios.delete(`http://localhost:4000/delete/${todo.id}`).then((response) => {
      console.log("all", response)
      allTodo();
    });
  }


 //Update ToDo
  const editUpdateHandler = (e, todo)=>{
    e.preventDefault();
    console.log("update Data", editData, todo )

    axios.put("http://localhost:4000/update", { priority: editData, id: todo.id }).then(
      (response) => {
        allTodo();
        setEditData('');
        setEditStatus(false)
      }
    );
  }


  //1st initial data fetch
  useEffect(()=>{
    axios.get("http://localhost:4000/all").then((response) => {
      console.log("all", response)
      setAllTodoList(response.data);
    });
  },[])

  console.log("data", allTodoList)
  return (
    <div className="App">
      <div className='flex  px-5 mt-10'>
        
        <div className='w-1/3 border-2 mr-2 px-5'>
          <h1 className='font-bold text-3xl mb-5 underline underline-offset-8 mt-5'>Type your to do List</h1>
          <label className='block text-left text-lg font-semibold'>Todo</label>
          <input className='w-full border-2 mb-5' type="text" placeholder='Type your Todo' value={addTodoData} onChange={(e)=>setAddTodoData(e.target.value)} /><br />
          <label className='block text-left text-lg font-semibold'>Priority</label>
          <input className='w-full border-2 mb-5' type="text" placeholder='Priority' value={addPriorityData} onChange={(e)=>setAddPriorityData(e.target.value)} /> <br />
          <button className='bg-green-600 block text-center w-full mb-10 text-white font-semibold py-5' onClick={(e)=> addDataHandler(e)}>Add Todo</button>
        </div>



        <div className='border-2 w-full pl-5'>
          <h1 className='font-bold text-3xl mb-5 underline underline-offset-8 mt-5'>This is our Todo List</h1>
          <ul>
            {allTodoList.length > 0 && allTodoList.map((todo,index)=>(
                <li className='text-left text-lg border-2 border-black p-2 mr-5 mb-2' key={index}>
                
                <div className="flex">
                  <div>{todo.todo} <span className={`text-pink-700 font-bold ${!editStatus ? "inline" : "hidden"} `}>{todo.priority}</span></div>
                  <div className={`${editStatus ? "block" : "hidden"}`}>
                    <input className="border-2" type="text"  onChange={(e)=>setEditData(e.target.value)}/>
                    <button className="bg-green-600 p-1 text-white mx-2" onClick={(e)=> editUpdateHandler(e, todo)}>Update</button>
                    <button className="bg-red-600 p-1 text-white mx-2" onClick={()=>setEditStatus(false)}>Cancel</button>
                  </div>
                </div>

                <div className='space-x-10 border-t-4 border-yellow-500'>
                  <button onClick={(e)=>deleteHandler(e, todo)}>Delete Data</button>
                  <button onClick={()=>setEditStatus(true)}>Edit</button>
                </div>
              </li>
            ))}
            
           
          </ul>
        </div>


      </div>
    </div>
  );
}

export default App;
