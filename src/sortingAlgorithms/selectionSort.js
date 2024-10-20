// src/sortingAlgorithms/selectionSort.js
export const selectionSort = async (array, setArray, setSwappingIndices, setSortedIndices, speed) => {
    const length = array.length;
    for (let i = 0; i < length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < length; j++) {
            setSwappingIndices([j, minIndex]); // Highlight current indices
            await new Promise(resolve => setTimeout(resolve, speed)); // Allow time for visualization
            if (array[j] < array[minIndex]) {
                minIndex = j; // Update minIndex if a smaller element is found
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]]; // Swap the found minimum element with the first element
            setArray([...array]);
        }
        setSortedIndices(prev => [...prev, i]); // Mark sorted
    }
};
