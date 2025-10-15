let params = new URLSearchParams(window.location.search);

let movieId = params.get("id");
console.log(movieId);

let poster = document.querySelector(".poster");
let description = document.querySelector(".description");
let rating = document.querySelector(".rating");
let release = document.querySelector(".release");
let title = document.querySelector(".title");
let body = document.querySelector("body");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjUxNmFjNzJjYmVlZTQyNjdiYzA5MzJiZTRiNGE3YyIsIm5iZiI6MTc1OTgzMjIxMS4xNTM5OTk4LCJzdWIiOiI2OGU0ZTg5MzZjMjlhYjNjOTViZDlmM2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RMnMRhpaV35OkspCL1PFF93Np8i87KMe4MTLnQ8WZRY",
  },
};

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
  .then((res) => {
    body.style.display = "none";
    return res.json();
  })

  .then((res) => {
    console.log(res);

    body.style.display = "block";

    showData(res);
  })
  .catch((err) => {
    console.error(err);
  });

function showData(result) {
  console.log(result);
  poster.src = "https://image.tmdb.org/t/p/original/" + result.poster_path;
  description.innerText = result.overview;
  rating.innerText = result.vote_average;
  release.innerText = result.release_date;
  title.innerText = result.title;
}
