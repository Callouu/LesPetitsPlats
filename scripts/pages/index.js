class Home {
    constructor() {
        this.home = document.querySelector(".card_section")
        this.dataApi = new RecipeApi("./data/recipes.json");
        this.recipeData = []
        this.recipeFiltered = []
        this.filters = {
            "ingredients": [],
            "appliances": [],
            "ustensils": []
        }
        this.ingredientsDropdown = new Dropdown('ingredients', [])
        this.appliancesDropdown = new Dropdown('appliances', [])
        this.ustensilsDropdown = new Dropdown('ustensils', [])
        this.searchValue = ""
        this.searchButton = document.getElementById("searchBtn")
        this.searchButton.addEventListener("click", () => this.handleSearchButton())
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

    //valeur de la searchBar
    changeSearchValue(value) {
        this.searchValue = value.toLowerCase();
        this.search(); // Déclencher la recherche à chaque modification de la barre de recherche
    }

    handleSearchButton() {
        console.log(this.searchValue)
        const newTag = new Tag(this.searchValue)
        newTag.createTag()
        this.search()
        this.resetSearch()
    }

    resetSearch() {
        this.searchValue = "";
        document.getElementById("search-recipe").value = "";
    }

    // Affichage dynamique des recettes
    refreshRecipes(recipes) {
        this.home.innerHTML = ''
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
        for (let index = 0; index < recipes.length; index++) {
            const recipe = recipes[index]
            // process ingredients json array
            recipe.ingredients.forEach(ingredient => {
                if (!data.ingredients.includes(ingredient)) {
                    data.ingredients.push(ingredient.ingredient)
                }
            });
            // process appliance single string 
            if (!data.appliances.includes(recipe.appliance)) {
                data.appliances.push(recipe.appliance)
            }
            // process ustensils classic array
            recipe.ustensils.forEach(ustensil => {
                if (!data.ustensils.includes(ustensil)) {
                    data.ustensils.push(ustensil)
                }
            });
        }
        return data
    }

    // Recherche les recettes
    search() {
        this.recipeFiltered = []
        // on parcours les recettes
        for (let index = 0; index < this.recipeData.length; index++) {
            const recipe = this.recipeData[index];
            const matchesIngredients = isSubset(this.filters.ingredients, recipe.ingredients.map(item => item.ingredient));
            const matchesAppliances = this.filters.appliances.length === 0 || this.filters.appliances.includes(recipe.appliance);
            const matchesUstensils = isSubset(this.filters.ustensils, recipe.ustensils);

            const matchesSearchValue = this.searchValue
                ? recipe.name.toLowerCase().includes(this.searchValue) ||
                recipe.description.toLowerCase().includes(this.searchValue) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(this.searchValue))
                : true;

            // let already = false
            // if(recipe.name.toLowerCase().includes(this.searchValue.toLowerCase())) {
            //      this.recipeFiltered.push(recipe)
            //      //already = true
            //  }

            // Si les ingredients sont trouvés dans notre recette alors j'affiche la recette
            if (matchesIngredients && matchesAppliances && matchesUstensils && matchesSearchValue) {
                this.recipeFiltered.push(recipe)
            }
        }

        // Si aucune recette n'est trouvé, alors on affiche une erreur
        if(this.recipeFiltered.length === 0) {
            console.log("erreur")
        }
        
        console.log(this.recipeFiltered)
        this.refreshDropdowns()
        this.refreshRecipes(this.recipeFiltered)
    }
}

const home = new Home();
home.main();