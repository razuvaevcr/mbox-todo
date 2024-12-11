import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';

import { initialTodos } from '../consts/consts';
import { Filter, Todo } from '../types/types';


class TodoStore {
  todos: Todo[] = initialTodos;
  filter: Filter = 'all';
	remaning: number = this.todos.filter((todo) => !todo.completed).length;

  constructor() {
    makeAutoObservable(this);
  }

  // Добавление новой задачи
  addTodo(text: string) {
    if (!text.trim()) return 
    this.todos.push({ id: nanoid(), text, completed: false });
  }

  // Переключение состояния выполнения задачи
  toggleTodoCompletion(id: string) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) todo.completed = !todo.completed;
  }

  // Удаление всех выполненных задач
  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  // Установка фильтра
  setFilter(filter: Filter) {
    this.filter = filter;
  }

  // Вычисление количества невыполненных задач
  get remainingTodos() {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  // Получение отфильтрованных задач
  get filteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter((todo) => !todo.completed);
      case 'completed':
        return this.todos.filter((todo) => todo.completed);
      case 'all':
        return this.todos;
      default:
        throw new Error('This filter is not exist in store')
    }
  }
}

const todoStore = new TodoStore();


export default todoStore;
