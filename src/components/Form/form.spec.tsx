import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import Form from './Form'; // Путь к вашему компоненту
import todoStore from '../../store/TodoStore';


vi.mock('../../store/TodoStore', () => { // мок стора для изалированного тестирования
  return {
    default: {
      addTodo: vi.fn(),
    },
  };
});

describe('Form component', () => {
  // Общие переменные
  let input: HTMLInputElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    render(<Form />);

    input = screen.getByTestId('form-input');
    button = screen.getByTestId('add-button');
  });

  it('рендер инпута и кнопки в форме', () => {
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('отсутствие вызова addTodo пир пустом инпуте', () => {
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    expect(todoStore.addTodo).not.toHaveBeenCalled();
  });

  it('вызов addTodo при отправке формы с текстом', () => {
    fireEvent.change(input, { target: { value: 'New todo' } });

    expect(input.value).toBe('New todo');

    fireEvent.click(button);

    expect(todoStore.addTodo).toHaveBeenCalledWith('New todo');
  });

  it('очищение формы после отправки формы', () => {
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.click(button);

    expect(input.value).toBe('');
  });

  it('проверка фокусировки на input при нажатии кнопки на клавиатуре', () => {
    fireEvent.keyDown(document, { key: 'a' });

    expect(input).toHaveFocus();
  });
});
