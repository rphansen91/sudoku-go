import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
import { useSudokuGame } from "../../providers/sudoku/context";
import { SudokuFab } from "./NubmerControl";

export const NumberControls = () => {
  const { setValue, active } = useSudokuGame();
  const onNumberPress = (value: number) => {
    setValue(active, value);
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      p={1}
    >
      <Box py={1} flexGrow={1}>
        <SudokuFab onClick={() => onNumberPress(1)} tabIndex={-1}>
          <Typography variant="h6">1</Typography>
        </SudokuFab>
      </Box>
      <Box py={1} flexGrow={1}>
        <SudokuFab onClick={() => onNumberPress(2)} tabIndex={-1}>
          <Typography variant="h6">2</Typography>
        </SudokuFab>
      </Box>
      <Box py={1} flexGrow={1}>
        <SudokuFab onClick={() => onNumberPress(3)} tabIndex={-1}>
          <Typography variant="h6">3</Typography>
        </SudokuFab>
      </Box>
      <Box py={1} flexGrow={1}>
        <SudokuFab onClick={() => onNumberPress(4)} tabIndex={-1}>
          <Typography variant="h6">4</Typography>
        </SudokuFab>
      </Box>
      <Box py={1} flexGrow={1}>
        <SudokuFab onClick={() => onNumberPress(5)} tabIndex={-1}>
          <Typography variant="h6">5</Typography>
        </SudokuFab>
      </Box>
      <Box py={1} flexGrow={1}>
        <SudokuFab onClick={() => onNumberPress(6)} tabIndex={-1}>
          <Typography variant="h6">6</Typography>
        </SudokuFab>
      </Box>
      <Box py={1} flexGrow={1}>
        <SudokuFab onClick={() => onNumberPress(7)} tabIndex={-1}>
          <Typography variant="h6">7</Typography>
        </SudokuFab>
      </Box>
      <Box py={1} flexGrow={1}>
        <SudokuFab onClick={() => onNumberPress(8)} tabIndex={-1}>
          <Typography variant="h6">8</Typography>
        </SudokuFab>
      </Box>
      <Box py={1} flexGrow={1}>
        <SudokuFab onClick={() => onNumberPress(9)} tabIndex={-1}>
          <Typography variant="h6">9</Typography>
        </SudokuFab>
      </Box>
    </Box>
  );
};
