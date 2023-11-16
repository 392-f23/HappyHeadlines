import { Box, Typography } from "@mui/material";
import NewsCard from "../components/NewsCard";
import StyledDivider from "../components/StyledDivider";
import Container from "../components/Container";
import { getPostiveNews } from "../utility/sentiment";
import initialData from "../utility/initial-data.json";
import fetchReportsFromAPI from "../utility/api"; 
import {useState} from "react";
import {pushNewsToDB} from "../utility/firebase"; 

function HomePage() {
  const [news, setNews] = useState(initialData)
  console.log("news state in HomePage: \n")
  console.log(news); 
  //when user clicks refresh button, should call upon API and get back latest data! 
  const updateDB = async () => {
    //make the api call to get back latest news! 
    const latestNews = await fetchReportsFromAPI(); 
    const positiveLatestNews = getPostiveNews(latestNews)
    console.log("positiveLatesetNews: \n")
    console.log(positiveLatestNews);
    //update state! 
    setNews(positiveLatestNews);
    //push to DB! 
    pushNewsToDB(positiveLatestNews);
    console.log("push to DB done"); 
  }; 

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 1, mt: 6 }}>
        HappyHeadlines
      </Typography>
      <Typography variant="h2">Here are some uplifting stories.</Typography>
      <button onClick = {updateDB}>Refresh</button>
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
        {getPostiveNews(news).map((data, idx) => {
          console.log("current data: \n")
          console.log(data);
          return (
            <NewsCard
              key = {idx}
              title={data.title}
              imgUrl={data.image_url}
              tags={data.categories}
              articleUrl={data.soure}
              summary={data.description}
            />
          );
        })}
      </Box>
    </Container>
  );
}

export default HomePage;
