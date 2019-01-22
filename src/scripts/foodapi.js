let html = "";
const makeFoodHtml = (food) => {
    html += `<section class="food">
    <h1>${food.name}</h1>
     <p>${food.category}</p>
     <p>${food.ethnicity}</p>
     <p>${food.countryOfOrigin}</p>
     <p>${food.fatPerServing}</p>
     <p>${food.sugarPerServing}</p>
     </section>
     `

}




fetch("http://localhost:8088/foods")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    food.ingredients = productInfo.product.ingredients

                    
                    food.countryOfOrigin = productInfo.product.countries_tags
                    
                    // food.caloriesPerServing = 
                    food.fatPerServing = productInfo.product.nutriments.fat_serving
                    console.log(food.fatPerServing);
                    food.sugarPerServing = productInfo.product.nutriments.sugars_serving
                    
                    console.log("here");
                    makeFoodHtml(food);
                    let element = document.querySelector(".foodList");
                element.innerHTML = html;
                })
                

        });
       


    })





