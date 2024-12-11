import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';

import Footer from './Footer';
import FilterButtonsPanel from './FilterButtonsPanel';
import todoStore from '../../store/TodoStore';
import { initialTodos } from '../../consts/consts';


vi.mock('../../store/TodoStore', () => { // мок стора для изалированного тестирования
  return {
    default: {
      todos: [],
      remainingTodos: 2,
      clearCompleted: vi.fn(),
      filter: 'all',  // начальный фильтр
      setFilter: vi.fn(),
    },
  };
});

describe('Footer Component', () => {
  it('Рендерит компонент корректно', () => {
    render(<Footer />);

    expect(screen.getByTestId('todos-counter')).toHaveTextContent('2 items left');
    expect(screen.getByTestId('filter-buttons-panel')).toBeInTheDocument();
    expect(screen.getByTestId('cleare-button')).toBeInTheDocument();
  });

  it('clearCompleted не вызывается если нет завершенных todos', () => {
    todoStore.todos = [
      { id: '1', text: 'Task 1', completed: false },
      { id: '2', text: 'Task 2', completed: false },
    ];

    render(<Footer />);

    fireEvent.click(screen.getByTestId('cleare-button'));

    expect(todoStore.clearCompleted).not.toHaveBeenCalled();
  });

  it('очиска завершенных при нажатии "Clear completed"', () => {
    todoStore.todos = initialTodos;

    render(<Footer />);

    fireEvent.click(screen.getByTestId('cleare-button'));

    expect(todoStore.clearCompleted).toHaveBeenCalledTimes(1);
  });

  it('проверка текста в TodosCounter', () => {
    todoStore.todos = initialTodos;

    render(<Footer />);

    expect(screen.getByTestId('todos-counter')).toHaveTextContent('2 items left');
  });
});

describe('FilterButtonsPanel Component', () => {
  it('Рендерит кнопки корректно', () => {
    render(<FilterButtonsPanel />);
  
    expect(screen.getByTestId('filter-all-button')).toBeInTheDocument();
    expect(screen.getByTestId('filter-active-button')).toBeInTheDocument();
    expect(screen.getByTestId('filter-completed-button')).toBeInTheDocument();
  });
  
  it('Активность кнопки "All" при примененном фильтре "all"', () => {
    render(<FilterButtonsPanel />);
  
    const allButton = screen.getByTestId('filter-all-button');
    const activeButton = screen.getByTestId('filter-active-button');
    const completedButton = screen.getByTestId('filter-completed-button');
  
    expect(allButton).toHaveClass('active');
    expect(activeButton).not.toHaveClass('active');
    expect(completedButton).not.toHaveClass('active');
  });
  
  it('Активность кнопки "Active" при примененном фильтре "active"', () => {
    todoStore.filter = 'active';
  
    render(<FilterButtonsPanel />);
  
    const allButton = screen.getByTestId('filter-all-button');
    const activeButton = screen.getByTestId('filter-active-button');
    const completedButton = screen.getByTestId('filter-completed-button');
  
    expect(allButton).not.toHaveClass('active');
    expect(activeButton).toHaveClass('active');
    expect(completedButton).not.toHaveClass('active');
  });
  
  it('Активность кнопки "Completed" при примененном фильтре "completed"', () => {
    todoStore.filter = 'completed';
  
    render(<FilterButtonsPanel />);
  
    const allButton = screen.getByTestId('filter-all-button');
    const activeButton = screen.getByTestId('filter-active-button');
    const completedButton = screen.getByTestId('filter-completed-button');
  
    expect(allButton).not.toHaveClass('active');
    expect(activeButton).not.toHaveClass('active');
    expect(completedButton).toHaveClass('active');
  });
  
  it('Изменение состояния при нажатие на копки фильтров', () => {
    render(<FilterButtonsPanel />);
  
    const allButton = screen.getByTestId('filter-all-button');
    const activeButton = screen.getByTestId('filter-active-button');
    const completedButton = screen.getByTestId('filter-completed-button');
  
    fireEvent.click(activeButton);
  
    expect(todoStore.setFilter).toHaveBeenCalledWith('active');
  
    fireEvent.click(completedButton);
  
    expect(todoStore.setFilter).toHaveBeenCalledWith('completed');
  
    fireEvent.click(allButton);
  
    expect(todoStore.setFilter).toHaveBeenCalledWith('all');
  });
});
