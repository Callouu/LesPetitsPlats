class Home {
    constructor() {
        this.home = document.querySelector(".card_section")
        this.dataApi = new RecipeApi("./data/recipes.json");
        this.recipeData = []
        this.recipeFiltered = []
        this.ingredientsDropdown = new Dropdown('ingredients',[])
        this.appliancesDropdown = new Dropdown('appliances', [])
        this.ustensilsDropdown = new Dropdown('ustensils', [])
    }

    async main() {
        const recipeData = await this.dataApi.getAllRecipes();
        // Affiche l'intégralité du tableau
        this.recipeData = recipeData.map(recipe => new Recipe(recipe))
        this.recipeFiltered = this.recipeData
        this.refreshRecipes(this.recipeFiltered)
        this.refreshDropdowns()
        // Affiche les dropdowns
        // dropdown ingredient
    }
    // Affichage dynamique des recettes
    refreshRecipes(recipes) {
        this.home.innerHTML=''
        recipes.forEach(recipe => {
            const templateRecipe = new RecipeCard(recipe)
            this.home.append(templateRecipe.createRecipeCard())
        })
    }
    // Affichage dynamique des filtres
    refreshDropdowns() {
        let dropdownData = this.processDropdowns(this.recipeFiltered)
        // dropdown Ingrédients
        this.ingredientsDropdown.elements = dropdownData.ingredients
        this.ingredientsDropdown.showElements()
        // dropdown appliances
        this.appliancesDropdown.elements = dropdownData.appliances
        this.appliancesDropdown.showElements()
        // dropdown ustensils
        this.ustensilsDropdown.elements = dropdownData.ustensils
        this.ustensilsDropdown.showElements()
    }
    // Affiche la listes des filtres
    processDropdowns(recipes) {
        let data = {
            "ingredients": [],
            "appliances": [],
            "ustensils": []
        }
        let ustensils = []
        for (let index = 0; index < recipes.length; index++) {
            const recipe = recipes[index]
            // process ingredients json array
            recipe.ingredients.forEach(ingredient => {
                if(!data.ingredients.includes(ingredient)) {
                    data.ingredients.push(ingredient.ingredient)
                }
            });
            // process appliance single string 
            if(!data.appliances.includes(recipe.appliance)) {
                data.appliances.push(recipe.appliance)
            }
            // process ustensils classic array
            recipe.ustensils.forEach(ustensil => {
                if(!data.ustensils.includes(ustensil)) { 
                    data.ustensils.push(ustensil)
                }
            });
        }
        return data
    }
    // Recherche via la barre de recherche
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
        this.refreshDropdowns()
        this.refreshRecipes(this.recipeFiltered)
    }
}

const home = new Home();
  home.main();