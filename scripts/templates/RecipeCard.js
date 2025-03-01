class RecipeCard {
    constructor(data) {
        this.data = data
    }

    createRecipeCard() {
        const article = document.createElement("article")
        article.classList.add("recipe_cards")
        article.classList.add("relative", "h-[600px]", "max-w-[400px]", "overflow-hidden", "bg-white", "rounded-[10px]")
        article.setAttribute('data-id', `${this.data.id}`)

        // Affiche notre donnée data.time en heures/minutes
        let timer;
        if (this.data.time >= 60) {
            const hours = Math.floor(this.data.time / 60);
            const minutes = this.data.time % 60;
            timer = `${hours}h ${minutes}min`;
        } else {
            timer = `${this.data.time}min`;
        }

        const recipeCard = `
        <p class="timer">${timer}</p>
        <img src="./assets/images/${this.data.image}" alt="${this.data.name}">
        <div class="card_infos">
            <h2>${this.data.name}</h2>
            <div class="card_infos--instructions">
                <h3>Recette</h3>
                <p>${this.data.description}</p>
            </div>
            <div class="card_infos--ingredients">
            <h3>Ingrédients</h3>
            <ul>
            ${this.data.ingredients.map(ingredient => `
                <li>${ingredient.ingredient}</li>`).join('')}
            </ul>
            </div>
        </div>
        `
        article.innerHTML = recipeCard;
        return article;
    }
}