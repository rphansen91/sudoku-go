import React, { FC, useCallback, useEffect, useMemo, useState, createContext, useContext } from "react";
import { IMaybe, IBoard, IRowCol, ISetActive, ISetValue, ISudokuContext } from './types'
import { initialBoard as initial } from "./initial";

export const SudokuContext = createContext<ISudokuContext>({
  initialBoard: initial,
  board: initial,
  active: null,
  setInitialBoard: () => console.warn("SudokuGame Provider Not Found"),
  setBoard: () => console.warn("SudokuGame Provider Not Found"),
  setActive: () => console.warn("SudokuGame Provider Not Found"),
  setValue: () => console.warn("SudokuGame Provider Not Found"),
  refresh: () => console.warn("SudokuGame Provider Not Found"),
});

export const useSudokuGame = () => useContext(SudokuContext);

export const SudokuGame: FC = ({
    children,
  }) => {

    const [initialBoard, setInitialBoard] = useState<IMaybe<IBoard>>(initial);
    
    const [board, setBoard] = useState<IMaybe<IBoard>>(initial);
  
    const [active, setActivePosition] = useState<IMaybe<IRowCol>>(
      null
    );
  
    const setActive: ISetActive = useCallback((rowCol) => {
      setActivePosition(rowCol);
    }, []);
  
    const setValue: ISetValue = useCallback(
      (rowCol, value) => {
        if (board && rowCol) {
          const newBoard: number[][] = [];
          board.forEach((row) => {
            newBoard.push([...row]);
          });
          newBoard[rowCol.row][rowCol.col] = value;
          setBoard(newBoard);
        }
      },
      [board]
    );
  
    const refresh = useCallback(() => {
      setBoard(initialBoard);
    }, [initialBoard]);
  
    const value = useMemo(
      () => ({
        initialBoard,
        board,
        active,
        setBoard, 
        setInitialBoard,
        setActive,
        setValue,
        refresh,
      }),
      [initialBoard, board, active, setActive, setValue, setBoard, setInitialBoard, refresh]
    );
  
    return (
      <SudokuContext.Provider value={value}>{children}</SudokuContext.Provider>
    );
  };
  