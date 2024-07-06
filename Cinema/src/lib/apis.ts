const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
    'x-rapidapi-host': 'ott-details.p.rapidapi.com'
  }
};

const fetchOMDbDetails = async(imdbid:string)=>{
  const url = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${imdbid}`;
  let result;
  try {
    const response = await fetch(url);
    result = await response.json();
    console.log(result)
  }
  catch(e){
    console.log(e)
  }
  return result;
}

const fetchMovies = async (movie: string) => {
  const url = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${movie}`;
  let result;
  try {
    const response = await fetch(url);
    result = await response.json();
    console.log(result)
  }
  catch(e){
    console.log(e)
  }
  return result;
}

const fetchMovieDetails = async (imdbid: string) => {
  const url = `https://ott-details.p.rapidapi.com/gettitleDetails?imdbid=${imdbid}`;
  let result;
  try {
    const response = await fetch(url, options);
    result = await response.json();
  }
  catch(e){
    console.log(e)
  }
  return result;
}

const fetchAdditionalDetails = async (imdbid: string) => {
  const url = `https://ott-details.p.rapidapi.com/getadditionalDetails?imdbid=${imdbid}`;
  let result;
  try {
    const response = await fetch(url, options);
    result = await response.json();
  }
  catch(e){
    console.log(e)
  }
  return result;
}

const fetchNowPlaying = async() => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`;
  let result;
  try {
    const response = await fetch(url);
    result = await response.json();
  }
  catch(e){
    console.log(e)
  }
  return result;
}

const fetchTrailer = async(imdbid: string)=>{
  const url = `https://api.themoviedb.org/3/movie/${imdbid}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`;
  let result;
  try {
    const response = await fetch(url);
    result = await response.json();
  }
  catch(e){
    console.log(e)
  }
  return result;
}

export { options, fetchMovies, fetchMovieDetails, fetchAdditionalDetails, fetchOMDbDetails}