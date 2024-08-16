import { useState } from "react";
import "./App.css";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import { FaEllipsisH } from "react-icons/fa";

function App() {
  let [todos, setTodos] = useState(["walk", "talk", "hop", "live"]);
  let [currentTodo, setCurrentTodo] = useState("");
  let [setting, setsetting] = useState(false);

  let toggleSetting = () => {
    if (setting === true) {
      setsetting(false);
    } else if (setting === false) {
      setsetting(true);
    }
  };

  let handlekey = (e) => {
    if (e.key === "Enter") {
      add();
    }
  };

  let handleinput = (e) => {
    setCurrentTodo(e.target.value);
  };

  let add = () => {
    if (currentTodo.trim() !== "") {
      console.log(currentTodo);
      setTodos((t) => [...t, currentTodo]);
      setCurrentTodo("");
    }
  };
  let remove = (index) => {
    let newtodos = todos.filter((elem, i) => i !== index);
    setTodos(newtodos);
  };
  let moveup = (i) => {
    if (i > 0) {
      let newarry = [...todos];
      let currentValue = newarry[i];
      let nextvalue = newarry[i - 1];
      newarry[i] = nextvalue;
      newarry[i - 1] = currentValue;
      setTodos(newarry);
    }
  };

  let movedown = (i) => {
    if (i < todos.length) {
      let newarry = [...todos];
      let currentValue = newarry[i];
      let pastvalue = newarry[i + 1];
      newarry[i] = pastvalue;
      newarry[i + 1] = currentValue;
      setTodos(newarry);
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="bg-white p-5 mt-5 max-w-xs max-h-200 break-words overflow-auto rounded-md sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-screen-xs 2xl:max-w-2xl">
          <div className="flex gap-3 justify-center">
            <input
              type="text"
              placeholder="enter task"
              className="border border-gray-500 p-2  hover:border-gray-400 "
              onChange={handleinput}
              onKeyDown={handlekey}
              value={currentTodo}
              autoFocus
            />
            <button
              className="border-gray-600 bg-slate-500 px-2 rounded-md"
              onClick={add}
            >
              Add
            </button>
          </div>

          <div>
            <ol className="flex flex-col gap-y-3">
              {todos.map((task, i) => {
                return (
                  <li key={i} className="bg-red-400 p-2">
                    <div className="flex justify-between gap-5">
                      <div className="text-wrap break-words max-w-full">
                        <p className="break-all">{task}</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-full border border-red-700"></div>
                        <div>
                          <button className="relative" onClick={toggleSetting}>
                            <FaEllipsisH />
                          </button>
                          <div style={setting ? {} : { display: "none" }}>
                            hello
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

{
  {
    /* <div className="flex justify-center">
        <div className=" lg:bg-white p-44 mt-5 text-wrap break-words max-w-200 max-h-200 overflow-auto "></div>
      </div> */
  }
  /* <>
<div className='flex justify-center m-5 gap-1'>
  
<input type="text" value={currentTodo} onChange={handleinput} placeholder='eneter a task' autoFocus onKeyDown={handlekey} className='border-red-500 p-1'/>
<button onClick={add} className='border px-2 py-1 rounded-sm bg-slate-300'>
  Add
</button>
</div>
<div className='flex justify-center'>
  <ol className='flex flex-col'>
  {todos.map((task, i) =>{
    
    return (
      <li key={i} className='flex gap-3 m-2'>
        {task}
        <button  onClick={() =>{
          remove(i)
        }}>
          del
        </button>
      
        <button  disabled={i === 0} onClick={() =>{
          moveup(i)
        }}>
          up
        </button>
      <button  disabled={i == todos.length - 1 }  onClick={()=>{
        movedown(i)
      }}>
        down
      </button>
      </li>
    )
  })}
</ol>
</div> */
}
