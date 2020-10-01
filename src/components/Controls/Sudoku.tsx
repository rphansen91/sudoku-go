import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {
  SudokuFab,
  SudokuNumBorder,
  SudokuValueInput,
} from "./NubmerControl";
import { useSudokuGame } from "../../providers/sudoku/context";

const SudokuBoard = () => {
  const { initialBoard, board, setValue, active, setActive } = useSudokuGame();
  return (
    <Box>
      {board?.map((rowValues, row) => (
        <Box display="flex" key={row}>
          {rowValues.map((value, col) => (
            <SudokuNumBorder row={row} col={col} key={`${row}_${col}`}>
              {initialBoard?.[row][col] ? (
                <SudokuFab disabled>
                  <Typography color="textPrimary">
                    {initialBoard?.[row][col]}
                  </Typography>
                </SudokuFab>
              ) : (
                <SudokuValueInput
                  value={value}
                  active={active}
                  position={{ row, col }}
                  setValue={setValue}
                  setActive={setActive}
                />
              )}
            </SudokuNumBorder>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default SudokuBoard;
