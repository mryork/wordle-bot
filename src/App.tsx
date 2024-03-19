import { useState, useEffect } from "react"
import getApiResponse from "./utils/get-api-response";
import Guess from "./components/guess";
import ClueInput from "./components/clue-input";
import Alert from '@mui/joy/Alert';
import { Typography } from "@mui/joy";
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import PreviousGuesses from "./components/previous-guesses";

function App() {
  const [words, setWords] = useState<string[] | []>([]);
  const [clues, setClues] = useState<string[] | []>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [failed, setFailed] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();
  
    if(clues[clues.length - 1] === "ggggg") {
      setLoading(false);
      setSuccess(true);
      return;
    }

    if(clues.length === 6) {
      setLoading(false);
      setFailed(true);
      return;
    }

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

  function ResetButton() {
    return (
      <Button
        color="neutral"
        onClick={() => {
          setWords([]);
          setClues([]);
          setLoading(false);
          setError('');
          setFailed(false);
          setSuccess(false);
        }}
      >
        Reset Game
      </Button>
    );
  }

  return (
    <Stack spacing={2} alignItems="center" paddingTop={8}>
      <Typography level="h1">🤖 Wordle Bot</Typography>
      { !success && !failed &&
        <>
          <Guess currentWord={words[words.length - 1]} />
          <ClueInput setClues={setClues} clues={clues} isLoading={loading} currentWord={words[words.length - 1]} />
          {error && (
            <Alert color="danger" sx={{ display: "flex", flexDirection: "column", width: 500 }}>
              <Typography level="body-md" fontWeight="bold" color="danger">Error</Typography>
              <Typography level="body-sm" color="danger">{error}</Typography>
            </Alert>
          )}
        </>
      }
      {success && <Alert color="success">🎉 Congratulations! The bot has guessed the word!</Alert>}
      {failed && <Alert color="danger">😢 The bot failed to guess the word. Try again!</Alert>}
      {words.length > 1 && <PreviousGuesses guesses={(success || failed) ? words : words.slice(0, words.length - 1)} />}
      <ResetButton />
    </Stack>
  )
}

export default App
