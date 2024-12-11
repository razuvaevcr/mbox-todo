import todoStore from './TodoStore'; // Импортируем наш стор
import { initialTodos } from '../consts/consts';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Store', () => {
  beforeEach(() => {
    todoStore.todos = [...initialTodos];
  });

  it('добавление новой задачи', () => {
    const initialLength = todoStore.todos.length;

    todoStore.addTodo('New Todo');

    expect(todoStore.todos.length).toBe(initialLength + 1);
    expect(todoStore.todos[initialLength].completed).toBe(false);
  });

  it('не добавлять задачу с пустым текстом', () => {
    const initialLength = todoStore.todos.length;

    todoStore.addTodo('');

    expect(todoStore.todos.length).toBe(initialLength);
  });

  it('переключение состояния выполнения задачи', () => {
    const todo = todoStore.todos[0];
    const initialCompletionState = todo.completed;

    todoStore.toggleTodoCompletion(todo.id);

    expect(todoStore.todos[0].completed).toBe(!initialCompletionState);
  });

  it('удаление выполненных задач', () => {
    todoStore.todos.forEach((todo) => todo.completed = true);

    todoStore.clearCompleted();

    expect(todoStore.todos.length).toBe(0);
  });

  it('фильтрация задач по статусу', () => {
    todoStore.todos[0].completed = true;

    todoStore.setFilter('active');
    expect(todoStore.filteredTodos).toEqual([todoStore.todos[2]]); // Только активные задачи

    todoStore.setFilter('completed');
    expect(todoStore.filteredTodos).toEqual([todoStore.todos[0], todoStore.todos[1]]); // Только выполненные задачи

    todoStore.setFilter('all');
    expect(todoStore.filteredTodos).toEqual(todoStore.todos); // Все задачи
  });

  it('правильный расчет количества оставшихся задач', () => {
    todoStore.todos[0].completed = true;
    todoStore.todos[1].completed = false;
		todoStore.todos[2].completed = true;

    expect(todoStore.remainingTodos).toBe(1);
  });
});

