const weather_key = "e455787a22054869bc9135812231107";
const news_key = "63a367487cc34c29955def57d90267d2";
const locations = {
  ip: "auto:ip",
  sp: "-23.533773,-46.625290",
  rj: "-22.908333,-43.196388",
  bra: "-15.793889,-47.882778",
};
var side_news_url = `https://newsapi.org/v2/top-headlines?apiKey=${news_key}&country=br&pageSize=10`;
var main_news_url = `https://newsapi.org/v2/top-headlines?apiKey=${news_key}&country=us&pageSize=14`;
var moeda = `https://economia.awesomeapi.com.br/last/USD-BRL,CAD-BRL,EUR-BRL,GBP-BRL,JPY-BRL,GBP-BRL,CNY-BRL`;

const newsTemplate = document.querySelector("[data-news-template]");
const newsContainer = document.querySelector("[data-news-container]");

const weather_container = document.querySelector("[data-weather-container]");
const weather_template = document.querySelector("[data-weather-template]");

Object.values(locations).forEach((location) => {
  var weather_url = `https://api.weatherapi.com/v1/current.json?key=${weather_key}&q=${location}&lang=pt`;
  fetch(weather_url).then((response) =>
    response.json().then((data) => {
      const weather = weather_template.content.cloneNode(true).children[0];
      const weather_city = weather.querySelector("[data-weather-city]");
      const weather_image = weather.querySelector("[data-weather-city]");
      const weather_current = weather.querySelector("[data-weather-current]");
      const weather_temperature = weather.querySelector(
        "[data-weather-temperature]"
      );
      const weather_feels = weather.querySelector("[data-weather-feels]");
      const weather_updated = weather.querySelector("[data-weather-updatd]");
    })
  );
});

fetch(main_news_url).then((response) =>
  response.json().then((data) => {
    data.articles.forEach((article) => {
      const news = newsTemplate.content.cloneNode(true).children[0];
      const news_image = news.querySelector("[data-news-image]");
      const news_title = news.querySelector("[data-news-title]");
      const news_description = news.querySelector("[data-news-description]");
      const news_author = news.querySelector("[data-news-author]");
      const news_source = news.querySelector("[data-news-source]");
      const news_date = news.querySelector("[data-news-date]");

      news_image.src = article.urlToImage;
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

      newsContainer.append(news);
    });
  })
);

// fetch(side_news_url).then((response) =>
//   response.json().then((data) => {
//     data.articles.forEach((article) => {
//       creatingSecondaryNews(article.title, article.url);
//     });
//   })
// );

// fetch(moeda).then((response) =>
//   response.json().then((data) => {
//     Object.values(data).forEach((coin) => {
//       creatingMarket(coin.name, coin.ask, coin.create_date);
//     });
//   })
// );

// const creatingMarket = (code, ask, updated) => {
//   const tr = document.createElement("tr");
//   const td_1 = document.createElement("td");
//   const td_2 = document.createElement("td");
//   const td_3 = document.createElement("td");

//   tr.appendChild(td_1);
//   tr.appendChild(td_2);
//   tr.appendChild(td_3);

//   td_1.textContent = `${code.split("/")[0]}`;
//   td_2.textContent = `R$${ask.slice(0, 4)}`;
//   td_3.textContent = updated.slice(10);

//   document.querySelector(".coin-table").appendChild(tr);
// };

// const creatingMain = (col_1, col_2, col_3, col_4) => {
//   document.querySelector(".col-1 > img").src = col_1.urlToImage;
//   document.querySelector(".col-1 > a").textContent = `${
//     col_1.title.split(" - ")[0]
//   }`;
//   document.querySelector(".col-1 > a").href = col_1.url;
//   document.querySelector(".col-3 > img").src = col_2.urlToImage;
//   document.querySelector(".col-3 > a").textContent = `${
//     col_2.title.split(" - ")[0]
//   }`;
//   document.querySelector(".col-3 > a").href = col_2.url;
//   document.querySelector(".col-4 > img").src = col_3.urlToImage;
//   document.querySelector(".col-4 > a").textContent = `${
//     col_3.title.split(" - ")[0]
//   }`;
//   document.querySelector(".col-4 > a").href = col_3.url;
//   document.querySelector(".col-5 > img").src = col_4.urlToImage;
//   document.querySelector(".col-5 > a").textContent = `${
//     col_4.title.split(" - ")[0]
//   }`;
//   document.querySelector(".col-5 > a").href = col_4.url;
// };

// const creatingSecondaryNews = (title, newsURL) => {
//   secondaryNews = document.createElement("a");

//   secondaryNews.textContent = `- ${title.split(" - ")[0]}`;
//   secondaryNews.href = newsURL;
//   secondaryNews.target = "_blank";

//   document.querySelector(".secondary-content-info").appendChild(secondaryNews);
// };

const creatingWeather = (
  city,
  temperature,
  condition,
  feels_like,
  weather_image_url,
  last_updated
) => {
  var weather_div = document.createElement("div");
  var weather_city = document.createElement("div");
  var weather_info = document.createElement("div");
  var weather_icon = document.createElement("div");
  var weather_icon_image = document.createElement("img");
  var weather_icon_span = document.createElement("span");
  var weather_temp = document.createElement("div");
  var weather_temp_span_temp = document.createElement("span");
  var weather_temp_span_feels = document.createElement("span");
  var weather_last_updated = document.createElement("div");

  weather_city.className = "city";
  weather_info.className = "weather-info";
  weather_icon.className = "weather-icon";
  weather_temp.className = "weather-temp";
  weather_temp_span_temp.className = "temp";
  weather_temp_span_feels.className = "feels-like";
  weather_last_updated.className = "last-updated";

  weather_city.textContent = `${city}`;
  weather_icon_image.src = `https:${weather_image_url}`;
  weather_icon_span.textContent = condition;
  weather_temp_span_temp.textContent = `${Math.round(temperature)}°`;
  weather_temp_span_feels.textContent = `Feels Like: ${Math.round(
    feels_like
  )}°`;
  weather_last_updated.textContent = `Last Updated: ${last_updated}`;

  weather_icon.appendChild(weather_icon_image);
  weather_icon.appendChild(weather_icon_span);
  weather_temp.appendChild(weather_temp_span_temp);
  weather_temp.appendChild(weather_temp_span_feels);
  weather_info.appendChild(weather_icon);
  weather_info.appendChild(weather_temp);
  weather_div.appendChild(weather_city);
  weather_div.appendChild(weather_info);
  weather_div.appendChild(weather_last_updated);
  document.querySelector(".weather").appendChild(weather_div);
};
