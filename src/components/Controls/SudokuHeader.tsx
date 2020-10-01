import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Refresh from "@material-ui/icons/Refresh";
import Equalizer from "@material-ui/icons/Equalizer";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import React, { useState } from "react";
import { useSudokuGame } from "../../providers/sudoku/context";
import {
  useSudokuWasmSolve,
  useSudokuWasmVisualize,
} from "../../providers/sudoku/wasm";

export const SudokuHeader = () => {
  const { refresh } = useSudokuGame();
  const [confirmRefresh, setConfirmRefresh] = useState(false);
  const solveBoard = useSudokuWasmSolve();
  const { onVisualize, playing, paused, onPause, onStop } = useSudokuWasmVisualize();
  const onRefresh = () => {
    onPause()
    setConfirmRefresh(true)
  };
  const onConfirmRefresh = () => {
    onStop();
    refresh();
    setConfirmRefresh(false);
  }
  const onCancelRefresh = () => {
    setConfirmRefresh(false)
    if (paused) {
        onVisualize()
    }
  }
  const onSolve = () => {
    onStop();
    window.requestAnimationFrame(() => {
        solveBoard()
    })
  }
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={2}
      py={1}
    >
      <Typography variant="h5">Sudoku</Typography>
      <Box flexGrow={1} />
      <Tooltip title="Visualization Backtracing">
        <IconButton size="small" onClick={playing ? onPause : onVisualize} color={playing ? "default" : "inherit"}>
          {playing ? <Pause /> : <PlayArrow />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Solve Board">
        <IconButton size="small" onClick={onSolve}>
          <Equalizer />
        </IconButton>
      </Tooltip>
      <Tooltip title="Reset Board">
        <IconButton size="small" onClick={onRefresh}>
          <Refresh />
        </IconButton>
      </Tooltip>
      <Dialog open={confirmRefresh} onClose={onCancelRefresh}>
        <DialogContent>
          <DialogContentText>
            Are you sure you would like to reset this game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancelRefresh}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={onConfirmRefresh}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
