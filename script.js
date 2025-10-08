let wrapper = document.querySelector(".wrapper");

let movieTrendingUrl =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=2f516ac72cbeee4267bc0932be4b4a7c";
let popolarUrl =
  "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=2f516ac72cbeee4267bc0932be4b4a7c";
let topRatedUrl =
  "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=2f516ac72cbeee4267bc0932be4b4a7c";

async function fetchapi(url) {
  try {
    let response = await fetch(url);
    let result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("load", async () => {
  let trending = fetchapi(movieTrendingUrl);
  let popular = fetchapi(popolarUrl);
  let toprated = fetchapi(topRatedUrl);

  let promises = [trending, popular, toprated];

  let result = await Promise.all(promises);

  for (let i = 0; i < result.length; i++) {
    showData(result[i].results);
  }
});

function showData(data) {
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i]);

    let div = document.createElement("div");
    div.classList.add("box");
    let image = document.createElement("img");
    image.src = "https://image.tmdb.org/t/p/original/" + data[i].poster_path;
    let tittle = document.createElement("p");
    tittle.innerText = data[i].name;
    div.append(image, tittle);
    wrapper.append(div);
  }
}
