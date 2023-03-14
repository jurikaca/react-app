import React from 'react';
import { useContext } from 'react';
import {AppContext} from "../AppContext";

export default function CounterTest() {

    const {
      counter, setCounter
    } = useContext(AppContext);

  return (
    <p>{counter} <button onClick={setCounter}>increment</button></p>
  );
}
