const ENDPOINT = "https://www.themealdb.com/api/json/v1/1/random.php";
const btnSearch = document.getElementById("btn-search");
const idMeal = document.getElementById("id-meal");
const nameMeal = document.getElementById("name-meal");
const categoryMeal = document.getElementById("category-meal");
const ingredientsMeal = document.getElementById("ingredients-meal");
const instructionMeal = document.getElementById("instruction-meal");
const imgMeal = document.getElementById("img-meal");

let myMeal;

const searchNewMeal = async () => {
  const response = await fetch(ENDPOINT);
  const json = await response.json();
  myMeal = json.meals[0];
  console.log(myMeal);
  changeValuesOnScreen();
  filterKeysIngredients(myMeal);
};

btnSearch.addEventListener("click", () => {
  searchNewMeal();
});

const changeValuesOnScreen = () => {
  idMeal.innerText = myMeal.idMeal;
  nameMeal.innerText = myMeal.strMeal;
  categoryMeal.innerText = myMeal.strCategory;
  ingredientsMeal.innerText = myMeal.strMeal;
  instructionMeal.innerText = myMeal.strInstructions;
  imgMeal.src = myMeal.strMealThumb;
};

const filterKeysIngredients = (object) => {

  finalIngredients = []
  finalValues = []

  arrayIngredients = [
    "strIngredient1",
    "strIngredient2",
    "strIngredient3",
    "strIngredient4",
    "strIngredient5",
    "strIngredient6",
    "strIngredient7",
    "strIngredient8",
    "strIngredient9",
    "strIngredient10",
    "strIngredient11",
    "strIngredient12",
    "strIngredient13",
    "strIngredient14",
    "strIngredient15",
    "strIngredient16",
    "strIngredient17",
    "strIngredient18",
    "strIngredient19",
    "strIngredient20",
  ];
  for (let i = 0; i < arrayIngredients.length; i++) {
    if (object[arrayIngredients[i]]) {
      finalIngredients.push(object[arrayIngredients[i]]);
      
    }
  }


};
