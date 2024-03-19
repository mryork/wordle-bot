import { Typography } from "@mui/joy";
import Skeleton from '@mui/joy/Skeleton';

export default function InputBox({
  color,
  index,
  letter,
  inputState,
  setInputState,
  isLoading,
  immutable,
}: {
  color: number;
  index: number;
  letter: String;
  inputState: number[];
  setInputState: React.Dispatch<React.SetStateAction<number[]>>;
  isLoading: boolean;
  immutable: boolean;
}) {
  const colors = ["#ffffff", "#ceffc2", "#fff4a1"];
  const cursor = isLoading || immutable ? "not-allowed" : "pointer";

  return (
    <button
      style={{
        backgroundColor: immutable ? "#278a32" : colors[color],
        width: "60px",
        height: "60px",
        border: "1px solid #c4c4c4",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor,
      }}
      data-testid={`input-button-${index}`}
      onClick={() => {
        if (immutable || isLoading) return;
        setInputState(
          inputState.map((state, i) => (i === index ? (state + 1) % 3 : state))
        );
      }}
    >
      {isLoading && <Skeleton width="60px" height="60px" />}
      <Typography
        fontSize="xl"
        fontWeight="semibold"
        textColor={immutable ? "common.white" : "neutral.400"}
        sx={{ userSelect: "none" }}
      >
        {letter}
      </Typography>
    </button>
  );
}
