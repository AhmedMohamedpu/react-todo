import { useState } from 'react'
import './App.css'


function App() {
  let [todos, setTodos] = useState(['walk', 'talk' , 'hop'])
  let [currentTodo, setCurrentTodo] = useState('')


  let handlekey = (e) =>{
    if(e.key === 'Enter') {
      add()
    }
  }

  let handleinput = (e) =>{
    setCurrentTodo(e.target.value)
  }
  
  let add = () =>{
    if(currentTodo.trim() !== ''){
      console.log(currentTodo)
      setTodos((t) => [...t, currentTodo])
      setCurrentTodo('')
    }
  }
  let remove = (index) =>{
    let newtodos = todos.filter((elem,i) => i !== index)
    setTodos(newtodos)

  }
  let moveup = (i) => {
    if(i > 0 ){
    let newarry = [...todos]
    let currentValue = newarry[i]
    let nextvalue = newarry[i-1]
    newarry[i] = nextvalue
    newarry[i-1] = currentValue
    setTodos(newarry)
    }
  }

  let movedown = (i) =>{
    if(i < todos.length ){
      let newarry = [...todos]
      let currentValue = newarry[i]
      let pastvalue = newarry[i+1]
      newarry[i] = pastvalue
      newarry[i+1] = currentValue
      setTodos(newarry)
      }

  }
  return (
    <>
    <div >
      <h1 className='text-lg'>
        hello
      </h1>
    <input type="text" value={currentTodo} onChange={handleinput} placeholder='eneter a task' autoFocus onKeyDown={handlekey} />
    <button onClick={add}>
      Add
    </button>
    </div>
<div>
    <ol>
      {todos.map((task, i) =>{
        
        return (
          <li key={i}>
            {task}
            <button onClick={() =>{
              remove(i)
            }}>
              del
            </button>
          
            <button disabled={i === 0} onClick={() =>{
              moveup(i)
            }}>
              up
            </button>
          <button disabled={i == todos.length - 1 }  onClick={()=>{
            movedown(i)
          }}>
            down
          </button>
          </li>
        )
      })}
    </ol>
</div>
    
    </> 
  )
}

export default App
