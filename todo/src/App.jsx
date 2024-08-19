import { useState } from "react";
import "./App.css";
import { FaEllipsisV } from "react-icons/fa";
import { LuMoveUp } from "react-icons/lu";
import { LuMoveDown } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

function App() {
  let [todos, setTodos] = useState(["walk", "talk", "hop", "live"]);
  let [currentTodo, setCurrentTodo] = useState("");
  let [setting, setsetting] = useState(false);
  let [editIndex, setEditIndex] = useState(-1);
  let [newTask, setNewTask] = useState("");

  let [doneTodos, setDoneTodos] = useState([
    "wake up",
    "go to school",
    "take out the chicken",
  ]);

  let handleNewTodo = (index) => {
    let newarry = [...todos];
    newarry[index] = newTask;
    setTodos(newarry);
    setNewTask("");
    setEditIndex(-1);
    setsetting(false);
  };

  let handleNewInp = (e) => {
    setNewTask(e.target.value);
  };
  let handleNewkey = (e, i) => {
    let trimvalue = newTask.trim();
    if (e.key === "Enter") {
      let newarry = [...todos];
      newarry[i] = trimvalue;
      setTodos(newarry);
      setNewTask("");
      setEditIndex(-1);
    }
  };

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
    setsetting(false);
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

  let finishTodo = (i) => {
    let value = todos[i];
    remove(i);
    setDoneTodos((t) => {
      return [...t, value]; // Corrected by adding a return statement
    });
  };

  let undoFinishTodo = (i) => {
    let value = doneTodos[i];
    let newDonetodos = doneTodos.filter((elem, index) => index !== i);
    setTodos((t) => [...t, value]); // Add the doneTodo back to the todos list
    setDoneTodos(newDonetodos);
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="bg-white p-5 mt-5 max-w-xs max-h-200 break-words overflow-auto rounded-md sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-screen-xs 2xl:max-w-2xl flex flex-col gap-y-5">
          <div className="flex gap-3 justify-center">
            <input
              type="text"
              placeholder="enter task"
              className="border border-gray-500 p-2 rounded-sm  hover:border-gray-400 "
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
            <div className="flex justify-center ">
              <button onClick={toggleSetting} className="text-lg">
                <FaEllipsisV />
              </button>
            </div>
          </div>

          <div>
            <ol className="flex flex-col gap-y-3">
              {todos.map((task, i) => {
                return (
                  <li key={i} className="flex gap-2">
                    <div className="bg-red-400 rounded-sm p-2 w-full">
                      <div className="flex justify-between gap-5">
                        <div className="text-wrap break-words max-w-full">
                          {editIndex === i && setting ? (
                            <div className="relative">
                              <input
                                value={newTask}
                                onChange={handleNewInp}
                                type="text"
                                onKeyDown={(e) => {
                                  handleNewkey(e, i);
                                }}
                                className="max-w-full p-2 w-full h-full pr-16 border rounded"
                                placeholder={todos[i]}
                                autoFocus
                              />
                              <div className="absolute right-0 top-0 flex h-full">
                                <button
                                  // onClick={() => {
                                  //   // console.log("i", i);
                                  //   // toggleEdit(i);
                                  // }}
                                  type="button"
                                  className="h-full px-2 text-sm text-black bg-red-700"
                                  onClick={() => {
                                    setEditIndex(-1);
                                  }}
                                >
                                  <HiOutlineXMark />
                                </button>
                                <button
                                  type="button"
                                  className="h-full px-2 text-sm text-black bg-red-300 rounded-r"
                                  onClick={() => {
                                    handleNewTodo(i);
                                  }}
                                >
                                  <IoMdCheckmark />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="break-all max-w-lg">{todos[i]}</p>
                          )}
                          <p className="break-all"></p>
                        </div>
                        <div className="flex gap-2">
                          <div
                            className={`h-full border ${
                              setting ? "border-red-700" : "hidden"
                            }`}
                          ></div>
                          <div
                            style={setting ? {} : { display: "none" }}
                            className="flex gap-1 text-lg"
                          >
                            <button
                              disabled={i === 0}
                              onClick={() => {
                                moveup(i);
                              }}
                            >
                              <LuMoveUp />
                            </button>
                            <button
                              onClick={() => {
                                movedown(i);
                              }}
                            >
                              <LuMoveDown />
                            </button>

                            <button
                              onClick={() => {
                                setEditIndex(i);
                                setNewTask(task);
                              }}
                            >
                              {" "}
                              <FaRegEdit />
                            </button>

                            <button
                              onClick={() => {
                                remove(i);
                              }}
                            >
                              <MdDeleteOutline />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        finishTodo(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex flex-col gap-y-5">
            <div className="w-full bg-green-500 p-2 flex justify-center">
              <p>done</p>
            </div>

            <div>
              <ol className="flex flex-col gap-y-5">
                {doneTodos.map((task, i) => (
                  <li key={i} className="flex gap-2">
                    <div className="w-full bg-green-400 p-2 rounded-sm">
                      <p className="break-words">{task}</p>
                    </div>
                    <button
                      className="flex-shrink-0"
                      onClick={() => {
                        undoFinishTodo(i);
                      }}
                    >
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ol>
            </div>
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
