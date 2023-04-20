import React from 'react';
import {AppProvider} from "./AppContext";
import InnerApp1 from "./InnerApp1";
import CounterTest from "./left/CounterTest";
import { Provider } from 'react-redux';

import store from './store';

export default function App1() {

  return <Provider store={store}>
      <InnerApp1 />
      <CounterTest />
  </Provider>
}