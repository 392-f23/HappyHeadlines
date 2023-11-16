//function to call upon API! 
const fetchReportFromAPI = async () => {
    console.log("fetch gets called!")
    const api_key = "j2jyfI5O8dMibA7OX4f9Rs9MftLNUbJsT01s3ZLM";
    // //for now, I am fixing center coordinates to be Chicago,IL! 
    // const coords = [40.0645, -89.1988]
    // //radius of how far we want to restrict our news source => in meters! 
    // const radius =  11.35 * Math.pow(10, 9); 
    // console.log(`radius: ${radius}`); 
    //const allNewsURL = `https://api.thenewsapi.com/v1/news/all?api_token=${api_key}&language=en&limit=3`;
    const topStoriesURL = `https://api.thenewsapi.com/v1/news/top?api_token=${api_key}&locale=us&language=en`; 
    const response = await fetch(topStoriesURL); 
    const data = await response.json();
    console.log(data);
    const news = data["data"]; 
    console.log(`news: \n`)
    console.log(news)
    return news; 
}

export default fetchReportFromAPI;