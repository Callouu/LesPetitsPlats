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
    }

    // Actualise la recherche après 3 caractères ou si l'input est vide
    changeSearchValue(value) {
        this.searchValue = value.toLowerCase()
        if (this.searchValue.length >= 3 || this.searchValue.length === 0) {
            this.search();
        }
    }

    // Affichage visuel du nombre de recettes
    recipeCount(value) {
        document.querySelector(".recipes_count").textContent = `${value.length} recettes`
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
        const data = {
            "ingredients": new Set(),
            "appliances": new Set(),
            "ustensils": new Set()
        }
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => data.ingredients.add(ingredient.ingredient));
            data.appliances.add(recipe.appliance);
            recipe.ustensils.forEach(ustensil => data.ustensils.add(ustensil));
        });
        return {
            "ingredients": Array.from(data.ingredients),
            "appliances": Array.from(data.appliances),
            "ustensils": Array.from(data.ustensils)
        }
    }

    // Recherche les recettes
    search() {
        // On reinitialise le tableau recipeFiltered
        this.recipeFiltered = this.recipeData.filter(recipe => {
            const matchesIngredients = isCompare(this.filters.ingredients, recipe.ingredients.map(item => item.ingredient));
            const matchesAppliances = this.filters.appliances.length === 0 || this.filters.appliances.includes(recipe.appliance);
            const matchesUstensils = isCompare(this.filters.ustensils, recipe.ustensils);

            const matchesSearchValue = this.searchValue
                ? recipe.name.toLowerCase().includes(this.searchValue) ||
                recipe.description.toLowerCase().includes(this.searchValue) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(this.searchValue))
                : true;

            // Si les ingredients sont trouvés dans notre recette alors j'affiche la recette
            return matchesIngredients && matchesAppliances && matchesUstensils && matchesSearchValue;
        });

        // Si aucune recette n'est trouvé, alors on affiche une erreur
        if (this.recipeFiltered.length === 0) {
            // va verifier si le container norecipe est deja crée pour ne pas la creer une deuxieme fois
            if (!document.querySelector(".no-recipe")) {
                const main = document.querySelector("main")
                const noRecipeContainer = document.createElement("span")
                noRecipeContainer.classList.add("flex", "justify-center", "font-manrope", "text-2xl")
                noRecipeContainer.textContent = `Aucune recette ne contient ${this.searchValue}`
                noRecipeContainer.classList.add("no-recipe")
                main.append(noRecipeContainer)
                this.home.classList.add("hidden")
            }
        } else {
            const errorAlreadyExist = document.querySelector(".no-recipe")
            if (errorAlreadyExist) {
                errorAlreadyExist.remove()
                this.home.classList.remove("hidden")
            }
        }
        this.refreshDropdowns()
        this.refreshRecipes(this.recipeFiltered)
        this.recipeCount(this.recipeFiltered)
    }
}

const home = new Home();
home.main();