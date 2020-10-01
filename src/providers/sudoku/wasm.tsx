import { useSudokuGame } from "./context";
import { wasmBrowserInstantiate } from "../../utils/wasm";
import { useCallback, useEffect, useRef, useState } from "react";
import { IBoard } from "./types";

export const SudokuWasmControls = () => {
  const { setInitialBoard } = useSudokuGame();

  useEffect(() => {
    async function create() {
      const board = await createBoard();
      setInitialBoard(board);
    }

    create();
  }, []);

  return null;
};

export const useSudokuWasmSolve = () => {
  const { setBoard } = useSudokuGame();

  const onSolve = useCallback(async () => {
    const board = await solveBoard();
    setBoard(board);
  }, []);

  return onSolve;
};

export const useSudokuWasmVisualize = () => {
  const { setBoard } = useSudokuGame();
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const visualizationMoves = useRef<any>(null);
  const visualizationPaused = useRef<any>(null);
  const visualizationStopped = useRef<any>(null);
  const onPause = () => {
    visualizationPaused.current = true;
    setPlaying(false);
    setPaused(true);
  };
  const onStop = () => {
    visualizationStopped.current = true;
    visualizationPaused.current = false;
    visualizationMoves.current = null;
    setPlaying(false);
  };

  const onVisualize = useCallback(async () => {
    let moves: IBoard[] = []

    setPaused(false);
    visualizationStopped.current = false;
    visualizationPaused.current = false;
    if (visualizationMoves.current) {
        moves = visualizationMoves.current;
        visualizationMoves.current = null;
    } else {
        await visualizeBoard((board) => {
          moves.push(board);
        });
    }
    
    function visualizeLoop() {
      const move = moves.shift();
      setBoard(move);
      if (visualizationStopped.current) {
        // Stop visualization do not save moves
        visualizationStopped.current = false
      } else if (visualizationPaused.current && moves.length) {
        // Stop visualization and save moves
        visualizationMoves.current = moves
        visualizationPaused.current = false
      } else if (moves.length) {
        // Continue animation on next tick
        window.requestAnimationFrame(visualizeLoop);
      } else {
        // Continue animation on next tick
        setPlaying(false);
      }
    }

    window.requestAnimationFrame(visualizeLoop);
    setPlaying(true);
  }, []);

  return { onVisualize, playing, paused, onPause, onStop };
};

async function init() {
  if (!(window as any).create) {
    const go = new (window as any).Go();
    const wasm = await wasmBrowserInstantiate(
      `${process.env.PUBLIC_URL}/lib.wasm`,
      go.importObject
    );
    go.run(wasm.instance);
  }
}

async function createBoard() {
  if (!(window as any).createBoard) await init();
  const boardStr = (window as any).createBoard();
  const board = JSON.parse(boardStr);
  return board;
}

async function solveBoard() {
  await createBoard();
  const boardStr = (window as any).solveBoard();
  const board = JSON.parse(boardStr);
  return board;
}

async function visualizeBoard(fn: (board: IBoard) => void) {
  await createBoard();
  const boardStr = (window as any).visualizeBoard((str: string) => {
    fn(JSON.parse(str));
  });
}
