import { Box, IconButton, useTheme } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PersonIcon from "@mui/icons-material/Person";

function Navbar() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        height: "70px",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderTop: `2px solid ${theme.palette.primary[2]}`,
        backgroundColor: theme.palette.primary[3],
      }}
    >
      <IconButton sx={{ width: "60px", height: "60px" }}>
        <NewspaperIcon
          sx={{
            color: theme.palette.text.primary,
            width: "40px",
            height: "40px",
          }}
        />
      </IconButton>
      <IconButton sx={{ width: "60px", height: "60px" }}>
        <PersonIcon
          sx={{
            color: theme.palette.text.primary,
            width: "40px",
            height: "40px",
          }}
        />
      </IconButton>
    </Box>
  );
}

export default Navbar;
