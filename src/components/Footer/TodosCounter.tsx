import { observer } from 'mobx-react';
import todoStore from '../../store/TodoStore';


const TodosCounter = observer(() => {
	const remainingTodos = todoStore.remainingTodos;

	return (
		<span data-testid='todos-counter'>{remainingTodos} items left</span>
	)
});


export default TodosCounter
