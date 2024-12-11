import React from 'react';
import { observer } from 'mobx-react-lite';

import todoStore from '../../store/TodoStore';
import TodosCounter from './TodosCounter';
import FilterButtonsPanel from './FilterButtonsPanel';

import './footer.scss';


const Footer: React.FC = observer(() => {
  const handleClearCompleted = () => {
    if (todoStore.todos.length === todoStore.remainingTodos) return; // сокращаем кол-во ререндеров списка

    todoStore.clearCompleted();
  };

  return (
    <div className='footer'>
			<TodosCounter/>
      <FilterButtonsPanel/>
      <button
        onClick={handleClearCompleted}
        className='clear-completed'
        data-testid='cleare-button'
      >
        Clear completed
      </button>
    </div>
  );
});


export default Footer;
