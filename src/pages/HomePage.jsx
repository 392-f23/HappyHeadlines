import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import NewsCard from "../components/NewsCard";
import StyledDivider from "../components/StyledDivider";
import Container from "../components/Container";
import { getPostiveNews } from "../utility/sentiment";
import LoadingContainer from "../components/LoadingContainer";
import fetchReportsFromAPI from "../utility/api";
import {
  fetchNewsFromDb,
  fetchPersonalData,
  pushNewsToDB,
} from "../utility/firebase";
import RefreshIcon from "@mui/icons-material/Refresh";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedNews, setFetchedNews] = useState([]);
  const [news, setNews] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [filter, setFilter] = useState("");
  const [possibleFilters, setPossibleFilters] = useState([]);

  const fetchLatestNews = async () => {
    setIsLoading(true);
    const latestNews = await fetchReportsFromAPI();
    const positiveLatestNews = getPostiveNews(latestNews);
    await pushNewsToDB(positiveLatestNews);
    setRefetch(!refetch);
    setIsLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const data = await fetchNewsFromDb();
      setNews(data);
      setFetchedNews(data);

      const allTags = data.map((curr) => curr.tags);
      const uniqueTags = new Set([...allTags]);
      setPossibleFilters([...uniqueTags]);

      const userInfo = await fetchPersonalData();
      const { likedPosts } = userInfo;
      setLikedPosts(likedPosts);
      setIsLoading(false);
    };

    init();
  }, [refetch]);

  const theme = useTheme();

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilter(value);
    if (value === "") {
      setNews(fetchedNews);
    } else {
      const filteredNews = fetchedNews.filter((curr) => curr.tags === value);
      setNews(filteredNews);
    }
  };

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
              NonNegativeNews
            </Typography>
            <Typography variant="h2">
              Here are some uplifting stories.
            </Typography>
          </Box>
          <IconButton onClick={() => fetchLatestNews()}>
            <RefreshIcon
              sx={{
                width: "45px",
                height: "45px",
                color: theme.palette.text.primary,
              }}
            />
          </IconButton>
        </Box>
        <StyledDivider />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "30px",
          }}
        >
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Category
            </InputLabel>

            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={filter}
              onChange={handleFilterChange}
              label="Category"
            >
              <MenuItem value={""}>Category</MenuItem>
              {possibleFilters.map((currFilter) => (
                <MenuItem value={currFilter}>{currFilter}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
                documentId={data.documentId}
                isFavorite={likedPosts.includes(data.documentId)}
              />
            );
          })}
        </Box>
      </Container>
    </LoadingContainer>
  );
}

export default HomePage;
