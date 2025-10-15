import { config, options } from "./config.js";

const buttons = document.querySelectorAll(".btns button");
const trending = document.querySelector(".trending ");
const popular = document.querySelector(".popular ");
const toprated = document.querySelector(".toprated ");
const welcome = document.querySelector(".welcome ");
const movieWrapper = document.querySelector(".movieSection ");
const inputForMovies = document.querySelector("#inputForMovies ");
const submit = document.querySelector(".submit ");

// const trendingMoviesWeek = document.querySelector("#trendingMoviesWeek");

window.addEventListener("load", async () => {
  const result = await fetchDataFromURL(
    {
      trendingMoviesDay: config.endpoints.trendingMoviesDay,
      popularMovies: config.endpoints.popularMovies,
      topRatedMovies: config.endpoints.topRatedMovies,
      upcomingMovies: config.endpoints.upcomingMovies,
    },
    options
  );

  //   console.log(result);
  for (let x in result) {
    config.fetchedData[x] = result[x];
  }
  showData("trendingMoviesDay", trending);
  showData("popularMovies", popular);
  showData("topRatedMovies", toprated);
  welcomebg(result.upcomingMovies);

  //   console.log(config.fetchedData);
});

buttons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    let id = e.target.id;
    console.log(id);
    if (config.fetchedData[id]) {
      console.log("Data already fetched");
      showDatabtns(id);

      return;
    } else {
      const url = config.endpoints[id];
      const result = await fetchDataFromURL(url, options);
      config.fetchedData[id] = result.results;
      console.log(config.fetchedData);
      showDatabtns(id);
    }
  });
});

async function fetchDataFromURL(url, options) {
  let result;
  if (typeof url === "object") {
    const promises = [];
    for (let x in url) {
      const response = await fetch(url[x], options);
      promises.push(response.json());
    }
    //return await Promise.all(promises);
    const data = await Promise.all(promises);
    const keys = Object.keys(url);
    result = {};
    keys.forEach((key, index) => {
      result[key] = data[index].results;
    });
  } else {
    const response = await fetch(url, options);
    result = await response.json();
  }
  return result;
}

function showData(whatToshow, whereTOshow) {
  whereTOshow.innerHTML = "";

  for (let i = 0; i < config.fetchedData[whatToshow].length; i++) {
    let urlData = config.fetchedData[whatToshow][i];
    let div = document.createElement("div");
    div.classList.add("box");
    let image = document.createElement("img");
    image.src = "https://image.tmdb.org/t/p/original/" + urlData.poster_path;
    // console.log(config.fetchedData[whatToshow][i]);

    div.addEventListener("click", (e) => showDetails(e, urlData));

    div.append(image);
    whereTOshow.append(div);
  }
}

function showDatabtns(id) {
  if (id === "trendingMoviesDay" || id === "trendingMoviesWeek") {
    showData(id, trending);
  } else if (id === "popularMovies" || id === "popularTvshows") {
    showData(id, popular);
  } else if (id === "topRatedMovies" || id === "topRatedTvshows") {
    showData(id, toprated);
  }
}

function welcomebg(result) {
  let randomIndex = Math.floor(Math.random() * result.length);

  let moviebg = result[randomIndex];

  let bacdrop_path =
    "https://image.tmdb.org/t/p/original/" + moviebg.backdrop_path;
  // console.log(bacdrop_path);

  welcome.style.backgroundImage = "url(" + bacdrop_path + ")";
}

submit.addEventListener("click", async () => {
  let serchInput = inputForMovies.value;
  let url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    serchInput
  )}`;

  let result = await fetchDataFromURL(url, options);

  if (result.results.length == 0) {
    movieWrapper.innerHTML = "";

    let para = document.createElement("p");

    para.innerText = "Movie not found";

    movieWrapper.append(para);
  } else {
    displayResuts(result.results);
  }
});

function displayResuts(result) {
  movieWrapper.innerHTML = "";
  for (let i = 0; i < result.length; i++) {
    let div = document.createElement("div");
    div.classList.add("box");
    let image = document.createElement("img");
    image.src = "https://image.tmdb.org/t/p/original/" + result[i].poster_path;
    // div.addEventListener("click", showDetails);

    div.addEventListener("click", (e) => showDetails(e, result[i]));

    div.append(image);
    movieWrapper.append(div);
    movieWrapper.classList.add("inputResultClass");
  }
}

function showDetails(e, result) {
  console.log(result.id, e);
  window.open(`singlemovie.html?id=${result.id}`, "_blank");
}
