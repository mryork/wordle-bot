import { Typography } from "@mui/joy";

export default function Guess({ currentWord, isLoading }: { currentWord: string, isLoading: boolean}) {
  return (
    <Typography padding={1}>
      {isLoading && "Loading word to guess..."}
      {!isLoading && <><b>Try this word:</b> {currentWord}, then click the letters to mark the clue given by Wordle as green or yellow.</>}
    </Typography>
  );
}