import Container from "../components/Container";
import { Button, Typography, useTheme } from "@mui/material";
import StyledDivider from "../components/StyledDivider";
import TopicSelect from "../components/TopicSelect";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";

function OnboardingPage() {
  const possibleTags = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleContinueClick = () => {
    // todo: upload selectedTags to database
    navigate("/home");
  }

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 1, mt: 6 }}>
        HappyHeadlines
      </Typography>
      <Typography variant="h2">Let's get you onboarded.</Typography>
      <StyledDivider />
      <Typography variant="h2" sx={{ mb: 2 }}>
        (Optional) Select topics that interest you.
      </Typography>
      <TopicSelect
        possibleTags={possibleTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <Button
          fullWidth
          endIcon={<ChevronRight sx={{ width: "36px", height: "36px" }} />}
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
          onClick={() => handleContinueClick()}
        >
          Continue
        </Button>
    </Container>
  );
}

export default OnboardingPage;
