import { useEffect } from 'react'
import { useSudokuGame } from './context'
import { IRowCol, IMaybe } from './types'

export type KeyDownEvent = (ev: KeyboardEvent) => void;

export function handleKeypress(
  handleKeyDown: KeyDownEvent,
  handleKeyUp: KeyDownEvent
) {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };
}

export const keys = {
  Enter: 13,
  Space: 32,
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
};

export const SudokuKeyBoardControls = () => {
  const { active, initialBoard, setActive } = useSudokuGame();
  useEffect(() => {
    const recurse = (
      getNext: (v: IRowCol) => IRowCol,
      curr: IMaybe<IRowCol>
    ) => {
      if (!curr) return;
      if (!initialBoard) return;
      const next = getNext(curr);
      if (!next) return;
      if (next.row < 0) return;
      if (next.col < 0) return;
      if (next.row > 8) return;
      if (next.col > 8) return;
      if (initialBoard[next.row][next.col]) {
        recurse(getNext, next);
      } else {
        setActive(next);
      }
    };

    return handleKeypress(
      (ev) => {
        const key = ev.which;
        if (keys.Left === key)
          recurse((curr) => ({ ...curr, col: curr.col - 1 }), active);
        if (keys.Right === key)
          recurse((curr) => ({ ...curr, col: curr.col + 1 }), active);
        if (keys.Up === key)
          recurse((curr) => ({ ...curr, row: curr.row - 1 }), active);
        if (keys.Down === key)
          recurse((curr) => ({ ...curr, row: curr.row + 1 }), active);
      },
      () => {}
    );
  }, [active, initialBoard]);

  return null;
};
