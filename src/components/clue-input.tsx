import { useState, useEffect } from "react";
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import { Typography } from "@mui/joy";
import LinearProgress from '@mui/joy/LinearProgress';
import InputBox from "./input-box";

export default function ClueInput({
  setClues,
  clues,
  isLoading = false,
  currentWord,
}: {
  setClues: React.Dispatch<React.SetStateAction<string[] | []>>;
  clues: string[] | [];
  isLoading: boolean;
  currentWord: string;
}) {
  const [inputState, setInputState] = useState<number[]>([0, 0, 0, 0, 0]);
  const [immutableClues, setImmutableClues] = useState<number[]>([]);

  useEffect(() => {
    const defaultState = [0, 0, 0, 0, 0];
    const greenClues = [] as number[];
    if(clues?.[clues.length - 1]) {
      const lastClue = clues[clues.length - 1];
      lastClue.split("").forEach((color, index) => {
        if(color === "g") {
          defaultState[index] = 1;
          greenClues.push(index);
        }
      });
    }
    setImmutableClues(greenClues);
    setInputState(defaultState);
  }, [clues]);

  function transformInputState(inputState: number[]): string {
    return inputState
      .map((color) => {
        if (color === 0) {
          return "x";
        } else if (color === 1) {
          return "g";
        } else {
          return "y";
        }
      })
      .join("");
  }


  return (
    <Stack direction="column" spacing={2} justifyContent="center">
      <Stack direction="row" spacing={3}>
        {inputState.map((color, index) => (
          <InputBox color={color} index={index} letter={currentWord?.substring(index, index + 1)} key={index} inputState={inputState} setInputState={setInputState} isLoading={isLoading} immutable={immutableClues.includes(index)} />
        ))}
      </Stack>
      <Button
        onClick={() => {
          setClues([...clues, transformInputState(inputState)]);
        }}
        loading={isLoading}
      >
        Submit Clue
      </Button>
    </Stack>
  );
}
