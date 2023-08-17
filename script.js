// APIs keys
const weather_api_key = "e455787a22054869bc9135812231107";
const news_api_key = "6ba6c10ce62ef63f3e3086403faf2bdf";
// APIs urls
var news_url = `https://gnews.io/api/v4/top-headlines?&country=us&max=10&apikey=${news_api_key}`;
var trending_brazil_url = `https://gnews.io/api/v4/top-headlines?&country=br&max=10&apikey=${news_api_key}`;
var market_url = `https://economia.awesomeapi.com.br/last/USD-BRL,CAD-BRL,EUR-BRL,GBP-BRL,JPY-BRL,GBP-BRL,CNY-BRL`;
// The four cities selected for the weather.
const weather_cities = {
  ip: "auto:ip",
  sp: "-23.533773,-46.625290",
  rj: "-22.908333,-43.196388",
  df: "-15.793889,-47.882778",
};
// Containers and templates of the page for add content.
const news_container = document.querySelector("[data-news-container]");
const news_template = document.querySelector("[data-news-template]");
const market_container = document.querySelector("[data-market-container]");
const market_template = document.querySelector("[data-market-template]");
// Search bar.
const search_input = document.querySelector("[data-search]");
const search_button = document.querySelector("[data-search-button]");
// Go Top.
const go_top = document.querySelector("[data-go-top]");

// Showing go top button on scroll and adding it's functionalities.
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    go_top.style.display = "block";
  } else {
    go_top.style.display = "none";
  }
}

function goTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Searching when "Enter" keyboard key is pressed.
search_input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    search_button.click();
  }
});

// Getting the search value and adding it to a local storage as an url.
search_button.addEventListener("click", () => {
  const value = document.querySelector("[data-search]").value;
  if (value) {
    window.location = "search.html";
    localStorage.setItem(
      "search_link",
      `https://gnews.io/api/v4/top-headlines?q=${value}&apikey=${news_api_key}`
    );
  }
});

// Fetching the "Trending in Brazil" content and showing it.
fetch(trending_brazil_url).then((response) =>
  response.json().then((data) => {
    data.articles.forEach((article) => {
      const trending = document.createElement("a");

      trending.textContent = `- ${article.title.split(" - ")[0]}`;
      trending.href = article.url;
      trending.target = "_blank";

      document.querySelector(".trending-news").append(trending);
    });
  })
);

// Fetching the "Market" content and showing it
fetch(market_url).then((response) =>
  response.json().then((data) => {
    Object.values(data).forEach((value) => {
      const market = market_template.content.cloneNode(true).children[0];
      const market_name = market.querySelector("[data-market-name]");
      const market_price = market.querySelector("[data-market-price]");
      const market_updated = market.querySelector("[data-market-updated]");

      market_name.textContent = `${value.name.split("/")[0]}`;
      market_price.textContent = `R$${value.ask.slice(0, 4)}`;
      market_updated.textContent = value.create_date.slice(10);

      market_container.append(market);
    });
  })
);

// Fetching the weather content and showing it if the user is on main page
if (document.querySelector(".index-body")) {
  // Fetching the weather for each city in "weather_cities"
  Object.values(weather_cities).forEach((location) => {
    const weather_container = document.querySelector(
      "[data-weather-container]"
    );
    const weather_template = document.querySelector("[data-weather-template]");
    var weather_url = `https://api.weatherapi.com/v1/current.json?key=${weather_api_key}&q=${location}&lang=pt`;
    fetch(weather_url).then((response) =>
      response.json().then((data) => {
        const weather = weather_template.content.cloneNode(true).children[0];
        const weather_city = weather.querySelector("[data-weather-city]");
        const weather_image = weather.querySelector("[data-weather-image]");
        const weather_current = weather.querySelector("[data-weather-current]");
        const weather_temperature = weather.querySelector(
          "[data-weather-temperature]"
        );
        const weather_feels = weather.querySelector("[data-weather-feels]");
        const weather_updated = weather.querySelector("[data-weather-updated]");
        weather_city.textContent = `${data.location.name}`;
        weather_image.src = `https:${data.current.condition.icon}`;
        weather_current.textContent = data.current.condition.text;
        weather_temperature.textContent = `${Math.round(data.current.temp_c)}°`;
        weather_feels.textContent = `Feels Like: ${Math.round(
          data.current.feelslike_c
        )}°`;
        weather_updated.textContent = `Last Updated: ${data.current.last_updated}`;
        weather_container.append(weather);
      })
    );
  });

  fetch(news_url).then((response) =>
    response.json().then((data) => {
      // Adding the "Main News" part If the window width is bigger than 769px.
      if (window.innerWidth > 769) {
        for (var i = 0; i < 4; i++) {
          document.querySelector(`[data-main-image${i}]`).src =
            data.articles[i].image;
          document.querySelector(`[data-main-title${i}]`).href =
            data.articles[i].url;
          document.querySelector(`[data-main-title${i}]`).textContent = `${
            data.articles[i].title.split(" - ")[0]
          }`;
        }
        data.articles.splice(0, 4);
      }
      data.articles.forEach((article) => {
        const news = news_template.content.cloneNode(true).children[0];
        const news_image = news.querySelector("[data-news-image]");
        const news_title = news.querySelector("[data-news-title]");
        const news_description = news.querySelector("[data-news-description]");
        const news_author = news.querySelector("[data-news-author]");
        const news_source = news.querySelector("[data-news-source]");
        const news_date = news.querySelector("[data-news-date]");
        news_image.src = article.image;
        news_title.href = article.url;
        news_title.textContent = `${article.title.split(" - ")[0]}`;
        news_description.textContent = article.description;
        news_author.textContent = article.author
          ? `${article.author.split(",", 2)}, `
          : `${article.source.name}`;
        news_source.textContent = article.author
          ? `from ${article.source.name}`
          : "";
        news_date.textContent = `Date: ${article.publishedAt.slice(0, 10)}`;
        news_container.append(news);
      });
    })
  );
}

// Fetching the searched content and showing it If the user is on search page.
if (document.URL.includes("search.html")) {
  var search_link = localStorage.getItem("search_link");
  if (search_link) {
    fetch(search_link).then((response) =>
      response.json().then((data) => {
        data.articles.forEach((article) => {
          const news = news_template.content.cloneNode(true).children[0];
          const news_image = news.querySelector("[data-news-image]");
          const news_title = news.querySelector("[data-news-title]");
          const news_description = news.querySelector(
            "[data-news-description]"
          );
          const news_author = news.querySelector("[data-news-author]");
          const news_source = news.querySelector("[data-news-source]");
          const news_date = news.querySelector("[data-news-date]");
          news_image.src = article.image;
          news_title.href = article.url;
          news_title.textContent = `${article.title.split(" - ")[0]}`;
          news_description.textContent = article.description;
          news_author.textContent = article.author
            ? `${article.author.split(",", 2)}, `
            : `${article.source.name}`;
          news_source.textContent = article.author
            ? `from ${article.source.name}`
            : "";
          news_date.textContent = `Date: ${article.publishedAt.slice(0, 10)}`;
          news_container.append(news);
        });
      })
    );
  }
}
