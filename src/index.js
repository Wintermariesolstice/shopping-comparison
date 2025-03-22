function displayGrocery(response) {
  console.log("Full API Response:", response.data);

  let groceryContent = response.data.answer;
  console.log("Grocery Content:", groceryContent);

  let groceryElement = document.querySelector("#book");
  groceryElement.innerHTML = "";

  groceryContent = groceryContent.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  groceryContent = groceryContent.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    (match, altText, url) => {
      console.log("Image URL:", url);
      return `
      <img src="${url}" alt="${altText}" style="max-width: 105px;" onerror="this.style.display='none';"/>
      
    `;
    }
  );

  groceryContent = groceryContent.replace(/\n/g, "</br>");
  groceryElement.innerHTML = groceryContent;
}

function generateGrocery(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "2a0btf0ao0fa13fec249490d3e8c2c77";
  let context =
    "You are a grocery shopper in London.Your mission is to give 3 price comparison from Sainsbury, Tesco and Waitrose. Each grocery item must include a picture and a description.(Example quatity) Make sure to only use valid url.Sign off with 'SheCodes AI.' in <strong></strong>.";
  let prompt = `User instructions: Generate 3 price comparison about ${instructionsInput.value}`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let groceryElement = document.querySelector("#grocery");
  groceryElement.classList.remove("hidden");
  groceryElement.innerHTML = `<div class="generating">⏳ Generating price comparison ${instructionsInput.value}</div>`;

  axios
    .get(apiUrl)
    .then(displayGrocery)
    .catch((error) => {
      console.error("Error fetching price comparisons:", error);
      groceryElement.innerHTML =
        "Failed to fetch price comparison. Please try again.";
    });
}

let groceryFormElement = document.querySelector("#grocery-generator-form");
groceryFormElement.addEventListener("submit", generateGrocery);
