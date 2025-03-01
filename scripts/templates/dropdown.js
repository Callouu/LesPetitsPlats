class Dropdown {
    constructor(name, elements) {
        this.elements = elements
        this.name = name
        this.isOpen = true
        const showElementsButton = document.getElementById(`show-${this.name}`);
        showElementsButton.addEventListener('click', () => this.toggleElements());
    }

    // Gere l'ouverture et fermeture de notre liste
    toggleElements() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.showElements();
        } else {
            this.hideElements();
        }
    }

    // Contenu de notre dropdown
    showElements() {
        const elementList = document.getElementById(`list-${this.name}`);
        elementList.innerHTML = '';
        this.elements.forEach(element => {
            const listItem = document.createElement('li');
            listItem.classList.add("text-base", "cursor-pointer", "pl-[15px]", "pr-[5px]", "py-[5px]", "font-manrope", "list-none", "hover:bg-yellow-400")
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

        elementList.classList.remove('hidden'); // Show the dropdown list
        const chevron = document.querySelector(`#show-${this.name} .fa-chevron-down`)
        chevron.classList.add('rotate-180')
    }

    // Cache la liste
    hideElements() {
        const elementList = document.getElementById(`list-${this.name}`);
        elementList.classList.add('hidden');
        const chevron = document.querySelector(`#show-${this.name} .fa-chevron-down`);
        chevron.classList.remove('rotate-180')
    }
}
