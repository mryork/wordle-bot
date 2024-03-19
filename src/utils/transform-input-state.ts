export default function transformInputState(inputState: number[]): string {
  return inputState
    .map((color) => {
      if (color === 0) {
        return "x";
      } else if (color === 1) {
        return "g";
      } else {
        return "y";
      }
    })
    .join("");
}
