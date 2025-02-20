class Home {
    constructor() {
        this.home = document.querySelector(".card_section")
        this.tagsContainer = document.querySelector(".tags_container"); // Create a container in HTML
        this.dataApi = new RecipeApi("./data/recipes.json");
        this.recipeData = []
        this.recipeFiltered = []
        this.selectedTags = [];
        this.filters = {
            "ingredients": [],
            "appliances": [],
            "ustensils": []
        }
        this.ingredientsDropdown = new Dropdown('ingredients',[])
        this.appliancesDropdown = new Dropdown('appliances', [])
        this.ustensilsDropdown = new Dropdown('ustensils', [])
        this.searchValue = ""
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
        this.searchValue = value.toLowerCase()
        if (this.searchValue.length >= 3) {
            this.createTag(this.searchValue, "search");
            this.search(); // Déclencher la recherche
        }
    }

    createTag(value, type) {
        if (!this.selectedTags.some(tag => tag.value === value)) {
            this.selectedTags.push({ value, type });
            this.filters[type].push(value.toLowerCase());

            // Create tag element
            const tag = document.createElement("div");
            tag.classList.add("tag");
            tag.innerHTML = `${value} <span class="remove-tag" data-value="${value}" data-type="${type}">×</span>`;
            
            // Append to tag container
            this.tagsContainer.appendChild(tag);

            // Add event listener to remove tag
            tag.querySelector(".remove-tag").addEventListener("click", (event) => {
                const tagValue = event.target.getAttribute("data-value");
                const tagType = event.target.getAttribute("data-type");
                this.removeTag(tagValue, tagType);
            });

            // Trigger search after adding a tag
            this.search();
        }
    }

    // Remove Tags
    removeTag(value, type) {
        // Remove from selected tags array
        this.selectedTags = this.selectedTags.filter(tag => tag.value !== value);
        this.filters[type] = this.filters[type].filter(filterValue => filterValue !== value.toLowerCase());

        // Remove from UI
        document.querySelector(`.remove-tag[data-value="${value}"]`).parentElement.remove();

        // Trigger search after removing a tag
        this.search();
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

    addDropdownListeners() {
        document.querySelectorAll(".dropdown-item").forEach(item => {
            item.addEventListener("click", (event) => {
                const type = event.target.getAttribute("data-type"); // 'ingredients', 'appliances', 'ustensils'
                const value = event.target.textContent.trim();
                this.createTag(value, type);
            });
        });
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

            //on parcours les ingredients
            // for (let index = 0; index < recipe.ingredients.length; index++) {
            //     const ingredient = recipe.ingredients[index]; 
            //     if(ingredient.ingredient.toLowerCase().includes(value.toLowerCase())) {
            //         if(already == false) {
            //             this.recipeFiltered.push(recipe)
            //             already = true
            //         }
            //     }
            // }
        }
        console.log(this.recipeFiltered)
        this.refreshDropdowns()
        this.refreshRecipes(this.recipeFiltered)
    }
}

const home = new Home();
  home.main();