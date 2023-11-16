import { Box, IconButton, Typography, useTheme } from "@mui/material";
import NewsCard from "../components/NewsCard";
import StyledDivider from "../components/StyledDivider";
import Container from "../components/Container";
import { getPostiveNews } from "../utility/sentiment";
import initialData from "../utility/initial-data.json";
import fetchReportsFromAPI from "../utility/api";
import { useState } from "react";
import { pushNewsToDB } from "../utility/firebase";
import RefreshIcon from "@mui/icons-material/Refresh";

function HomePage() {
  const [news, setNews] = useState(initialData);

  //when user clicks refresh button, should call upon API and get back latest data!
  const updateDB = async () => {
    //make the api call to get back latest news!
    const latestNews = await fetchReportsFromAPI();
    const positiveLatestNews = getPostiveNews(latestNews);
    //update state!
    setNews(positiveLatestNews);
    //push to DB!
    pushNewsToDB(positiveLatestNews);
  };

  const theme = useTheme();

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
          <Typography variant="h2">Here are some uplifting stories.</Typography>
        </Box>
        <IconButton>
          <RefreshIcon
            sx={{
              width: "45px",
              height: "45px",
              color: theme.palette.text.primary,
            }}
            onClick={updateDB}
          />
        </IconButton>
      </Box>
      <StyledDivider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          pb: 10,
        }}
      >
        {getPostiveNews(news).map((data, idx) => {
          return (
            <NewsCard
              key={idx}
              title={data.title}
              imgUrl={data.image_url}
              tags={data.categories}
              articleUrl={data.url}
              summary={data.description}
            />
          );
        })}
      </Box>
    </Container>
  );
}

export default HomePage;
