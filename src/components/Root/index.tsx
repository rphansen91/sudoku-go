import React, { FC } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
          main: 'rgba(49, 93, 138, 1)'
        },
        secondary: {
          main: 'rgba(126, 172, 223, 1)'
        }
    }
})

export const Root: FC = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        { children }
    </MuiThemeProvider>
  );
}

export default Root;
