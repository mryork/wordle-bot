import Stack from '@mui/joy/Stack';
import { Typography } from "@mui/joy";

export default function PreviousGuesses({ guesses }: { guesses: string[] }) {
  return (
    <Typography textColor="#555555">
      <Typography fontWeight="bold">Previous Guesses: </Typography>
      {guesses.join(', ')}
    </Typography>
  );
}