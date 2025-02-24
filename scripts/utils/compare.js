// Fonction qui permet de vérifier si tous les éléments du tableau 1 sont présents dans le tableau 2.
function isCompare(arr1, arr2) {
    return arr1.every(element => arr2.includes(element));
}