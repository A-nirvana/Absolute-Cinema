const ratingIcons: { [key: string]: string } = {
    "Internet Movie Database": 'https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg',
    "Rotten Tomatoes": 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Rotten_Tomatoes.svg',
    "Metacritic": 'https://upload.wikimedia.org/wikipedia/commons/2/20/Metacritic.svg',
};

const watchIcons: { [key: string]: string } = {
    "netflix": 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    "amazon": 'https://upload.wikimedia.org/wikipedia/commons/6/62/Amazon.com-Logo.svg',
    "hulu": 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Hulu_Logo.svg',
    "disney+": 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Disney%2B_logo.svg',
    "hbomax": 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/HBO_Max_Logo.svg/1197px-HBO_Max_Logo.svg.png?20231225011828',
    "itunes": 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/ITunes_Store_logo_2017.svg/640px-ITunes_Store_logo_2017.svg.png',
    "play": 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Google_Play_2022_logo.svg/768px-Google_Play_2022_logo.svg.png?20220726170516',
    "youtube": 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/768px-YouTube_Logo_2017.svg.png?20230929095411',
    "hungamaplay": 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Hungama_TV.svg/640px-Hungama_TV.svg.png',
    "amazonprimevideo" : "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"
  }

function convertUrl(oldUrl: string) {
    // Create a new URL object
    const url = new URL(oldUrl);

    // Extract the video id from the pathname
    const parts = url.pathname.split('/');
    const videoId = parts[parts.length - 1];

    // Construct the new URL
    const newUrl = `https://www.imdb.com/video/embed/${videoId}/?autoplay=false`;

    return newUrl;
}

function convertDuration(durationStr:string) {
    const minutes = parseInt(durationStr, 10);
  
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (hours === 0) {
      return `${remainingMinutes} min`;
    }
  
    return `${hours} hr ${remainingMinutes} min`;
  }

export function determineIdType(id: string): 'tmdb' | 'imdb' | 'unknown' {
    const tmdbRegex = /^\d+$/; // TMDb IDs are numeric
    const imdbRegex = /^tt\d+$/; // IMDb IDs start with 'tt' followed by digits
  
    if (tmdbRegex.test(id)) {
      return 'tmdb';
    } else if (imdbRegex.test(id)) {
      return 'imdb';
    } else {
      return 'unknown';
    }
  }

export { convertUrl, convertDuration }

export { ratingIcons, watchIcons }