import axios from 'axios'; 

/*
//Options for FastAPI
const options = {
  method: 'GET',
  url: 'https://positive-news.p.rapidapi.com/news/world',
  headers: {
    'X-RapidAPI-Key': '01ba0bfc99msh78cab355b2c9107p160831jsnc78c2bb783ec',
    'X-RapidAPI-Host': 'positive-news.p.rapidapi.com'
  }
};*/
/*
const fetchNewsFromFastAPI = async () => {
  try {
    const resp = await axios.request(options); 
    const {data} = resp; 
    console.log(`data: \n`)
    console.log(data); 
  } catch(err){
    console.log(err); 
  }
}*/


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
