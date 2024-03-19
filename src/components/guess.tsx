import { Typography } from "@mui/joy";

export default function Guess({ currentWord }: { currentWord: string }) {
  return (
    <Typography>
      {!currentWord && "Loading word to guess..."}
      {currentWord && <><b>Word to guess:</b> {currentWord}</>}
    </Typography>
  );
}