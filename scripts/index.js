const ENDPOINT = "https://www.themealdb.com/api/json/v1/1/random.php";
const ENDPOINTBYID = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
const btnSearch = document.getElementById("btn-search");
const btnFavorite = document.getElementById("btn-favorite");
const idMeal = document.getElementById("id-meal");
const currentMeal = document.getElementById("meal");
const nameMeal = document.getElementById("name-meal");
const categoryMeal = document.getElementById("category-meal");
const ingredientsMeal = document.getElementById("ingredients-meal");
const instructionMeal = document.getElementById("instruction-meal");
const imgMeal = document.getElementById("img-meal");
const loader = document.getElementById("loader");
const favorites = document.getElementById("favorites");
const idsListener = [];
let myMeal;

const keys = Object.keys(localStorage);

const displayFavorite = (id, name) => {
  favorites.innerHTML += `
  <article id="${id}" class="favorite-card"> 
    <h5>${id}<h5/>
    <p>${name}<p/>
  </article>`;
};

keys.forEach((key) => {
  const value = localStorage.getItem(key);
  displayFavorite(key, value); //Recupera las keys y values del localStorage y muestra los favoritos guardados anteriormente
  idsListener.push(key);
  idsListener.forEach((idObject) => {
    //No estoy seguro si esto afecta mucho el rendimiento, pero fue una solución que encontré porque se me "borraban" los listeners, se s
    document.getElementById(idObject).addEventListener("click", () => {
      searchNewMeal(idObject);
    });

  });
 
});

const searchNewMeal = async (id = "no-id") => {
  currentMeal.style.opacity = "100";
  loader.style.display = "block";
  let response;
  if (id !== "no-id") {
    response = await fetch(`${ENDPOINTBYID}${id}`);
  } else {
    response = await fetch(ENDPOINT);
  }
  const json = await response.json();
  myMeal = json.meals[0];
  loader.style.display = "none";
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

  instructionMeal.innerText = myMeal.strInstructions;
  imgMeal.src = myMeal.strMealThumb;
};

const displayIngredients = (ingredients, measures) => {
  ingredientsMeal.innerHTML = "";
  for (let i = 0; i < ingredients.length; i++) {
    ingredientsMeal.innerHTML += `<li>${ingredients[i]}  ${measures[i]}</li>`;
  }
};

const filterKeysIngredients = (object) => {
  let finalIngredients = [];
  let finalValues = [];

  for (let i = 1; i < 21; i++) {
    if (object[`strIngredient${i}`]) {
      finalIngredients.push(object[`strIngredient${i}`]);
      finalValues.push(object[`strMeasure${i}`]);
    }
  }

  displayIngredients(finalIngredients, finalValues);
};

const saveOnLocalAndDisplayIt = (id, name) => {
  if (!localStorage.getItem(id)) {
    localStorage.setItem(id, name);
    displayAllFavorites(id, name);
  }
};

btnFavorite.addEventListener("click", () => {
  saveOnLocalAndDisplayIt(myMeal.idMeal, myMeal.strMeal);
});

const displayAllFavorites = (id, name) => {
  displayFavorite(id, name);
  idsListener.push(id);
  idsListener.forEach((idObject) => {
    //No estoy seguro si esto afecta mucho el rendimiento, pero fue una solución que encontré porque se me "borraban" los listeners, se s
    document.getElementById(idObject).addEventListener("click", () => {
      searchNewMeal(idObject);
    });
  });
};

const addingEventListeners = (id) => {
  idsListener.push(id);
  idsListener.forEach((idObject) => {
    //No estoy seguro si esto afecta mucho el rendimiento, pero fue una solución que encontré porque se me "borraban" los listeners, se s
    document.getElementById(idObject).addEventListener("click", () => {
      searchNewMeal(idObject);
    });
  });
};
