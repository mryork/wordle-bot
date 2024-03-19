import { expect, test, describe } from "vitest";
import { act, render, screen } from "@testing-library/react";
import ClueInput from "../components/clue-input";

describe("Clue Input", () => {
  test("clue input displays", async () => {
    render(<ClueInput setClues={() => {}} clues={[]} currentWord="SERAI" isLoading={false} />);
    expect(await screen.findByTestId("input-button-1")).toBeInTheDocument();
    expect(await screen.findByTestId("input-button-1")).toHaveTextContent("E");
  });

  test("clicking a clue input button changes the color", async () => {
    render(<ClueInput setClues={() => {}} clues={[]} currentWord="SERAI" isLoading={false} />);
    const inputButton = await screen.findByTestId("input-button-1");
    act(() => inputButton.click());
    expect(inputButton).toHaveStyle("background-color: rgb(206, 255, 194)");
  });

  test("clicking a clue input button three times changes the color back to white", async () => {
    render(<ClueInput setClues={() => {}} clues={[]} currentWord="SERAI" isLoading={false} />);
    const inputButton = await screen.findByTestId("input-button-1");
    act(() => inputButton.click());
    act(() => inputButton.click());
    act(() => inputButton.click());
    expect(inputButton).toHaveStyle("background-color: rgb(255, 255, 255)");
  });
});
