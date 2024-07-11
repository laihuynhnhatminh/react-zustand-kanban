export function generateRandomId(): string {
  return `string${Math.floor(Math.random() * 100000)}`;
}
