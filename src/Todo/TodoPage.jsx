import React, { useState } from 'react'
import TodoItem from './TodoItem';
import { Plus, Rabbit, Trash } from "lucide-react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  function handleFormSubmit(e) {
    e.preventDefault();
    const todoText = e.target["todo"].value;
    if(!todoText) return;
    const newTodos = [...todos, {
      text:todoText,
      id: crypto.randomUUID(),
      completed: false
    }];
    setTodos(newTodos);
    console.log(newTodos);

    e.target.reset();

  }
  function onTodoToggle(id, checked) {
    const newTodos = todos.map(item => {
      if(id === item.id) {
        return {...item, completed: checked};
      }
      return item;
    });
    setTodos(newTodos);
  }

  function onTodoDelete(id) {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  }

  const emptyState = (
    <div className='mt-18 flex flex-col gap-4 items-center text-secondary-text'>
      <Rabbit size={40}/>
      <p>Your todo's are empty</p>
    </div>
  )
  const completedTodos = todos.filter(todo => todo.completed).length;

  function handleDeleteAll() {
    setTodos([]);
  }
  const compareFunction = (a,b) => a.text.localeCompare(b.text); 
  function handleSortTodos() {
    const newTodos = [...todos];
    newTodos.sort(compareFunction)
    setTodos(newTodos);
  }

  function hamdleTodoTextUpdate(id, todoText) {
    if(!todoText) return;
    const newTodos = todos.map(item => {
      if(item.id === id) {
        return {...item, text: todoText};
      }
      return item;
    })

    setTodos(newTodos);
  }

  function handleTodoMoveUp(index) {
    if(index ===0) return;
    const newTodos = [...todos];
    [newTodos[index], newTodos[index-1]] = [newTodos[index-1], newTodos[index]];
    setTodos(newTodos);
  }

  function handleTodoMoveDown(index) {
    if(index ===todos.length-1) return;
    const newTodos = [...todos];
    [newTodos[index], newTodos[index+1]] = [newTodos[index+1], newTodos[index]];
    setTodos(newTodos);
  }
  const isTodosEmpty = todos.length == 0;
  const isTodosSorted = todos.every((todo, index, arr) => {
    return index ===0 || compareFunction(arr[index-1], arr[index]) <=0;
  });
  return (
    <div className='text-center  max-w-2xl mx-auto p-10 lg:p-12 space-y-6'>
      <p className='text-center text-lg font-light text-secondary-text italic'>Manage your todos with ease!</p>
      <h1 className='font-display text-6xl font-bold text-accent'>Super Todo</h1>
      <form className='bg-gray-700 px-6 py-4 rounded-lg flex justify-between'  onSubmit={handleFormSubmit}>
        <input 
          type="text" 
          name="todo" 
          required
          placeholder='Enter your Todo here'
          className='flex-1 font-body focus:outline-none'/>
        <button className='p-3 bg-accent text-black rounded-lg cursor-pointer hover:bg-accent-hover'>
          <Plus />
        </button>
      </form>
      <div className='flex justify-center gap-6'>
        {!isTodosSorted && (
          <button 
          className='px-4 py-2 ring-2 ring-accent rounded-lg cursor-pointer hover:bg-accent hover:text-black'
          onClick={handleSortTodos}
          >
            Sort Todos
          </button>
        )}
        {!isTodosEmpty && (
          <button 
            className= 'cursor-pointer px-4 py-2 ring-2 ring-red-400 rounded-lg flex gap-2 items-center hover:bg-red-400 hover:text-black'
            onClick={handleDeleteAll}>
              <Trash size={24}/>
              Delete All
          </button> 
        )}
      </div>
      
      {!isTodosEmpty && (
        <p className='text-secondary-text text-right my-10'>
          {completedTodos}/{todos.length} Completed
        </p>
        )}
      {!isTodosEmpty ? (
      <div className='space-y-4'>
        <ul className='space-y-4'>
          {todos.map((item, index) => (
            <TodoItem key={item.id} item={item} 
              onTodoToggle={onTodoToggle} 
              onTodoDelete={onTodoDelete}
              onTodoTextUpdate= {hamdleTodoTextUpdate}
              onMoveUp = {handleTodoMoveUp}
              onMoveDown = {handleTodoMoveDown}
              index ={ index}
              todosCount = {todos.length}
            />
          ))}
        </ul>
      </div>
      ) : (
        emptyState
      )}
    </div>
  )
}

export default Todo