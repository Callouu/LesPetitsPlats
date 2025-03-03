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
        this.recipeCount(this.recipeFiltered)
        // Affiche les dropdowns
        // dropdown ingredient
    }

    // Actualise la recherche après 3 caractères ou si l'input est vide
    changeSearchValue(value) {
        this.searchValue = value.toLowerCase()
        if (this.searchValue.length >= 3 || this.searchValue.length === 0) {
            this.search();
        }
    }

    recipeCount(value) {
        const countElement = document.querySelector(".recipes_count")
        countElement.textContent = `${value.length} recettes`
    }

    // Ajout d'un Tag après avoir cliqué sur le bouton de recherche et actualisation de la recherche
    handleSearchButton() {
        console.log(this.searchValue)
        const newTag = new Tag(this.searchValue)
        newTag.createTag()
        this.search()
        this.resetSearch()
    }

    // Supprime le contenu de la searchBar après avoir lancer la recherche
    resetSearch() {
        this.searchValue = "";
        document.getElementById("search-recipe").value = "";
    }

    // Supprime le tag et la valeur dans le this.filters pour afficher les recettes correspondantes
    removeTag(value) {
        document.querySelector(`.fa-xmark[data-value="${value}"]`).parentElement.remove();
        for (let key in this.filters) {
            this.filters[key] = this.filters[key].filter(item => item !== value);
        }
        this.search()
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
        this.ingredientsDropdown.updateElements()
        // dropdown appliances
        this.appliancesDropdown.elements = dropdownData.appliances
        this.appliancesDropdown.updateElements()
        // dropdown ustensils
        this.ustensilsDropdown.elements = dropdownData.ustensils
        this.ustensilsDropdown.updateElements()
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
        // On reinitialise le tableau recipeFiltered
        this.recipeFiltered = []
        // on parcours les recettes
        for (let index = 0; index < this.recipeData.length; index++) {
            const recipe = this.recipeData[index];
            const matchesIngredients = isCompare(this.filters.ingredients, recipe.ingredients.map(item => item.ingredient));
            const matchesAppliances = this.filters.appliances.length === 0 || this.filters.appliances.includes(recipe.appliance);
            const matchesUstensils = isCompare(this.filters.ustensils, recipe.ustensils);

            const matchesSearchValue = this.searchValue
                ? recipe.name.toLowerCase().includes(this.searchValue) ||
                recipe.description.toLowerCase().includes(this.searchValue) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(this.searchValue))
                : true;

            // Si les ingredients sont trouvés dans notre recette alors j'affiche la recette
            if (matchesIngredients && matchesAppliances && matchesUstensils && matchesSearchValue) {
                this.recipeFiltered.push(recipe)
            }
        }
        // fonction filtre
        // Si aucune recette n'est trouvé, alors on affiche une erreur
        if(this.recipeFiltered.length === 0) {
            console.log("erreur")
            
        }
        
        console.log(this.recipeFiltered)
        this.refreshDropdowns()
        this.refreshRecipes(this.recipeFiltered)
        this.recipeCount(this.recipeFiltered)
        //this.isFiltered = true;
    }
}

const home = new Home();
home.main();