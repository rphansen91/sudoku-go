export type IMaybe<V> = V | null | undefined

export type IBoard = number[][];

export type IRowCol = { row: number; col: number };

export type ISetBoard = (board: IMaybe<IBoard>) => void;

export type ISetActive = (rowCol: IMaybe<IRowCol>) => void;

export type ISetValue = (
  rowCol: IMaybe<IRowCol>,
  value: number
) => void;

export type ISudokuContext = {
  initialBoard:IMaybe<IBoard>;
  board:IMaybe<IBoard>;
  active: IMaybe<IRowCol>;
  setInitialBoard: ISetBoard;
  setBoard: ISetBoard;
  setActive: ISetActive;
  setValue: ISetValue;
  refresh: () => void;
};
