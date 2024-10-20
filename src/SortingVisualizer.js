// src/SortingVisualizer.js
import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import { bubbleSort } from './sortingAlgorithms/bubbleSort';
import { mergeSort } from './sortingAlgorithms/mergeSort';
import { quickSort } from './sortingAlgorithms/quickSort';
import { insertionSort } from './sortingAlgorithms/insertionSort';
import { selectionSort } from './sortingAlgorithms/selectionSort'; 

const SortingVisualizer = () => {
  const [arraySize, setArraySize] = useState(20);
  const [array, setArray] = useState(Array.from({ length: arraySize }, () => Math.floor(Math.random() * 780)));
  const [isSorting, setIsSorting] = useState(false);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [selectedSort, setSelectedSort] = useState('bubble');
  const [speed, setSpeed] = useState(100);
  const [barContainerHeight, setBarContainerHeight] = useState(0);

  useEffect(() => {
    const calculateContainerHeight = () => {
      const headerHeight = 50;
      const controlsHeight = 100;
      const availableHeight = window.innerHeight - headerHeight - controlsHeight - 40; // Adjusted for bottom margin
      setBarContainerHeight(availableHeight);
    };

    calculateContainerHeight();
    window.addEventListener('resize', calculateContainerHeight);

    return () => {
      window.removeEventListener('resize', calculateContainerHeight);
    };
  }, []);

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 780));
    setArray(newArray);
    setSwappingIndices([]);
    setSortedIndices([]);
  };

  const handleSort = async () => {
    setIsSorting(true);
    setSortedIndices([]);
    switch (selectedSort) {
      case 'bubble':
        await bubbleSort(array, setArray, setSwappingIndices, setSortedIndices, speed);
        break;
      case 'merge':
        await mergeSort(array, setArray, setSwappingIndices, setSortedIndices, speed);
        break;
      case 'quick':
        await quickSort(array, setArray, setSwappingIndices, setSortedIndices, speed);
        break;
      case 'insertion':
        await insertionSort(array, setArray, setSwappingIndices, setSortedIndices, speed);
        break;
      case 'selection':
        await selectionSort(array, setArray, setSwappingIndices, setSortedIndices, speed);
        break;
      default:
        break;
    }
    setIsSorting(false);
  };

  return (
    <div className="visualizer-container">
      <h1>Sorting Visualizer</h1>
      <div className="controls-container">
        <button onClick={generateRandomArray} disabled={isSorting}>
          Generate Random Array
        </button>
        <input
          type="range"
          min="5"
          max="100"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          disabled={isSorting}
        />
        <span>Array Size: {arraySize}</span>
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          disabled={isSorting}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="selection">Selection Sort</option>
        </select>
        <button onClick={handleSort} disabled={isSorting}>
          Sort
        </button>
        <input
          type="range"
          min="10"
          max="1000"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isSorting}
        />
        <span>Speed: {speed} ms</span>
      </div>
      <div className="array-container" style={{ height: `${barContainerHeight}px` }}>
        {array.map((value, index) => {
          let backgroundColor = sortedIndices.includes(index)
            ? 'green'
            : swappingIndices.includes(index)
            ? 'blue'
            : 'teal';

          return (
            <div
              key={index}
              className="array-bar"
              style={{
                height: `${value}px`,
                width: `${100 / arraySize}%`,
                backgroundColor,
              }}
            >
              <span>{value}</span>
              {swappingIndices.includes(index) && <div className="working-line"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SortingVisualizer;
