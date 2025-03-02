class Dropdown {
    constructor(name, elements) {
        this.elements = elements
        this.name = name
        this.isOpen = false;
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

    // Affiche le contenu de notre dropdown
    showElements() {
        const elementList = document.getElementById(`list-${this.name}`);
        elementList.classList.remove('hidden'); // Show the dropdown list
        const chevron = document.querySelector(`#show-${this.name} .fa-chevron-down`)
        chevron.classList.add('rotate-180')
        this.updateElements();
    }

    // Cache le contenue de notre dropdown
    hideElements() {
        const elementList = document.getElementById(`list-${this.name}`);
        elementList.classList.add('hidden');
        const chevron = document.querySelector(`#show-${this.name} .fa-chevron-down`);
        chevron.classList.remove('rotate-180')
    }

    // Met à jour les éléments sans changer l'état de visibilité
    updateElements() {
        const elementList = document.getElementById(`list-${this.name}`);
        elementList.innerHTML = '';

        // Search input
        const divInput = document.createElement('div')
        divInput.classList.add("mx-[15px]", "my-2.5")
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        //searchInput.placeholder = `Search ${this.name}`;
        searchInput.classList.add('dropdown-search-input');
        searchInput.classList.add("w-full", "h-[30px]", "border", "bg-white", "pl-[5px]", "border-solid", "border-[#7A7A7A]", "outline-none", "font-manrope")
        searchInput.addEventListener('input', (event) => this.filterElements(event.target.value));
        elementList.appendChild(divInput);
        divInput.appendChild(searchInput)

        this.elements.forEach(element => {
            const listItem = document.createElement('li');
            listItem.classList.add("text-base", "cursor-pointer", "pl-[15px]", "pr-[5px]", "py-[5px]", "font-manrope", "list-none", "hover:bg-yellow-400")
            listItem.textContent = element;
            listItem.dataset.value = element.toLowerCase();

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

    filterElements(value) {
        const elementList = document.getElementById(`list-${this.name}`);
        const listItems = elementList.querySelectorAll('li');
        listItems.forEach(item => {
            if (item.dataset.value.includes(value.toLowerCase())) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
}