import { nanoid } from 'nanoid';
import { Todo } from '../types/types';

const initialTodos: Todo[] = [
	{
		id: nanoid(),
		text: 'Тестовое задание',
		completed: false,
	},
	{
		id: nanoid(),
		text: 'Прекрасный код',
		completed: true,
	},
	{
		id: nanoid(),
		text: 'Покрытие тестами',
		completed: false,
	}
];

export { initialTodos }
