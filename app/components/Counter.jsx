"use client";

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/counter/counterSlice';

const Counter = () => {
    
    const counterValue = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(increment())
    }

    const handleDecrement = () => {
        dispatch(decrement())
    }
    
    return (
        <div className="flex items-center justify-center gap-6 pt-20">
            <button
                type="button"
                onClick={handleDecrement}
                className={`px-4 py-2 bg-orange-600 text-white rounded-lg transition-all ${counterValue === 0 ? 'opacity-60 cursor-no-drop' : 'active:scale-90'}`}
                disabled={counterValue === 0}
            >
                Decrement
            </button>
            <h1>{counterValue}</h1>
            <button
                type="button"
                onClick={handleIncrement}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg transition-all active:scale-90"
            >
                Increment
            </button>
        </div>
    );
};

export default Counter;