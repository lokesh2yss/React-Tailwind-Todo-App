import { useState } from "react";

const TodoItem = ({ item, 
                    onTodoToggle, 
                    onTodoDelete, 
                    onTodoTextUpdate, 
                    onMoveUp, 
                    onMoveDown, 
                    index,
                    todosCount
                  }) => {
  const [showEditTodo, setShowEditTodo] = useState(false);
  function handleEditFromSubmitted(e) {
    e.preventDefault();
    const todoText = e.target["todo"].value;
    onTodoTextUpdate(item.id, todoText);
    setShowEditTodo(false);
  }
  const editDivForm = (
    <div>
      <form onSubmit={handleEditFromSubmitted}>
        <input type="text" name="todo" defaultValue={item.text} />
        <button>Update</button>
      </form>
      <button onClick={() => setShowEditTodo(false)}>Cancel</button>
    </div>
  );
  const todoItemDiv = (
    <div>
      <button disabled={index==0} onClick={() => onMoveUp(index)}>&#9650; Up</button>
      <button disabled ={index==todosCount-1} onClick={() => onMoveDown(index)}>&#9660; Down</button>
      <input
        id={item.id}
        checked={item.completed}
        type="checkbox"
        onChange={(e) => onTodoToggle(item.id, e.target.checked)}
      />
      <label
        style={{ textDecoration: item.completed ? "line-through" : "none" }}
        htmlFor={item.id}
      >
        {item.text}
      </label>

      <button onClick={() => setShowEditTodo(true)}>Edit</button>
      <button onClick={() => onTodoDelete(item.id)}>Delete</button>
    </div>
  );
  return <div>{showEditTodo ? editDivForm : todoItemDiv}</div>;
};

export default TodoItem;
