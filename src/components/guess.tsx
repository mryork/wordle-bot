import { Typography } from "@mui/joy";

export default function Guess({ currentWord }: { currentWord: string }) {
  return (
    <Typography>
      {!currentWord && "Loading word to guess..."}
      {currentWord && <><b>Try this word:</b> {currentWord}</>}
    </Typography>
  );
}