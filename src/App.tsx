import { useState, useEffect } from "react"
import getApiResponse from "./utils/get-api-response";

function App() {
  const [words, setWords] = useState<string[] | []>([]);
  const [clues, setClues] = useState<string[] | []>([]);

  const [clueInput, setClueInput] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const abortController = new AbortController();

    if(words.length === 0 || words.length === clues.length) {
      getApiResponse(words, clues, abortController).then(({ guess }: { guess: string }) => {
        setLoading(false);
        setWords([...words, guess]);
      }).catch((error) => {
        if(error.name !== "AbortError") {
          setLoading(false);
          setError(error.message);
        }
      })

      if(!abortController.signal.aborted) setLoading(true);
    }

    return () => abortController.abort();
  }, [words, clues]);

  return (
    <>
      <h1>Wordle Bot</h1>
      {error && <p>{error}</p>}
      {String(loading)}
      <p>Words: {words.join(', ')}</p>
      <input type="text" value={clueInput} onChange={(e) => setClueInput(e.target.value)} />
      <button onClick={() => {
        if(clueInput) {
          setClues([...clues, clueInput]);
          setClueInput('');
        }
      }}>Submit Clue</button>
    </>
  )
}

export default App
