import vader from "vader-sentiment";

const getPostiveNews = (reports) => {
  const positiveNews = [];

  reports.forEach((report) => {
    const { description } = report;
    const intensity =
      vader.SentimentIntensityAnalyzer.polarity_scores(description);

    if (intensity.compound > 0.05) {
      positiveNews.push(report);
    }
  });

  return positiveNews;
};

export { getPostiveNews };

export default getPostiveNews;
