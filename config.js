const baseURL = "https://api.themoviedb.org/3";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjUxNmFjNzJjYmVlZTQyNjdiYzA5MzJiZTRiNGE3YyIsIm5iZiI6MTc1OTgzMjIxMS4xNTM5OTk4LCJzdWIiOiI2OGU0ZTg5MzZjMjlhYjNjOTViZDlmM2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RMnMRhpaV35OkspCL1PFF93Np8i87KMe4MTLnQ8WZRY",
  },
};

export const config = {
  endpoints: {
    trendingMoviesDay: `${baseURL}/trending/movie/day?language=en-US`,
    trendingMoviesWeek: `${baseURL}/trending/movie/day?language=en-US`,
    popularMovies: `${baseURL}/movie/popular?language=en-US&page=1`,
    popularTvshows: `${baseURL}/tv/popular?language=en-US&page=1`,
    topRatedMovies: `${baseURL}/movie/top_rated?language=en-US&page=1`,
    topRatedTvshows: `${baseURL}/tv/top_rated?language=en-US&page=1`,
    upcomingMovies: `${baseURL}/movie/upcoming?language=en-US&page=1,`,
  },
  fetchedData: {
    trendingMoviesDay: null,
    trendingMoviesWeek: null,
    popularMovies: null,
    popularTvshows: null,
    topRatedMovies: null,
    topRatedTvshows: null,
    upcomingMovies: null,
  },
};
