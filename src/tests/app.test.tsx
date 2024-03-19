import { vi, expect, test, describe, Mock } from "vitest";
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import App from '../App';
import getApiResponse from "../utils/get-api-response";

describe('App', () => {

  vi.mock('../utils/get-api-response', () => {
    return { default: vi.fn(async() => { return { guess: "SERAI" }}), __esModule: true}
  });

  test('renders the app (loading)', async () => {
    render(<App />);
    expect(await screen.findByText(/Loading/)).toBeInTheDocument();
  });

  test('renders the app (error)', async () => {
    (getApiResponse as Mock).mockImplementationOnce(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      throw new Error('Sample error');
    });
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading/), { timeout: 3000 });
    expect(await screen.findByText(/Sample/)).toBeInTheDocument();
  });

  test('renders the app (success)', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/), { timeout: 3000 });
    expect(await screen.findByText(/SERAI/)).toBeInTheDocument()
  });
})
