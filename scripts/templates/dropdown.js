class Dropdown {
    static openDropdowns = [];
    constructor(name, elements) {
        this.elements = elements
        this.name = name
        this.isOpen = false;
        const showElementsButton = document.getElementById(`show-${this.name}`);
        showElementsButton.addEventListener('click', () => this.toggleElements());
    }

    // Gere l'ouverture et fermeture de notre liste
    toggleElements() {
        if (this.isOpen) {
            this.hideElements();
        } else {
            Dropdown.closeAllDropdowns();
            this.showElements();
            Dropdown.openDropdowns.push(this);
        }
    }

    // Ferme tous les dropdowns ouverts
    static closeAllDropdowns() {
        Dropdown.openDropdowns.forEach(dropdown => dropdown.hideElements());
        Dropdown.openDropdowns = [];
    }

    // Affiche le contenu de notre dropdown
    showElements() {
        const elementList = document.getElementById(`list-${this.name}`);
        elementList.classList.remove('hidden'); // Show the dropdown list
        const chevron = document.querySelector(`#show-${this.name} .fa-chevron-down`)
        chevron.classList.add('rotate-180')
        this.updateElements();
        this.isOpen = true;
    }

    // Cache le contenue de notre dropdown
    hideElements() {
        const elementList = document.getElementById(`list-${this.name}`);
        elementList.classList.add('hidden');
        const chevron = document.querySelector(`#show-${this.name} .fa-chevron-down`);
        chevron.classList.remove('rotate-180')
        this.isOpen = false;
    }

    // Met à jour les éléments sans changer l'état de visibilité
    updateElements() {
        const elementList = document.getElementById(`list-${this.name}`);
        elementList.innerHTML = '';

        // Search input
        const divInput = document.createElement('div')
        divInput.classList.add("relative","mx-[15px]", "my-2.5")

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.maxLength = 12;
        searchInput.classList.add('dropdown-search-input');
        searchInput.classList.add("w-full", "h-[30px]", "border", "bg-white", "pl-[5px]", "border-solid", "border-[#7A7A7A]", "outline-none", "font-manrope", "focus:text-gray-500")
        searchInput.addEventListener('input', (event) => {
            this.filterElements(event.target.value);
            this.toggleClearButton(event.target);
        });

        // Search icon
        const searchIcon = document.createElement('i');
        searchIcon.classList.add('fa', 'fa-search', 'absolute', 'text-[#7A7A7A]', 'right-[8px]', 'top-[6px]', 'cursor-pointer');

        // Clear button
        const clearBtn = document.createElement('button');
        clearBtn.classList.add('hidden', 'absolute', 'cursor-pointer', 'top-[5px]', 'right-[32px]', 'text-[#7A7A7A]','text-[0.8rem]', 'hover:text-light-yellow', 'focus:text-light-yellow');
        clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            this.filterElements('');
            this.toggleClearButton(searchInput);
        });

        divInput.appendChild(searchInput);
        divInput.appendChild(searchIcon);
        divInput.appendChild(clearBtn);
        elementList.appendChild(divInput);

        const uniqueElements = new Set(this.elements);
        uniqueElements.forEach(element => {
            const listItem = document.createElement('li');
            listItem.classList.add("text-base", "cursor-pointer", "pl-[15px]", "pr-[5px]", "py-[5px]", "font-manrope","capitalize", "list-none", "hover:bg-light-yellow")
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
            });
            elementList.appendChild(listItem);
        });
    }

    // Filtre les éléments de mon dropdown
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

    // Affiche le bouton de suppression
    toggleClearButton(input) {
        const clearBtn = input.nextElementSibling.nextElementSibling;
        if (input.value.length > 0) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    }
}