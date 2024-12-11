import React from 'react';
import { observer } from 'mobx-react';

import todoStore from '../../store/TodoStore';


const FilterButtonsPanel: React.FC = observer(() => {
	return (
		<div className='filters' data-testid='filter-buttons-panel'>
			<button
				className={todoStore.filter === 'all' ? 'active' : ''}
				onClick={() => todoStore.setFilter('all')}
				data-testid='filter-all-button'
			>
				All
			</button>
			<button
				className={todoStore.filter === 'active' ? 'active' : ''}
				onClick={() => todoStore.setFilter('active')}
				data-testid='filter-active-button'
			>
				Active
			</button>
			<button
				className={todoStore.filter === 'completed' ? 'active' : ''}
				onClick={() => todoStore.setFilter('completed')}
				data-testid='filter-completed-button'
			>
				Completed
			</button>
		</div>
	)
});


export default FilterButtonsPanel;
