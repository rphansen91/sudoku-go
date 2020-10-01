import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import React from "react";
import { NumberControls } from "./components/Controls/NumberControls";
import { SudokuHeader } from "./components/Controls/SudokuHeader";
import { SudokuGame } from "./providers/sudoku/context";
import { SudokuKeyBoardControls } from "./providers/sudoku/keyboard";
import { SudokuWasmControls } from "./providers/sudoku/wasm";
import Sudoku from "./components/Controls/Sudoku";
import Root from "./components/Root";

export default () => {
  return (
    <Root>
      <SudokuGame>
        <Box p={2} display="flex" justifyContent="center">
          <Card style={{ display: "inline-block" }}>
            <SudokuHeader />
            <Divider />
            <CardContent>
              <Box border={1} borderRadius={4}>
                <Sudoku />
              </Box>
            </CardContent>
            <Divider />
            <NumberControls />
            <SudokuKeyBoardControls />
            <SudokuWasmControls />
          </Card>
        </Box>
      </SudokuGame>
    </Root>
  );
};
