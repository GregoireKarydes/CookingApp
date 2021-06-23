// API 
const result = document.getElementById('result');
const urlAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const form = document.querySelector('form');
const input = document.querySelector('input');



let meals =[];

async function fetchMeals (search) { 
    
   await fetch(urlAPI + search).then(res => res.json())
    .then(data => meals = data.meals);


 }

 form.addEventListener('submit', (e) => {
     e.preventDefault();
     mealsDisplay();
 })

fetchMeals();

function mealsDisplay () {
    if(meals ===null) {
        result.innerHTML = "<h2>Aucun résultat</h2>"
    } else {
        
        meals.length =12;
        console.log(meals);
     
        result.innerHTML = meals.map(
             (meal) => {

                let ingredients = [];

                for(let i =1; i< 21;i++) {
                    if(meal[`strIngredient${i}`]) {
                        let ingredient = meal[`strIngredient${i}`];
                        let mesure = meal[`strMeasure${i}`]

                        ingredients.push("<li>" + ingredient + " - " + mesure +"</li>");
                    }
                }

                console.log(ingredients)
                
                 
                return `<li class=card>
                 <h2> ${meal.strMeal}</h2>
                 <p> ${meal.strArea} </p>
                 <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
                 <ul>
                    ${ingredients.join("")}
                 
                 </ul>
                 </li>`
                 
                }
                 
             ).join("");
    }
        
    };

    input.addEventListener('input', (e) => {
        fetchMeals(e.target.value).then(() => {
            mealsDisplay();
        });
    }) 
   

