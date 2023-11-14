import { createTheme } from "@mui/material";

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const theme = createTheme({
  palette: {
    text: {
      primary: "#2D2D2B",
    },
    primary: {
      main: "#B8926A",
      1: "#D4C8BE",
      2: "#B0B0B0",
      3: "#EAE6DF",
    },
  },
  breakpoints: {
    values: { ...breakpoints },
    unit: "px",
  },
  typography: {
    h1: {
      fontFamily: "Oxygen",
      fontWeight: 700,
      fontSize: "1.7rem",
    },
    h2: {
      fontFamily: "Source Sans 3",
      fontWeight: 400,
      fontSize: "1rem",
    },
  },
});
