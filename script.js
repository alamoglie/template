const search = document.getElementById('search'),
submit = document.getElementById('submit'),
random = document.getElementById('random'),
mealsEl = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
single_mealEl = document.getElementById('single-meal');

// Search Meal and Fetch from API
function searchMeal(e){
    e.preventDefault();

    // Clear Single Meal
    single_mealEl.innerHTML = '';

    // Get search term
    const term = search.value ;

    console.log(term)


    // Check for empty
    if(term.trim()){
        fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            resultHeading.innerHTML = `<h3>Search Results for "${term}":  
            </h3>`
            if(data.meals === null){
                resultHeading.innerHTML = `<h4>There are no search results for "${term}"</h4>`
            }else{
                mealsEl.innerHTML = data.meals.map(meal =>
                    `<div class="meal" id="meal">
                        <img src="${meal.strMealThumb
                        }" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>`
                    )
                    .join('')
                
            }
        })

        //Clear search text
        search.value = ''
      
    } else {
        alert('Please enter a search term')
    }

}




// Event Listeners
submit.addEventListener('submit', searchMeal);



mealsEl.addEventListener('click', event => {
    const mealInfo = event.path.find(item =>{
        if(item.classList){
            return item.classList.contains('meal-info');

        } else{
            return false
        }
    });

    console.log(mealInfo)
    });

