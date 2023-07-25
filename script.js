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
var moeda = `https://economia.awesomeapi.com.br/last/USD-BRL`;

Object.values(locations).forEach((location) => {
  var weather_url = `https://api.weatherapi.com/v1/current.json?key=${weather_key}&q=${location}&lang=pt`;
  fetch(weather_url).then((response) =>
    response.json().then((response) => {
      console.log(response);
      creatingWeather(
        response.location.name,
        response.current.temp_c,
        response.current.condition.text,
        response.current.feelslike_c,
        response.current.condition.icon,
        response.current.last_updated
      );
    })
  );
});

fetch(main_news_url).then((response) =>
  response.json().then((response) => {
    creatingMain(
      response.articles[0],
      response.articles[1],
      response.articles[2],
      response.articles[3]
    );
    response.articles.splice(0, 4);
    response.articles.forEach((article) => {
      creatingNews(
        article.title,
        article.url,
        article.description,
        article.author,
        article.source.name,
        article.publishedAt,
        article.urlToImage
      );
    });
  })
);

fetch(side_news_url).then((response) =>
  response.json().then((response) => {
    response.articles.forEach((article) => {
      creatingSecondaryNews(article.title, article.url);
    });
  })
);

// fetch(moeda).then((response) =>
//   response.json().then((response) => {
//     console.log(response);
//   })
// );

const creatingMain = (col_1, col_2, col_3, col_4) => {
  document.querySelector(".col-1 > img").src = col_1.urlToImage;
  document.querySelector(".col-1 > a").textContent = `${
    col_1.title.split(" - ")[0]
  }`;
  document.querySelector(".col-1 > a").href = col_1.url;
  document.querySelector(".col-3 > img").src = col_2.urlToImage;
  document.querySelector(".col-3 > a").textContent = `${
    col_2.title.split(" - ")[0]
  }`;
  document.querySelector(".col-3 > a").href = col_2.url;
  document.querySelector(".col-4 > img").src = col_3.urlToImage;
  document.querySelector(".col-4 > a").textContent = `${
    col_3.title.split(" - ")[0]
  }`;
  document.querySelector(".col-4 > a").href = col_3.url;
  document.querySelector(".col-5 > img").src = col_4.urlToImage;
  document.querySelector(".col-5 > a").textContent = `${
    col_4.title.split(" - ")[0]
  }`;
  document.querySelector(".col-5 > a").href = col_4.url;
};

const creatingNews = (title, link, detail, author, source, date, image_url) => {
  var news = document.createElement("div");
  var news_image = document.createElement("div");
  var news_img = document.createElement("img");
  var news_information = document.createElement("div");
  var news_information_div1 = document.createElement("div");
  var news_information_div2 = document.createElement("div");
  var news_info_a = document.createElement("a");
  var news_info_p = document.createElement("p");
  var news_detail_span1 = document.createElement("span");
  var news_detail_span2 = document.createElement("span");
  var news_detail_span3 = document.createElement("span");
  var news_detail_span4 = document.createElement("span");

  news.className = "news";
  news_image.className = "news-image";
  news_img.src = image_url
    ? `${image_url}`
    : "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80";
  news_information.className = "news-information";
  news_information_div1.className = "news-info";
  news_information_div2.className = "news-detail";
  news_detail_span1.className = "news-detail-source";

  news_info_a.href = link;
  news_info_a.target = "_blank";
  news_info_a.textContent = `${title.split(" - ")[0]}`;
  news_info_p.textContent = detail;
  news_detail_span3.textContent = author
    ? `${author.split(",", 2)}, `
    : `${source}`;
  news_detail_span4.textContent = author ? `from ${source}` : "";
  news_detail_span2.textContent = `Date: ${date.slice(0, 10)}`;

  document.querySelector(".primary-content").appendChild(news);
  news.appendChild(news_image);
  news_image.appendChild(news_img);
  news.appendChild(news_information);
  news_information_div1.appendChild(news_info_a);
  news_information_div1.appendChild(news_info_p);
  news_information_div2.appendChild(news_detail_span1);
  news_detail_span1.appendChild(news_detail_span3);
  news_detail_span1.appendChild(news_detail_span4);
  news_information_div2.appendChild(news_detail_span2);
  news_information.appendChild(news_information_div1);
  news_information.appendChild(news_information_div2);

  document.querySelector(".news-image").style.height =
    document.querySelector(".news-information").offsetHeight;
};

const creatingSecondaryNews = (title, newsURL) => {
  secondaryNews = document.createElement("a");

  secondaryNews.textContent = `- ${title.split(" - ")[0]}`;
  secondaryNews.href = newsURL;
  secondaryNews.target = "_blank";

  document.querySelector(".secondary-content-info").appendChild(secondaryNews);
};

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
