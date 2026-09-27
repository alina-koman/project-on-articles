import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#456b57",
      dark: "#34513f",
      light: "#e8efe9",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#b8745c",
    },
    background: {
      default: "#f5f3ee",
      paper: "#fffefa",
    },
    text: {
      primary: "#292f2b",
      secondary: "#747b74",
    },
    divider: "#e8e4dc",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #e8e4dc",
          boxShadow: "0 4px 18px rgba(41, 47, 43, 0.04)",
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});
