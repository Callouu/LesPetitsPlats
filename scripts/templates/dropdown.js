class Dropdown {
    constructor(name, elements) {
        this.elements = elements
        this.name = name
        const showElementsButton = document.getElementById(`show-${this.name}`);
        showElementsButton.addEventListener('click', () => this.showElements());
    }
    showElements() {
        const elementList = document.getElementById(`list-${this.name}`);
        elementList.innerHTML = '';
        this.elements.forEach(element => {
            const listItem = document.createElement('li');
            listItem.textContent = element;

            //valeur envoyé dans le search
            listItem.addEventListener('click', () => {
                //on ajoute l'element dans notre tableau filtered
                home.filters[this.name].push(element)
                //on lance la recherche
                home.search()
                // on ajoute l'element dans un tag
                const newTag = new Tag(element)
                newTag.createTag()
                console.log(element, this.name)  
            });
            elementList.appendChild(listItem);
        });
    }
}
