class Home {
    constructor() {
        this.home = document.querySelector(".card_section")
        this.dataApi = new RecipeApi("./data/recipes.json");
    }

    async main() {
        const recipeData = await this.dataApi.getAllRecipes();
        recipeData.map(recipe => new Recipe(recipe))
        .forEach(recipe => {
            const templateRecipe = new RecipeCard(recipe)
            this.home.append(templateRecipe.createRecipeCard())
        })
    }
}

const home = new Home();
  home.main();