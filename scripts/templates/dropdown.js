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
                home.filters[this.name].push(element)
                home.search()
                console.log(element, this.name)  
            });
            elementList.appendChild(listItem);
        });
    }
}
