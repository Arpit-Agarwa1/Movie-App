import { config, options } from "./config.js";

const buttons = document.querySelectorAll(".btns button");
const trending = document.querySelector(".trending ");
const popular = document.querySelector(".popular ");
const toprated = document.querySelector(".toprated ");
const trendingMoviesWeek = document.querySelector("#trendingMoviesWeek");

window.addEventListener("load", async () => {
  const result = await fetchDataFromURL(
    {
      trendingMoviesDay: config.endpoints.trendingMoviesDay,
      popularMovies: config.endpoints.popularMovies,
      topRatedMovies: config.endpoints.topRatedMovies,
    },
    options
  );

  //   console.log(result);
  for (let x in result) {
    config.fetchedData[x] = result[x];
  }
  showData(result, trending);
  showData(result, popular);
  showData(result, toprated);

  //   console.log(config.fetchedData);
});

buttons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    let id = e.target.id;
    if (config.fetchedData[id]) {
      console.log("Data already fetched");
      showDatabtns(config.fetchedData[id]);

      return;
    } else {
      const url = config.endpoints[id];
      const result = await fetchDataFromURL(url, options);
      config.fetchedData[id] = result.results;
      //   console.log(config.fetchedData);
      showDatabtns(result.results);
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

function showData(result, section) {
  for (let x in result) {
    result[x].forEach((catagories) => {
      let div = document.createElement("div");
      div.classList.add("box");
      let image = document.createElement("img");

      image.src =
        "https://image.tmdb.org/t/p/original/" + catagories.poster_path;

      div.appendChild(image);
      //   console.log(section);
      section.appendChild(div);
    });
  }
}

function showDatabtns(result) {
  trending.innerHTML = "";
  for (let x in result) {
    let div = document.createElement("div");
    div.classList.add("box");
    let image = document.createElement("img");
    image.src = "https://image.tmdb.org/t/p/original/" + result[x].poster_path;

    div.appendChild(image);
    trending.appendChild(div);
    console.log(result);
  }
}
