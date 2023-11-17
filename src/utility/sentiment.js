import vader from "vader-sentiment";

const getPostiveNews = (reports) => {
  if (!reports) {
    return [];
  }
  const positiveNews = [];

  reports.forEach((report) => {
    const { snippet } = report;
    const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(snippet);

    if (intensity.compound > 0.05) {
      positiveNews.push(report);
    }
  });

  return positiveNews;
};

export { getPostiveNews };

export default getPostiveNews;
