class RecipeCard {
    constructor(data) {
        this.data = data
    }

    createRecipeCard() {
        const article = document.createElement("article")
        article.classList.add("recipe_cards")
        article.setAttribute('id', '${this.data.name}')
        const recipeCard = `
        <h2>${this.data.name}</h2>
        `
        article.innerHTML = recipeCard;
        return article;
    }
}