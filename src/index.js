import React from 'react';
import { render } from 'react-dom';

import App1 from './components/exercises/App1/App1';
import Counter from './components/Counter';
import Input from './components/Input';
import Moods from './components/Moods';
import Spinner from './components/Spinner';
import Squares from './components/Squares';
import Programmers from './components/Programmers';
import Todo from "./components/Todo";

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

render(
  <>
      <App1 />
    {/*<Counter />*/}
    {/*<Moods />*/}
    {/*<Spinner />*/}
    {/*<Input />*/}
    {/*<Squares />*/}
    {/*<Programmers />*/}
    {/*<Todo />*/}
  </>
  ,
  document.querySelector('#root')
);
