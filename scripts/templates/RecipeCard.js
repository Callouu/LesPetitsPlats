class RecipeCard {
    constructor(data) {
        this.data = data
    }

    createRecipeCard() {
        const article = document.createElement("article")
        article.classList.add("recipe_cards")
        article.setAttribute('data-id', '${this.data.name}')
        const recipeCard = `
        <p class="timer">${this.data.time}</p>
        <div class="card_infos">
        <h2>${this.data.name}</h2>
        </div>
        `
        article.innerHTML = recipeCard;
        return article;
    }
}