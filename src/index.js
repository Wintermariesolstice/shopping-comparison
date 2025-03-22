function displayRestaurant(response) {
  console.log("Full API Response:", response.data);

  let restaurantContent = response.data.answer;
  console.log("Restaurant Content:", restaurantContent);

  let restaurantElement = document.querySelector("#restaurant");
  restaurantElement.innerHTML = "";

  restaurantContent = restaurantContent.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );
  restaurantContent = restaurantContent.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    (match, altText, url) => {
      console.log("Image URL:", url);
      return `
      <img src="${url}" alt="${altText}" style="max-width: 105px;" onerror="this.style.display='none';"/>
      
    `;
    }
  );

  restaurantContent = restaurantContent.replace(/\n/g, "</br>");
  restaurantElement.innerHTML = restaurantContent;
}

function generateRestaurant(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "2a0btf0ao0fa13fec249490d3e8c2c77";
  let context =
    "You enjoy eating out in London. Your mission is to give 3 best restaurants from the Michelin guide. Each restaurant must include a description and address with phone number or website. Sign off with 'SheCodes AI.' in <strong></strong>.";
  let prompt = `User instructions: Generate 3 restaurant based on the type of cuisine ${instructionsInput.value}`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let restaurantElement = document.querySelector("#restaurant");
  restaurantElement.classList.remove("hidden");
  restaurantElement.innerHTML = `<div class="generating">⏳ Generating restaurant information ${instructionsInput.value}</div>`;

  axios
    .get(apiUrl)
    .then(displayRestaurant)
    .catch((error) => {
      console.error("Error fetching restaurant information:", error);
      restaurantElement.innerHTML =
        "Failed to fetch restaurant information. Please try again.";
    });
}

let restaurantFormElement = document.querySelector(
  "#restaurant-generator-form"
);
restaurantFormElement.addEventListener("submit", generateRestaurant);
