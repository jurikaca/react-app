import React from 'react';
import { useContext } from 'react';
// import {AppContext} from "../AppContext";
import {useDispatch, useSelector} from "react-redux";
import { increment } from "../redux/slices/counterSlice";

export default function CounterTest() {

    const dispatch = useDispatch();
    const counter = useSelector(selector => selector.counter);

  return (
    <p>{counter} <button onClick={() => { dispatch(increment()) }}>increment</button></p>
  );
}
