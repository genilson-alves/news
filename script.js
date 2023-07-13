var url =
  "https://newsapi.org/v2/top-headlines?" +
  "country=us&" +
  "sortBy=popularity&" +
  "apiKey=63a367487cc34c29955def57d90267d2";

fetch(url).then((response) =>
  response.json().then((response) => {
    response.articles.forEach((article) => {
      creatingContent(article.author, article.title, article.urlToImage);
      console.log(article);
    });
  })
);

const creatingContent = (author, title, image_url) => {
  var news = document.createElement("div");
  var news_image = document.createElement("div");
  var news_img = document.createElement("img");
  var news_information = document.createElement("div");
  var news_information_h3 = document.createElement("h3");
  var news_information_p = document.createElement("p");

  news.className = "news";
  news_image.className = "news-image";
  news_img.src = image_url;
  news_information.className = "news-information";
  news_information_h3.textContent = title;
  news_information_p.textContent = author;

  document.querySelector(".primary-content").appendChild(news);
  news.appendChild(news_image);
  news_image.appendChild(news_img);
  news.appendChild(news_information);
  news_information.appendChild(news_information_h3);
  news_information.appendChild(news_information_p);
};
