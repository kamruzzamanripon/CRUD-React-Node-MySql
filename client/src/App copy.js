import axios from 'axios';
import { useEffect, useState } from "react";
import './App.css';


function App() {
  const [editData, setEditData] = useState('')
  const [editStatus, setEditStatus] = useState(false)
  const [allTodoList, setAllTodoList] = useState('')

  //Fetch All Todo data
  // const allTodo = () => {
  //   axios.get("http://localhost:4000/all").then((response) => {
  //     console.log("all", response)
  //     setAllTodoList(response.data);
  //   });
  // };

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
          <input className='w-full border-2 mb-5' type="text" placeholder='Type your Todo' /><br />
          <label className='block text-left text-lg font-semibold'>Priority</label>
          <input className='w-full border-2 mb-5' type="text" placeholder='Priority' /> <br />
          <button className='bg-green-600 block text-center w-full mb-10 text-white font-semibold py-5'>Add Todo</button>
        </div>



        <div className='border-2 w-full pl-5'>
          <h1 className='font-bold text-3xl mb-5 underline underline-offset-8 mt-5'>This is our Todo List</h1>
          <ul>
            <li className='text-left text-lg border-2 border-black p-2 mr-5 mb-2'>
              <div className="flex">
                <div>Tomorrow i will do react project <span className={`text-pink-700 font-bold ${!editStatus ? "inline" : "hidden"} `}>Medium</span></div>
                <div className={`${editStatus ? "block" : "hidden"}`}>
                  <input className="border-2" type="text" value={editData} onChange={(e)=>setEditData(e.target.value)}/>
                  <button className="bg-green-600 p-1 text-white mx-2">Update</button>
                  <button className="bg-red-600 p-1 text-white mx-2" onClick={()=>setEditStatus(false)}>Cancel</button>
                </div>
              </div>
              <div className='space-x-10 border-t-4 border-yellow-500'>
                <button >Delete</button>
                <button onClick={()=>setEditStatus(true)}>Edit</button>
              </div>
            </li>
           
          </ul>
        </div>


      </div>
    </div>
  );
}

export default App;
