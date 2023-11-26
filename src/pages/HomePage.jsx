import { useState, useEffect } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import NewsCard from "../components/NewsCard";
import StyledDivider from "../components/StyledDivider";
import Container from "../components/Container";
import { getPostiveNews } from "../utility/sentiment";
import LoadingContainer from "../components/LoadingContainer";
import fetchReportsFromAPI from "../utility/api";
import { fetchNewsFromDb, pushNewsToDB } from "../utility/firebase";
import RefreshIcon from "@mui/icons-material/Refresh";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([]);

  //when user clicks refresh button, should call upon API and get back latest data!
  const updateDB = async () => {
    setIsLoading(true);
    //make the api call to get back latest news!
    const latestNews = await fetchReportsFromAPI();
    const positiveLatestNews = getPostiveNews(latestNews);
    //update state!
    setNews(positiveLatestNews);
    //push to DB!
    pushNewsToDB(positiveLatestNews);
    setIsLoading(false);
  };

  // const asyncTimeout = (currIndex) =>
  //   new Promise((resolve) => {
  //     setTimeout(async () => {
  //       console.log(currIndex);
  //       const latestNews = await fetchReportsFromAPI(currIndex);
  //       const currPositive = getPostiveNews(latestNews);
  //       resolve(currPositive);
  //     }, 12000);
  //   });

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     setIsLoading(true);
  //     const positiveNews = [];

  //     for (let i = 0; i < 50; i++) {
  //       const positive = await asyncTimeout(i);
  //       positiveNews.push(positive);
  //     }

  //     await pushNewsToDB(positiveNews);
  //     setIsLoading(false);
  //   };

  //   fetchNews();
  // }, []);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const data = await fetchNewsFromDb();
      setNews(data);
      setIsLoading(false);
    };

    init();
  }, []);

  const theme = useTheme();

  return (
    <LoadingContainer isLoading={isLoading}>
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
            <Typography variant="h2">
              Here are some uplifting stories.
            </Typography>
          </Box>
          <IconButton>
            <RefreshIcon
              sx={{
                width: "45px",
                height: "45px",
                color: theme.palette.text.primary,
              }}
              // onClick={updateDB}
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
          {news.map((data, idx) => {
            return (
              <NewsCard
                key={idx}
                title={data.title}
                imageUrl={data.image}
                tags={data.tags}
                articleUrl={data.articleUrl}
                summary={data.summary}
                id={data.id}
              />
            );
          })}
        </Box>
      </Container>
    </LoadingContainer>
  );
}

export default HomePage;
