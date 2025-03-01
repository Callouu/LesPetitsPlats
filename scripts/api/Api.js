class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)
            .then(res => res.json())
            .catch(err => console.log('an error occurs', err))
    }
}

class RecipeApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }

    async getAllRecipes() {
        const result = await this.get()
        return result.recipes
    }
}