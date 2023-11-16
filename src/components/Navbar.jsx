import { Box, IconButton, useTheme } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [pageSelected, setPageSelected] = useState("home");

  const handleButtonClick = (correspondingPage) => {
    setPageSelected(correspondingPage);
    navigate(`/${correspondingPage}`);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        height: "75px",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderTop: `2px solid ${theme.palette.primary[2]}`,
        backgroundColor: theme.palette.primary[3],
      }}
    >
      <IconButton
        sx={{ width: "60px", height: "60px" }}
        onClick={() => handleButtonClick("home")}
      >
        <NewspaperIcon
          sx={{
            color: theme.palette.text.primary,
            width: pageSelected == "home" ? "40px" : "25px",
            height: pageSelected == "home" ? "40px" : "25px",
          }}
        />
      </IconButton>
      <IconButton
        sx={{ width: "60px", height: "60px" }}
        onClick={() => handleButtonClick("profile")}
      >
        <PersonIcon
          sx={{
            color: theme.palette.text.primary,
            width: pageSelected == "profile" ? "40px" : "25px",
            height: pageSelected == "profile" ? "40px" : "25px",
          }}
        />
      </IconButton>
    </Box>
  );
}

export default Navbar;
