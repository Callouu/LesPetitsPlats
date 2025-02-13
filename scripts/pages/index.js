class Home {
    constructor() {
        this.home = document.querySelector(".card_section")
        this.dataApi = new RecipeApi("./data/recipes.json");
        this.recipeData = []
        this.recipeFiltered = []
    }

    async main() {
        const recipeData = await this.dataApi.getAllRecipes();
        // Affiche l'intégralité du tableau
        this.recipeData = recipeData.map(recipe => new Recipe(recipe))
        this.recipeFiltered = this.recipeData
        this.recipeData.forEach(recipe => {
            const templateRecipe = new RecipeCard(recipe)
            this.home.append(templateRecipe.createRecipeCard())
        })
    }

    search(value) {
        this.recipeFiltered = []
        for (let index = 0; index < this.recipeData.length; index++) {
            const recipe = this.recipeData[index];
            let already = false
            if(recipe.name.toLowerCase().includes(value.toLowerCase())) {
                this.recipeFiltered.push(recipe)
                already = true
            }
            for (let index = 0; index < recipe.ingredients.length; index++) {
                const ingredient = recipe.ingredients[index];
                if(ingredient.ingredient.toLowerCase().includes(value.toLowerCase())) {
                    if(already == false) {
                        this.recipeFiltered.push(recipe)
                        already = true
                    }
                }
            }
        }
        console.log(this.recipeFiltered)
    }
}

const home = new Home();
  home.main();