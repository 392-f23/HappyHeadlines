import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import fetchReportFromAPI from "./utility/api";
import getPositiveNews from "./utility/sentiment";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

function App() {
  /*
  useEffect(async () => {
    const reports = await fetchReportFromAPI();
    console.log("reports in app\n")
    console.log(reports);
    getPositiveNews(reports);
  }, [])*/

  return (
    <ThemeProvider theme={theme}>
      <HomePage />
      <Navbar />
    </ThemeProvider>
  );
}

export default App;
