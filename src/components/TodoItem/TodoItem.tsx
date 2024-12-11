import React from 'react';
import todoStore from '../../store/TodoStore';
import { Todo } from '../../types/types';
import { observer } from 'mobx-react';
import './todoItem.scss';

const TodoItem: React.FC<{ todo: Todo }> = observer(({ todo }) => {
	const toggleTodoCompletion = (id: string) => {
    todoStore.toggleTodoCompletion(id);
  };

	return (
		<li className='todo-item'>
			<label>
				<input
					type='checkbox'
					checked={todo.completed}
					onChange={() => toggleTodoCompletion(todo.id)}
				/>
				<div className='checkbox-wrapper'></div> {/* Кастомный чекбокс */}
				<span
					style={{
						textDecoration: todo.completed ? 'line-through' : 'none',
					}}
				>
					{todo.text}
				</span>
			</label>
		</li>
	)
})

export default TodoItem;
