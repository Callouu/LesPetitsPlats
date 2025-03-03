function toggleClearButton(input) {
    const clearBtn = document.getElementById('clearBtn');
    if (input.value.length >= 3) {
        clearBtn.classList.remove('hidden')
    } else {
        clearBtn.classList.add('hidden')
    }
}

function clearSearchInput() {
    const searchInput = document.getElementById('search-recipe');
    searchInput.value = '';
    toggleClearButton(searchInput);
    home.changeSearchValue('');
}

// const clearBtn = document.getElementById('clearBtn')
// const inputSearch = document.getElementById('search-recipe')

// inputSearch.addEventListener("change", (event) => {
//     if (event.target.value >= 3) {
//         clearBtn.classList.remove('hidden')
//     }
//      else {
//         clearBtn.classList.add('hidden')
//     }
// })