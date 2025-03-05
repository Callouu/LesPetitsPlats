// Affiche le bouton de suppression après 3 caractères
function toggleClearButton(input) {
    const clearBtn = document.getElementById('clearBtn');
    if (input.value.length >= 3) {
        clearBtn.classList.remove('hidden')
    } else {
        clearBtn.classList.add('hidden')
    }
}

// Permet de supprimer le texte de l'input
function clearSearchInput() {
    const searchInput = document.getElementById('search-recipe');
    searchInput.value = '';
    toggleClearButton(searchInput);
    home.changeSearchValue('');
}
