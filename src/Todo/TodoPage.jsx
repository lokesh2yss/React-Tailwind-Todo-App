import React, { useState } from 'react'
import TodoItem from './TodoItem';

const Todo = () => {
  // const [person, setPerson] = useState({
  //   name: "Lokesh",
  //   age: 42
  // })

  // function increaseAge() {
  //   person.age++; //Object mutation...avoid this
  //   console.log(person.age);
  //   const newPerson = {...person, age: person.age+1};
  //   setPerson(newPerson);
  // }

  const [todos, setTodos] = useState([]);
  function handleFormSubmit(e) {
    e.preventDefault();
    const todoText = e.target["todo"].value;
    
    // todos.push(todoText);
    // setTodos(todos);
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
    //Avoid this
    // const item = todos.find(item => item.id===id);
    // item.completed = checked;
    // setTodos(todos);


    console.log(id, checked);
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
    <h3>Nothing's Here, Add a Todo </h3>
  )
  const completedTodos = todos.filter(todo => todo.completed).length;

  function handleDeleteAll() {
    setTodos([]);
  }
  const compareFunction = (a,b) => a.text.localeCompare(b.text); 
  function handleSortTodos() {
    const newTodos = [...todos];
    newTodos.sort(compareFunction)
    //const sortedTodos = todos.toSorted();
    setTodos(newTodos);
  }

  function hamdleTodoTextUpdate(id, todoText) {
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
    <div>

      {/* <p>{person.name}</p>
      <p>{person.age}</p>
      <button onClick={increaseAge}>Increage Age</button> */}
      <h1>Super Todo</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="todo" placeholder='Enter your Todo here'/>
        <button>Submit</button>
      </form>
      {!isTodosSorted && <button onClick={handleSortTodos}>Sort Todos</button>}
      {!isTodosEmpty && <button onClick={handleDeleteAll}>Delete All</button> }
      {!isTodosEmpty && <p>{completedTodos}/{todos.length} Completed</p>}
      {!isTodosEmpty ? (
      <div>
        <ul>
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