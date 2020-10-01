import Box from "@material-ui/core/Box";
import Fab, { FabProps } from "@material-ui/core/Fab";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import { IRowCol, ISetActive, ISetValue } from "../../providers/sudoku/types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React, { FC } from "react";

export const SudokuNumBorder: FC<IRowCol> = ({ children, row, col }) => {
  return (
    <Box
      py={1}
      flexGrow={1}
      display="flex"
      justifyContent="center"
      borderTop={!row || row % 3 ? 0 : 1}
      borderLeft={!col || col % 3 ? 0 : 1}
    >
      {children}
    </Box>
  );
};

export const SudokuFab: FC<FabProps> = ({ children, ...props }) => {
  const large = useMediaQuery("(min-width:727px)");
  return (
    <Fab
      style={
        large
          ? {
              overflow: "hidden",
              borderRadius: 4,
            }
          : {
              overflow: "hidden",
              borderRadius: 4,
              height: 24,
              width: 24,
              lineHeight: "24px",
              verticalAlign: "middle",
              textAlign: "center",
              minHeight: "initial",
            }
      }
      {...props}
    >
      {children}
    </Fab>
  );
};

export const SudokuValueInput: FC<{
  value: number;
  active?: IRowCol | null;
  position?: IRowCol | null;
  setActive?: ISetActive;
  setValue?: ISetValue;
}> = ({ value, setValue, active, position, setActive }) => {
  const activeRow = (active?.row ?? -1) === position?.row;
  const activeCol = (active?.col ?? -1) === position?.col;
  const onChange = (ev: any) => {
    const nextValue = Number(ev.target.value.slice(-1));
    if (!isNaN(nextValue)) {
      setValue?.(position, nextValue);
    }
  };

  return (
    <SudokuFab
      onClick={() => setActive?.(position)}
      onFocus={() => setActive?.(position)}
      disableFocusRipple
      color={
        activeRow && activeCol
          ? "primary"
          : activeRow
          ? "secondary"
          : activeCol
          ? "secondary"
          : undefined
      }
    >
      {activeRow && activeCol ? (
        <InputBase
          autoFocus
          value={value || ""}
          style={{ color: "inherit" }}
          onChange={onChange}
          type="tel"
          classes={{
            input: "text-center",
          }}
        />
      ) : (
        <Typography>
          <b>{value || ""}</b>
        </Typography>
      )}
    </SudokuFab>
  );
};
