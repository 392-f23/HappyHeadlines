import vader from "vader-sentiment";

const getPostiveNews = (reports) => {
    const positiveNews = [];
    console.log("reports in getPositiveNews\n")
    console.log(reports);
    reports.forEach((report) => {
        const { summary } = report;
        const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(summary);
        console.log(report, intensity);
        if (intensity.compound > 0.8) positiveNews.push(report)
    });
    return positiveNews
}

export { getPostiveNews } ;

export default getPostiveNews;