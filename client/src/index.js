const searchButton = document.querySelector(".search-button");
const inn = document.querySelector(".input-field");
const info = document.querySelector(".company-info");

searchButton.addEventListener("click", () => {
  info.textContent = '';

  fetch("http://localhost:8080/", {
    method: "POST",
    body: JSON.stringify({ inn: inn.value }), //7707083893
    headers: { "Content-Type": "application/json" }

  })
    .then((response) => response.json())
    .then((result) => {
      result.forEach((element, index) => {
        info.textContent += `${index + 1}. ${element} \n`
      });
    })
    .catch((reason) => {
      info.textContent = reason;
    });
});
