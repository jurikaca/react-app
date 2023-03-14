import React from 'react';
import {AppProvider} from "./AppContext";
import InnerApp1 from "./InnerApp1";
import CounterTest from "./left/CounterTest";

export default function App1() {

  return <AppProvider>
      <InnerApp1 />
      <CounterTest />
  </AppProvider>
}