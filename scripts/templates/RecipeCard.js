class RecipeCard {
    constructor(data) {
        this.data = data
    }

    createRecipeCard() {
        const article = document.createElement("article")
        article.classList.add("recipe_cards")
        article.classList.add("relative", "h-[730px]", "max-w-[400px]", "overflow-hidden", "bg-white", "rounded-[10px]", "shadow-lg")
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
        <p class="timer absolute text-[0.8rem] bg-[#FFD15B] px-2.5 py-[5px] rounded-[10px] right-5 top-5 font-manrope">${timer}</p>
        <img class="w-full h-[250px] object-cover object-center" src="assets/images/${this.data.image}" alt="${this.data.name}">
        <div class="card_infos flex flex-col h-3/6 gap-5 p-5">
            <h2 class="text-[1.2rem] font-thin font-anton">${this.data.name}</h2>
            <div class="card_infos--instructions flex flex-col gap-5">
                <h3 class="uppercase text-[#7A7A7A] text-xs font-bold tracking-[2px] font-manrope">Recette</h3>
                <p class="text-sm line-clamp-4">${this.data.description}</p>
            </div>
            <div class="card_infos--ingredients flex flex-col gap-5 font-manrope">
            <h3 class="uppercase text-[#7A7A7A] text-xs font-bold tracking-[2px]">Ingrédients</h3>
            <ul class="flex flex-wrap gap-[20px_0]">
            ${this.data.ingredients.map(ingredient => `
                <li class="flex flex-col w-[45%]">
                <span class="text-[0.8rem]  font-medium">${ingredient.ingredient}</span>
                <span class="text-[#7A7A7A] text-[0.8rem]">${ingredient.quantity ? `${ingredient.quantity}` : ''}${ingredient.unit ? ` ${ingredient.unit}` : ''}</span>
                </li>
            `).join('')}
            </ul>
            </div>
        </div>
        `
        article.innerHTML = recipeCard;
        return article;
    }
}