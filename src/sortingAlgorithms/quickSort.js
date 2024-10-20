// src/sortingAlgorithms/quickSort.js
export const quickSort = async (array, setArray, setSwappingIndices, setSortedIndices, speed) => {
    const sort = async (low, high) => {
      if (low < high) {
        const pi = await partition(low, high);
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      } else {
        setSortedIndices(prev => [...prev, low]); // Mark as sorted
      }
    };
  
    const partition = async (low, high) => {
      const pivot = array[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        setSwappingIndices([j, high]); // Highlight current indices
        await new Promise(resolve => setTimeout(resolve, speed)); // Allow time for visualization
        if (array[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
          setArray([...array]);
        }
      }
      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      setArray([...array]);
      return i + 1;
    };
  
    await sort(0, array.length - 1);
    setSortedIndices([...Array(array.length).keys()]); // Mark all as sorted
  };
  