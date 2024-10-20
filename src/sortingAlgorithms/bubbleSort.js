// src/sortingAlgorithms/bubbleSort.js
export const bubbleSort = async (array, setArray, setSwappingIndices, setSortedIndices, speed) => {
    const length = array.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        setSwappingIndices([j, j + 1]); // Highlight current indices
        await new Promise(resolve => setTimeout(resolve, speed)); // Allow time for visualization
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
        setArray([...array]);
      }
      setSortedIndices(prev => [...prev, length - i - 1]); // Mark sorted
    }
  };
  