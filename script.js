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
  let trending = await fetchapi(movieTrendingUrl);
  let popular = await fetchapi(popolarUrl);
  let toprated = await fetchapi(topRatedUrl);
  let response1 = trending.results;
  let response2 = popular.results;
  let response3 = toprated.results;

  let promises1 = [];
  let promises2 = [];
  let promises3 = [];

  for (let i = 0; i < response1.length; i++) {
    promises1.push(response1[i]);
    // console.log(promises1);
  }
  for (let i = 0; i < response2.length; i++) {
    promises2.push(response2[i]);
    // console.log(promises2);
  }
  for (let i = 0; i < response3.length; i++) {
    promises3.push(response2[i]);
    // console.log(promises3);
  }

  let finaData1 = Promise.all(promises1);
  let finaData2 = Promise.all(promises2);
  let finaData3 = Promise.all(promises3);

  console.log(finaData1, finaData2, finaData3);
});
