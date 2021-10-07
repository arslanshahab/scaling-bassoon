// sortArrayAlphabetically - takes an array and sort them alphabetically in ascending or descending order
// can handle array of strings or array of objects with a property having string value, that should be passed in KEY parameter

// *** params ***
// 1. ARRAY - REQUIRED -> actual array to be sorted
// 2. KEY - OPTIONAL -> if its array of objects then key will determine on which property we have to apply the sorting
// 3. TYPE - OPTIONAL -> if provided, will affect the sorting order, if not the array will always be sorted in Ascending Order

export const sortArrayAlphabetically = (
  array: any[],
  key?: string,
  type?: 'asc' | 'desc'
) => {
  if (typeof array[0] === typeof {}) {
    if (type! === 'desc') {
      return array.sort((a: any, b: any) => {
        return b[key!].localeCompare(a[key!])
      })
    } else {
      return array.sort((a: any, b: any) => {
        return a[key!].localeCompare(b[key!])
      })
    }
  } else {
    if (type! === 'desc') {
      return array.sort((a: any, b: any) => {
        return b.localeCompare(a)
      })
    } else {
      return array.sort((a: any, b: any) => {
        return a.localeCompare(b)
      })
    }
  }
}

export const getSolutionId = (identifier: any) => {
  switch (identifier) {
    case '1':
      return 2
    case '2':
      return 3
    case '3':
      return 6
    default:
      return 2
  }
}
