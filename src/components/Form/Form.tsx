import React from 'react';
import { observer } from 'mobx-react';
import { useState, useEffect, useRef } from 'react';

import todoStore from '../../store/TodoStore';

import './form.scss';


const Form: React.FC = observer(() => {
	const [newTodoText, setNewTodoText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { // фокусировка инпута при нажатии клавишь на клавиатуре
    const handleKeyDown = (event: KeyboardEvent) => {
      if (inputRef.current && event.key.length === 1) {
        inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

	const addTodo = (text: string) => {
    if (!text.trim()) return;

    todoStore.addTodo(text);
    setNewTodoText('');
  };

	return (
		<form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(newTodoText);
        }}
        className='add-todo'
      >
        <input
          ref={inputRef}
          type='text'
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder='What needs to be done?'
          data-testid='form-input'
        />
        <button type='submit' data-testid='add-button'>Add</button>
      </form>
	)
});


export default Form;
