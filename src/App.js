import './App.scss';
import {useState} from "react";

function App() {
  //state --> A state include its name and a function to change that state
  //state is a react hook
  const [input, setInput] = useState(""); 
  const [todos, setTodos] = useState([]);
  const[selectedTodo, setSelectedTodo] = useState(null);

  const handleChange=(event)=>{
    //console.log(event.target.value);
    setInput(event.target.value);
  
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    //console.log('I just submitted:: ', input);
    if(!selectedTodo && input.trim() !== ""){ //submit
      setTodos([{id: Date.now(), content: input, status: false}, ...todos]);
      setInput("");
    }else{ //update
      //Cach 1:
      /* const newTodos = todos.map(val =>{
        if(val.id === selectedTodo.id){
          return{
            ...selectedTodo,
            content: input
          }
        }
        return val
      })
      setTodos(newTodos); */

      //Cach 2:
      const idx = todos.findIndex(val => val.id === selectedTodo.id)
      setTodos([...todos.slice(0,idx), {...selectedTodo, content: input}, ...todos.slice(idx+1)])

      setInput("");
      setSelectedTodo(null);
    }
  }

  const handleClickDelete = (id)=>{
    //alert(id)
    const newTodos = todos.filter(val=>val.id !== id);
    setTodos(newTodos);
  }

  const handleClickUpdate = (id) =>{
    const idx = todos.findIndex(val => val.id === id);
    //alert(idx);
    setInput(todos[idx].content);
    setSelectedTodo(todos[idx]);

  }

  const handleClickCancle = () =>{
    selectedTodo(false);
    setInput("");
  }

  const handleRemoveAll=() =>{
    //let text;
    if (window.confirm("Do you really want to delete all tasks?") === true) {
      setTodos([]);
    } 
  }

  const handleClickState=(id)=>{
    console.warn("hello");
    const newTodos = todos.map(val =>{
      if(val.id === id){
        console.log(val);
        if(val.status === true){
          return{
            ...val,
            status:false
          }
        }else{
          return{
            ...val,
            status:true
          }
        }
      }
      console.log(val);
      return val
    })
    setTodos(newTodos);
  }

  const handleRemoveFinishedTasks = ()=>{
    if (window.confirm("Do you really want to delete all finished tasks?") === true) {
      const newTodos = todos.filter(val=>val.status === false);
      setTodos(newTodos);
    } 
    
  }
  return (
    <div className="App">
      <div className='todo'>
        <h2>Todo List</h2>
        <form onSubmit={handleSubmit}>
          <input value={input} type = "text" onChange={handleChange} />
          <button>{selectedTodo ? "Update" : "Add"} </button>
          {selectedTodo && <button onClick={handleClickCancle}>Cancel</button>}
        </form>
        <ul>
          
          {todos.length ? todos.map((val) =>(
            <li key ={val.id}>
              <i onClick= {()=>handleClickState(val.id)} className = {val.status ? 'have-done icon fa-solid fa-square-check': 'click-icon icon fa-solid fa-square-check'} ></i>
              {val.content } 
              <i onClick = {()=>handleClickUpdate(val.id)} className="click-icon icon fas fa-edit"></i>
              <i onClick={() => handleClickDelete (val.id)} className="click-icon icon fas fa-trash"></i>
            </li>
          )) : (
            <li>No Item</li>
          )}
        </ul>
        <div className='div-remove'>
          {todos.length ? (
            <div className='bottom-btn'>
              <button type="button" onClick={handleRemoveFinishedTasks} >Remove Finished Tasks</button>
              <button type="button" onClick={handleRemoveAll} >Remove All</button>
              
            </div>
          ): (<div></div>) }
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
