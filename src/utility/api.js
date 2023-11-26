//function to call upon API!
const fetchReportFromAPI = async (page = 0) => {
  const api_key = "Y3178e9DLxD0uAVt3Rue14MBAAY1ksOM";
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${api_key}&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();

  const { response } = data;
  const { docs } = response;

  return docs;
};

export default fetchReportFromAPI;
