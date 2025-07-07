const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const resultItemsEl = document.getElementById("result-items");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let page = 1;

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1; // Reset page on new search
  fetchImages();
});

async function fetchImages() {
  const token = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw"; // Replace with your token if needed
  const query = inputEl.value.trim();

  if (!query) return;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${token}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      resultItemsEl.innerHTML = "";
    }

    if (data.results.length === 0 && page === 1) {
      resultItemsEl.innerHTML = "<p>No results found.</p>";
      loadMoreBtn.style.display = "none";
      return;
    }

    data.results.forEach((item) => {
      const imgUrl = item.urls.small;
      const description = item.alt_description || "No description";
      const originUrl = item.links.html;

      const resultItemEl = document.createElement("div");
      resultItemEl.classList.add("result-item");

      const imgEl = document.createElement("img");
      imgEl.classList.add("image");
      imgEl.setAttribute("src", imgUrl);
      imgEl.setAttribute("alt", description);

      const aEl = document.createElement("a");
      aEl.classList.add("description");
      aEl.innerText = description;
      aEl.setAttribute("href", originUrl);
      aEl.setAttribute("target", "_blank");

      resultItemEl.append(imgEl, aEl);
      resultItemsEl.append(resultItemEl);
    });

    loadMoreBtn.style.display = "block";
  } catch (error) {
    console.error("Error fetching images:", error);
    alert("Sorry, something went wrong.");
  }
}

loadMoreBtn.addEventListener("click", () => {
  page++;
  fetchImages();
});
