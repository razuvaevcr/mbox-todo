import React from 'react';
import { observer } from 'mobx-react-lite';

import Form from './components/Form/Form';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';


const App: React.FC = observer(() => {
  return (
    <div className='container'>
      <h1>todos</h1>

      <Form/>
      <TodoList/>
      <Footer/>
    </div>
  );
});


export default App;
