/** Order of a photo stack after one flip; the top goes to the back. */
export function flipOrder(order: number[], direction: 1 | -1): number[] {
  if (order.length < 2) return order;
  if (direction === 1) return [...order.slice(1), order[0]];
  return [order[order.length - 1], ...order.slice(0, -1)];
}

/** What the polite live region says after a flip. */
export function photoLabel(title: string, index: number, total: number): string {
  return `Photo ${index + 1} of ${total}: ${title}`;
}

/** Order after a dot jump: the chosen photo comes to the top, the rest keep theirs. */
export function bringToFront(order: number[], index: number): number[] {
  if (!order.includes(index)) return order;
  return [index, ...order.filter((item) => item !== index)];
}
