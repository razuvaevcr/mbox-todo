import React from 'react';
import { observer } from 'mobx-react-lite';

import todoStore from '../../store/TodoStore';
import TodoItem from '../TodoItem/TodoItem';

import './todoList.scss';


const TodoList: React.FC = observer(() => {
  const filteredTodos = todoStore.filteredTodos;

  return (
    <ul className='todo-list'>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
});


export default TodoList;
