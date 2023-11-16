import vader from "vader-sentiment";

const getPostiveNews = (reports) => {
    const positiveNews = [];
    console.log("reports in getPositiveNews\n")
    console.log(reports);
    reports.forEach((report) => {
        console.log(report); 
        const { snippet, description } = report;
        console.log(`snippet: ${snippet}`);
        console.log(`report: ${Object.keys(report)}`);
        console.log(`description: ${report.description}`);
        console.log(`Snippet: ${report.snippet}`);
        // console.log(`report: ${Object.keys(report)}`);
        //-1 => most negative, -1 => most positive! 
        const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(description);
        console.log(report, intensity);
        if (intensity.compound > 0.8) positiveNews.push(report)
    });
    return positiveNews
}

export { getPostiveNews } ;

export default getPostiveNews;