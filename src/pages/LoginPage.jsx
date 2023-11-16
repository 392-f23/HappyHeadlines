import { Box, Button, Typography, useTheme } from "@mui/material";
import Container from "../components/Container";
import StyledDivider from "../components/StyledDivider";
import GoogleIcon from "@mui/icons-material/Google";
import { signUpWithGoogle } from "../utility/firebase";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ mt: 6 }}>
        <Typography variant="h1" sx={{ fontSize: "2.3rem" }}>
          HappyHeadlines
        </Typography>
        <StyledDivider />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: "33vh",
        }}
      >
        <Typography variant="h2" sx={{ textAlign: "center", mb: 2 }}>
          Positive news from around the world right at your fingertips.
        </Typography>
        <Button
          fullWidth
          startIcon={<GoogleIcon sx={{ width: "36px", height: "36px" }} />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
            borderRadius: "30px",
            fontSize: "1.4rem",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            "&:hover": {
              backgroundColor: theme.palette.primary[4],
            },
          }}
          onClick={() => signUpWithGoogle(navigate)}
        >
          Log in with Google
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
