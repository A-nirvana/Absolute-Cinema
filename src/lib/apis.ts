const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
    'x-rapidapi-host': 'ott-details.p.rapidapi.com'
  }
};

const options2 = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY_2 || '',
    'x-rapidapi-host': 'ott-details.p.rapidapi.com'
  }
};

const fetchOMDbDetails = async (imdbid: string) => {
  const url = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${imdbid}`;
  let result;
  try {
    const response = await fetch(url);
    result = await response.json();
  
  }
  catch (e) {
    console.log(e)
  }
  return result;
}

const fetchMovies = async (movie: string,page:number) => {
  const url = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${movie}&page=${page}`;
  let result;
  try {
    const response = await fetch(url);
    result = await response.json();
  
  }
  catch (e) {
    console.log(e)
  }
  return result;
}

const fetchMovieDetails = async (imdbid: string) => {
  const url = `https://ott-details.p.rapidapi.com/gettitleDetails?imdbid=${imdbid}`;
  let result;
  try {
    const response = await fetch(url, options2);
    result = await response.json();
  }
  catch (e) {
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
  catch (e) {
    console.log(e)
  }
  return result;
}

export const fetchTop = async (type: "movie" | "tv") => {
  const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=500' `;
  let result;
  try {
    const response = await fetch(url);
    result = await response.json();
  }
  catch (e) {
    console.log(e)
  }
  return result;
}
export const fetchTrending = async () => {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`;
  let result;
  try {
    const response = await fetch(url);
    result = await response.json();
  }
  catch (e) {
    console.log(e)
  }
  return result;
}
export const fetchNowPlaying = async (type: "movie" | "tv") => {
  const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=2024-04-01&release_date.lte=2024-05-20`;
  let result;
  try {
    const response = await fetch(url);
    result = await response.json();
  
  }
  catch (e) {
    console.log(e)
  }
  return result;
}

export const fetchPopular = async (type: "movie" | "tv") => {
  const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=true&language=en-US&page=1&release_date.gte={min_date}&release_date.lte={max_date}&vote_count.gte=2000`;
  let result;
  try {
    const response = await fetch(url);
    result = await response.json();
  }
  catch (e) {
    console.log(e)
  }
  return result;
}

export const fetchUpcoming = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&vote_count.gte=200`
  let result;
  try {
    const response = await fetch(url);
    result = await response.json();
  }
  catch (e) {
    console.log(e)
  }
  return result;
}

export const editorChoice = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1&sort_by=vote_count.desc`
  let result;
  try {
    const response = await fetch(url);
    result = await response.json();
  }
  catch (e) {
    console.log(e)
  }
  return result;
}

export { options, fetchMovies, fetchMovieDetails, fetchAdditionalDetails, fetchOMDbDetails }