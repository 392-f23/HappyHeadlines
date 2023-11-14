import { Typography } from "@mui/material";
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
      <StyledDivider />
      {getPostiveNews(initialData).map(function (data) {
        return <NewsCard 
        title={data.source_citation_title} 
        imgUrl={data.source_image_url}
        tags={data.tag}
        articleUrl={data.source_citation_url}
        summary={data.summary}
        />
        ;
      })}
      {/* <NewsCard
        title="Happy"
        imgUrl="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
        tags="Dogs"
        articleUrl="https://www.dailypaws.com/pet-news-entertainment/feel-good-stories"
        summary="this is a happy article"
      /> */}
    </Container>
  );
}

export default HomePage;
