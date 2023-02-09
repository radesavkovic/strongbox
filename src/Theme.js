import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#1B212C",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 16,
    },
    allVariants: {
      color: "#FFFFFF",
    },
    h4: {
      fontWeight: 600,
      fontSize: 32,
    },
    h5: {
      fontSize: 20,
      fontWeight: 500,
    },
    h6: {
      fontSize: 32,
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          // boxShadow: "6px 6px 20px 6px #00000096",
          // borderRadius: 20,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "48px 24px",
        },
      },
    },
    // MuiGrid: {
    //   styleOverrides: {
    //     root: {
    //       marginTop: 0,
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 400,
          // fontSize: "1.2rem",
          padding: "10px",
          minWidth: 138,
        },
        contained: {
          // boxShadow: "6px 6px 20px 6px #00000096",
        },
        containedSecondary: {
          color: "#FFFFFF",
        },
      },
    },
  },
});

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
