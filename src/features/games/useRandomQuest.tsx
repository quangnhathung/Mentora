export function getRandomItems<T>(arr: T[], count: number): T[] {
  if (arr.length <= count) return arr;

  const result = new Set<T>();
  while (result.size < count) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    result.add(arr[randomIndex]);
  }
  return [...result];
}

// use example:const words = ["cat", "dog", "bird", "lion", "tiger", "fish"];
//   const randomWords = useRandomItems(words, 3);
