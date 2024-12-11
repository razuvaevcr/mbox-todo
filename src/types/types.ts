type Todo = {
	id: string;
	text: string;
	completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

export type {
	Todo,
	Filter
};
