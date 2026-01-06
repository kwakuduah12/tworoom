export function isValidYMD(value: string) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }
  
  export function assert(condition: boolean, message: string) {
    if (!condition) throw new Error(message);
  }