//function to call upon API! 
const fetchReportFromAPI = async () => {
    console.log("fetch gets called!")
    const api_key = "j2jyfI5O8dMibA7OX4f9Rs9MftLNUbJsT01s3ZLM";
    // //for now, I am fixing center coordinates to be Chicago,IL! 
    // const coords = [40.0645, -89.1988]
    // //radius of how far we want to restrict our news source => in meters! 
    // const radius =  11.35 * Math.pow(10, 9); 
    // console.log(`radius: ${radius}`); 
    const locale = "us,ca"
    const domains = "com,org"
    const limitNews = 20; 
    const apiURL = `https://api.thenewsapi.com/v1/news/all?api_token=${api_key}&domains=${domains}&language=en&limit=${limitNews}`;
        ;const awresponse = await fetch(apiURL); 
    console.log(response)    
    return reports;
}

export default fetchReportFromAPI;