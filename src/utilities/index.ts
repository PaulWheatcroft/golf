export function isArrayInArrayOfArrays(array: [number, number], arrayOfArrays: [number, number][]) {
    console.log("Checking if array:", array, "is in arrayOfArrays:", arrayOfArrays);
    return arrayOfArrays.some(arr => {
        const isEqual = arr[0] === array[0] && arr[1] === array[1];
        console.log("Comparing:", arr, "with", array, "->", isEqual);
        return isEqual;
    });
}