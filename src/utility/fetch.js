import fetchReportsFromAPI from "./api";
import getPostiveNews from "./sentiment";
import { pushNewsToDB } from "./firebase";

const asyncTimeout = (currIndex) =>
  new Promise((resolve) => {
    setTimeout(async () => {
      console.log(currIndex);
      const latestNews = await fetchReportsFromAPI(currIndex);
      const currPositive = getPostiveNews(latestNews);
      resolve(currPositive);
    }, 12000);
  });

const fetchNews = async () => {
  const positiveNews = [];

  for (let i = 0; i < 50; i++) {
    const positive = await asyncTimeout(i);
    positiveNews.push(positive);
  }

  await pushNewsToDB(positiveNews);
};

fetchNews();
