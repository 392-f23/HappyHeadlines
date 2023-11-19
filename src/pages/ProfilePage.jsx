import Container from "../components/Container";
import { Box, Button, Typography, useTheme } from "@mui/material";
import StyledDivider from "../components/StyledDivider";
import BookmarkedStory from "../components/BookmarkedStory";
import initialData from "../utility/initial-data.json";
import TopicSelect from "../components/TopicSelect";
import { useState, useEffect } from "react";
import { handleLogOut, fetchPersonalData } from "../utility/firebase";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const theme = useTheme();
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
  const name = localStorage.getItem("name");
  const photoUrl = localStorage.getItem("photoUrl");
  let likedPosts;

  useEffect(() => {
    const init = async () => {
      const data = await fetchPersonalData();
      likedPosts = data.likedPosts;
    };

    init();
  }, []);

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h1" sx={{ mb: 1 }}>
            HappyHeadlines
          </Typography>
          <Typography variant="h2">Welcome back, {name}.</Typography>
        </Box>
        <Box
          component="img"
          src={photoUrl}
          sx={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
        />
      </Box>
      <StyledDivider />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Typography variant="h2" sx={{ mb: 2 }}>
          Your bookmarked stories.
        </Typography>
        <Box sx={{ width: "77vw" }}>
          <Box sx={{ overflow: "auto", whiteSpace: "nowrap" }}>
            {initialData.map((story) => {
              return (
                <BookmarkedStory
                  key={story.uuid}
                  headline={story.title}
                  photoUrl={story.image_url}
                  articleUrl={story.url}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <StyledDivider />
        <Typography variant="h2">Your selected topics.</Typography>
        <TopicSelect
          possibleTags={possibleTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          showSaveButton={true}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <StyledDivider />
        <Button
          fullWidth
          sx={{
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.primary[3],
            borderRadius: "30px",
            fontSize: "1.4rem",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            mb: 14,
            "&:hover": {
              backgroundColor: theme.palette.primary[5],
            },
          }}
          onClick={() => handleLogOut(navigate)}
        >
          Log Out
        </Button>
      </Box>
    </Container>
  );
}

export default ProfilePage;
