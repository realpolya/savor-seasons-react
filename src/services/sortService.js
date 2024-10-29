
/* --------------------------------Functions--------------------------------*/

const sortRecipes = (sortValue, recipes) => {

    let sorted;

    if (sortValue === 'rating') {

        // calculate ratings for each recipe
        sorted = recipes.map(recipe => {

            let rating = recipe.reviews.reduce((arg, review) => {
                return arg += review.rating
            }, 0);

            if (rating > 0) rating = rating / recipe.reviews.length; 

            recipe.rating = rating;

            return recipe;

        }).sort((a, b) => b.rating - a.rating);

    } else if (sortValue === 'prepTime') {

        sorted = recipes.sort((a, b) => a.prepTime - b.prepTime);

    }

    return sorted;

}

const searchRecipes = (searchValue, recipes) => {

    let searched = recipes.filter(recipe => {
        return (recipe.name.toLowerCase().includes(searchValue.toLowerCase())
                || recipe.author.username.toLowerCase().includes(searchValue.toLowerCase())
                || recipe.description.toLowerCase().includes(searchValue.toLowerCase())
                || recipe.holiday.toLowerCase().includes(searchValue.toLowerCase()));
    });

    return searched;
}


/* --------------------------------Exports--------------------------------*/

export { sortRecipes, searchRecipes };