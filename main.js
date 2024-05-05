document.addEventListener("DOMContentLoaded", function () {
  // Select all radio inputs and attach an event listener to them
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", fetchData);
  });

  // Initial fetch with default values or checked values
  fetchData();
});

function fetchData() {
  // Get the selected sortBy value
  const sortBy =
    document.querySelector('input[name="sortBy"]:checked')?.value || "viewed";
  // Get the selected timeFrame value
  const timeFrame =
    document.querySelector('input[name="timeFrame"]:checked')?.value || "1";

  const url = `https://api.nytimes.com/svc/mostpopular/v2/${sortBy}/${timeFrame}.json?api-key=hq8UvsE7d5E45IbmtT2XKu8jkpDHV31t`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.results) {
        const postsContainer = document.querySelector(".posts");
        postsContainer.innerHTML = ""; // Clear previous posts
        counter = 1;
        data.results.slice(0, 5).forEach((article) => {
          let articleImg = "";
          if (
            article.media &&
            article.media.length > 0 &&
            article.media[0]["media-metadata"] &&
            article.media[0]["media-metadata"].length > 0
          ) {
            articleImg = article.media[0]["media-metadata"][0].url;
          }
          const postHTML = `
                    <div class="post">
                        <div class="articleHeader">
                            <div class="articleTitle">${counter}) ${article.title}</div>
                            <div class="articleDate">${article.published_date}</div>
                        </div>
                        <div style="display:flex; align-items: center; margin-left: 10px; margin-right: 10px;">
                            <div class="articleImg"><img src="${articleImg}" alt="Article Image"></div>
                            <div class="articleAbstract">${article.abstract}</div>
                        </div>
                    </div>
                `;

          postsContainer.insertAdjacentHTML("beforeend", postHTML);
          counter++;
        });
      }
    })
    .catch((error) => console.log("Error:", error));
}
