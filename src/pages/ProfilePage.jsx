import Container from "../components/Container";
import { Box, Button, Typography, useTheme } from "@mui/material";
import StyledDivider from "../components/StyledDivider";
import BookmarkedStory from "../components/BookmarkedStory";
import { useState, useEffect } from "react";
import {
  handleLogOut,
  fetchPersonalData,
  fetchStory,
} from "../utility/firebase";
import { useNavigate } from "react-router-dom";
import LoadingContainer from "../components/LoadingContainer";

function ProfilePage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const photoUrl = localStorage.getItem("photoUrl");
  const [bookmarked, setBookmarked] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const data = await fetchPersonalData();
      const { likedPosts } = data;

      const promises = [];
      likedPosts.forEach((id) => {
        promises.push(fetchStory(id));
      });

      await Promise.all(promises).then((stories) => {
        setBookmarked(stories);
      });

      setIsLoading(false);
    };
    init();
  }, []);

  return (
    <LoadingContainer isLoading={isLoading}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
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
              NonNegativeNews
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
            {bookmarked && bookmarked.length === 0 && (
              <Box
                sx={{
                  minHeight: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h3" sx={{ textAlign: "center" }}>
                  No bookmarked stories yet!
                </Typography>
              </Box>
            )}
            {bookmarked && bookmarked.length > 0 && (
              <Box sx={{ overflow: "auto", whiteSpace: "nowrap" }}>
                {bookmarked.map((story) => {
                  return (
                    <BookmarkedStory
                      key={story.documentId}
                      headline={story.summary}
                      photoUrl={story.image}
                      articleUrl={story.articleUrl}
                      title={story.title}
                    />
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ width: "100%", marginTop: "auto" }}>
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
    </LoadingContainer>
  );
}

export default ProfilePage;
