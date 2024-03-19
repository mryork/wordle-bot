import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Guess from "../components/guess";

describe("Guess", () => {
  test("guess displays", async () => {
    render(<Guess currentWord="SERAI" isLoading={false} />);
    expect(await screen.findByText(/SERAI/)).toBeInTheDocument();
  });

  test("guess loading displays", async () => {
    render(<Guess currentWord="" isLoading={true} />);
    expect(await screen.findByText(/Loading/)).toBeInTheDocument();
  });
});
