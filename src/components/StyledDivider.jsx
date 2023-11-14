import { Box, useTheme } from "@mui/material";

function StyledDivider() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "6px",
        backgroundColor: theme.palette.primary[2],
        borderRadius: "6px",
        mt: 1,
        mb: 3,
      }}
    />
  );
}

export default StyledDivider;
