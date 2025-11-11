// theme.js (or wherever you define your theme)
import { createTheme } from "@mui/material/styles";
import { blue, red, green, yellow } from "@mui/material/colors"; // Example colors

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#a49786",
      light: "#42a5f5",
      dark: "black",
      contrastText: "white",
    },
    secondary: {
      main: "#f1f3d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "black", // Custom secondary color
    },
    action: {
      disabled: "black", // Example: a light gray for disabled text
      disabledBackground: "#dbd3cc",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Custom font family
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    // Customize other typography variants (h2, body1, button, etc.)
  },
  spacing: 8, // Customize the spacing unit (default is 8px)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Custom border-radius for all buttons
          backgroundColor: red,
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: blue[700],
            "&:hover": {
              backgroundColor: blue[900],
            },
          },
        },
      ],
    },
    // Customize other components like MuiAppBar, MuiTextField, etc.
  },
});

export default customTheme;
