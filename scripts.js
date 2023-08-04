const weather_api_key = "e455787a22054869bc9135812231107";
const news_api_key = "63a367487cc34c29955def57d90267d2";
const weather_cities = {
  ip: "auto:ip",
  sp: "-23.533773,-46.625290",
  rj: "-22.908333,-43.196388",
  df: "-15.793889,-47.882778",
};
const news_url = `https://newsapi.org/v2/top-headlines?apiKey=${news_api_key}&country=us&pageSize=14`;
const trending_brazil_url = `https://newsapi.org/v2/top-headlines?apiKey=${news_api_key}&country=br&pageSize=10`;
const market_api_url = `https://economia.awesomeapi.com.br/last/USD-BRL,CAD-BRL,EUR-BRL,GBP-BRL,JPY-BRL,GBP-BRL,CNY-BRL`;
const news_container = document.querySelector("[data-news-container]");
const news_template = document.querySelector("[data-news-template]");
const weather_container = document.querySelector("[data-weather-container]");
const weather_template = document.querySelector("[data-weather-template]");
const market_container = document.querySelector("[data-market-container]");
const market_template = document.querySelector("[data-market-template]");
const search_input = document.querySelector("[data-search]");
const search_button = document.querySelector("[data-search-button]");
const top_button = document.querySelector("[data-top]");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    top_button.style.display = "block";
  } else {
    top_button.style.display = "none";
  }
}

function goTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

search_input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    search_button.click();
  }
});

search_button.addEventListener("click", () => {
  const value = document.querySelector("[data-search]").value;
  if (value) {
    window.location = "search.html";
    localStorage.setItem(
      "search_link",
      `https://newsapi.org/v2/everything?q=${value}&pageSize=10&apiKey=${news_api_key}`
    );
  }
});

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

fetch(market_api_url).then((response) =>
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

if (document.URL.includes("index.html")) {
  Object.values(weather_cities).forEach((location) => {
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
      if (window.innerWidth > 769) {
        for (var i = 0; i < 4; i++) {
          document.querySelector(`[data-main-image${i}]`).src =
            data.articles[i].urlToImage;
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

        news_container.append(news);
      });
    })
  );
}

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

          news_container.append(news);
        });
      })
    );
  }
}

// var portfolioNavigation = document.getElementById("portfolio-navigation");
// var navigation = document.getElementById("nav-links");
// var content = document.getElementById("main-page");
// var showSideBar = false;

// function toggleSidebar() {
//   showSideBar = !showSideBar;
//   if (window.innerWidth < 769 && showSideBar) {
//     navigation.style.marginTop = "0%";
//     navigation.style.animationName = "showSidebar";
//     navigation.style.position = "fixed";
//     portfolioNavigation.style.marginTop = "0px";
//   } else {
//     navigation.style.marginTop = "-500%";
//     navigation.style.animationName = "";
//     portfolioNavigation.style.marginTop = "20px";
//   }
// }

// window.addEventListener("resize", (event) => {
//   if (window.innerWidth > 769 && showSideBar) {
//     toggleSidebar();
//   }
// });

// <nav class="portfolio-navigation" id="portfolio-navigation">
//   <a href="#" class="logo">
//     Eu.eu
//   </a>
//   <button class="hamburguer" onclick="toggleSidebar()">
//     <img src="icons/hamburguer.svg" />
//   </button>
//   <ul class="nav-links" id="nav-links">
//     <button class="close-button" onclick="toggleSidebar()">
//       <img src="icons/x-mark-256.png" />
//     </button>
//     <li>
//       <a href="#about" class="navigation-links" onclick="toggleSidebar()">
//         Sobre
//       </a>
//     </li>
//     <li>
//       <a
//         href="#technologies"
//         class="navigation-links"
//         onclick="toggleSidebar()"
//       >
//         Tecnologias
//       </a>
//     </li>
//     <li>
//       <a href="#projects" class="navigation-links" onclick="toggleSidebar()">
//         Projetos
//       </a>
//     </li>
//     <li>
//       <a href="#contacts" class="navigation-links" onclick="toggleSidebar()">
//         Contato
//       </a>
//     </li>
//   </ul>
//   <div class="navigation-contact">
//     <a href="https://github.com/genilson-alves" target="_blank">
//       <img src="icons/github.svg" />
//     </a>
//     <a href="https://www.linkedin.com/in/genilson-alves0/" target="_blank">
//       <img src="icons/linkedin.svg" />
//     </a>
//   </div>
// </nav>;
