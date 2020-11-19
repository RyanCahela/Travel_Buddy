const API_KEY = process.env.API_KEY;
const API_HOST = "contextualwebsearch-websearch-v1.p.rapidapi.com";

const BASE_URL =
  "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI";

const searchInput = document.getElementById("search-term");
const itemsPerPage = document.getElementById("items-per-page");
const resultsList = document.getElementById("results-list");
const results = document.getElementById("results");
const resultsTemplate = document.getElementById("results-template");
const MAX_ITEMS_PER_PAGE = 50;

function getNews() {
  const options = {
    headers: new Headers({
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    }),
  };

  const params = {
    q: searchInput.value,
    pageSize:
      itemsPerPage.value <= MAX_ITEMS_PER_PAGE
        ? itemsPerPage.value
        : MAX_ITEMS_PER_PAGE,
  };

  fetch(`${BASE_URL}?${formatQueryParams(params)}`, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      const articles = json.value;
      articles.forEach((article) => {
        const clone = resultsTemplate.content.cloneNode(true);
        console.log(clone);
        const title = clone.getElementById("article-title");
        title.textContent = article.title;
        resultsList.appendChild(clone);
      });
      results.classList.remove("hidden");
    });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return queryItems;
}

document.getElementById("news_form").addEventListener("submit", (e) => {
  e.preventDefault();
  getNews();
});
