import { Box } from "@mui/material";

const Container = (props) => {
  const { children } = props;

  return (
    <Box
      sx={{
        padding: "10%",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
