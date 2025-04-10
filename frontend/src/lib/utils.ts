// src/lib/utils.ts
export function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs
    .flat()
    .filter((x) => typeof x === 'string')
    .join(' ')
    .trim();
}
