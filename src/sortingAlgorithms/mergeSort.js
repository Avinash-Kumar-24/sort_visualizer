// src/sortingAlgorithms/mergeSort.js
export const mergeSort = async (array, setArray, setSwappingIndices, setSortedIndices, speed) => {
    const sort = async (left, right) => {
      if (left < right) {
        const middle = Math.floor((left + right) / 2);
        await sort(left, middle);
        await sort(middle + 1, right);
        await merge(left, middle, right);
      } else {
        setSortedIndices(prev => [...prev, left]); // Mark as sorted
      }
    };
  
    const merge = async (left, middle, right) => {
      const leftArray = array.slice(left, middle + 1);
      const rightArray = array.slice(middle + 1, right + 1);
      let leftIndex = 0;
      let rightIndex = 0;
      let sortedIndex = left;
  
      while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        setSwappingIndices([left + leftIndex, middle + 1 + rightIndex]); // Highlight indices
        await new Promise(resolve => setTimeout(resolve, speed)); // Allow time for visualization
        if (leftArray[leftIndex] <= rightArray[rightIndex]) {
          array[sortedIndex++] = leftArray[leftIndex++];
        } else {
          array[sortedIndex++] = rightArray[rightIndex++];
        }
        setArray([...array]);
      }
  
      while (leftIndex < leftArray.length) {
        array[sortedIndex++] = leftArray[leftIndex++];
        setArray([...array]);
      }
  
      while (rightIndex < rightArray.length) {
        array[sortedIndex++] = rightArray[rightIndex++];
        setArray([...array]);
      }
  
      // Mark all as sorted after merging
      for (let i = left; i <= right; i++) {
        setSortedIndices(prev => [...prev, i]);
      }
    };
  
    await sort(0, array.length - 1);
  };
  