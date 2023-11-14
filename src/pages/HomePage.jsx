import { Box, Typography } from "@mui/material";
import NewsCard from "../components/NewsCard";
import StyledDivider from "../components/StyledDivider";
import Container from "../components/Container";
import { getPostiveNews } from "../utility/sentiment";
import initialData from "../utility/initial-data.json";

function HomePage() {
  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 1, mt: 6 }}>
        HappyHeadlines
      </Typography>
      <Typography variant="h2">Here are some uplifting stories.</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          pb: 10,
        }}
      >
        <StyledDivider />
        {getPostiveNews(initialData).map(function (data) {
          return (
            <NewsCard
              title={data.source_citation_title}
              imgUrl={data.source_image_url}
              tags={data.tag}
              articleUrl={data.source_citation_url}
              summary={data.summary}
            />
          );
        })}
      </Box>
    </Container>
  );
}

export default HomePage;
