// shared/lib/camelize.ts
export function camelizeKeys<T>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map(camelizeKeys) as any;
  }
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [toCamel(k), camelizeKeys(v)])
    ) as any;
  }
  return obj;
}

const toCamel = (str: string) =>
  str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
