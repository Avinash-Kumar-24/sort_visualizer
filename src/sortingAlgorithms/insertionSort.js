// src/sortingAlgorithms/insertionSort.js
export const insertionSort = async (array, setArray, setSwappingIndices, setSortedIndices, speed) => {
    const length = array.length;
    for (let i = 1; i < length; i++) {
      const key = array[i];
      let j = i - 1;
  
      while (j >= 0 && array[j] > key) {
        setSwappingIndices([j, i]); // Highlight current indices
        await new Promise(resolve => setTimeout(resolve, speed)); // Allow time for visualization
        array[j + 1] = array[j];
        j--;
        setArray([...array]);
      }
      array[j + 1] = key;
      setArray([...array]);
      setSortedIndices(prev => [...prev, j + 1]); // Mark sorted
    }
  };
  