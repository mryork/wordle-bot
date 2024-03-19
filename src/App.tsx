import { useState, useEffect } from "react"
import getApiResponse from "./utils/get-api-response";
import Guess from "./components/guess";
import ClueInput from "./components/clue-input";
import Alert from '@mui/joy/Alert';
import { Typography } from "@mui/joy";
import Stack from '@mui/joy/Stack';

function App() {
  const [words, setWords] = useState<string[] | []>([]);
  const [clues, setClues] = useState<string[] | []>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const abortController = new AbortController();

    if(words.length === 0 || words.length === clues.length) {
      getApiResponse(words, clues, abortController).then(({ guess }: { guess: string }) => {
        setLoading(false);
        setWords([...words, guess.toUpperCase()]);
      }).catch((error) => {
        if(error.name !== "AbortError") {
          setClues(clues.slice(0, clues.length - 1));
          setLoading(false);
          setError(error.message);
        }
      })

      if(!abortController.signal.aborted) {
        setLoading(true);
        setError('');
      }
    }

    return () => abortController.abort();
  }, [words, clues]);

  return (
    <Stack spacing={2} alignItems="center">
      <Typography level="h1">🤖 Wordle Bot</Typography>
      <Guess currentWord={words[words.length - 1]} />
      <ClueInput setClues={setClues} clues={clues} isLoading={loading} currentWord={words[words.length - 1]} />
      {error && (
        <Alert color="danger" sx={{ display: "flex", flexDirection: "column", width: 500 }}>
          <Typography level="body-md" fontWeight="bold" color="danger">Error</Typography>
          <Typography level="body-sm" color="danger">{error}</Typography>
        </Alert>
      )}
    </Stack>
  )
}

export default App
