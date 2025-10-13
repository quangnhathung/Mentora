export const EMPTY_ARR = <T>(): readonly T[] => Object.freeze([]) as readonly T[];
export const EMPTY_OBJ = <T extends object>(): Readonly<T> => Object.freeze({}) as Readonly<T>;
