import React, { useState } from 'react';

export default function Todo() {

    const [todos, setTodos] = useState([
        {
            'id': 1,
            'title': 'Todo title 1',
            'completed': false
        },
        {
            'id': 2,
            'title': 'Todo title 2',
            'completed': false
        },
        {
            'id': 3,
            'title': 'Todo title 3',
            'completed': true
        },
    ])
    const [newTodo, setNewTodo] = useState('');

    const completeTodo = id => {
        setTodos((prevState) =>
            prevState.map(todo => {
                if (todo.id === id) {
                    if (todo.completed) {
                        return {...todo, completed: false};
                    } else {
                        return {...todo, completed: true};
                    }
                }

                return todo;
            })
        )
    }

    const addTodo = () => {
        setTodos(prevState => [...prevState, {
            id: prevState.length + 1,
            title: newTodo,
            completed: false
        }]);

        setNewTodo('');
    }

    const removeTodo = id => {
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id))
    }

  return (
    <div className='widget-todo container'>
      <h2>Todo list</h2>
      <div className='todo'>

          <input type="text" onChange={(e) => setNewTodo(e.target.value)} value={newTodo}/>
          <button onClick={addTodo}>Add todo</button>

          {
              todos.map(todo => {
                  return <div
                    id={todo.id}
                    key={todo.id}
                  >
                      {todo.title} { todo.completed ? <span> (completed)</span> : <span> (not completed)</span> }
                      <button className={'btn btn-danger'} onClick={() => removeTodo(todo.id)}>Delete</button>
                      <button className={'btn btn-success'} onClick={() => completeTodo(todo.id)}>Complete</button>
                  </div>
              })
          }
      </div>
    </div>
  );
}
