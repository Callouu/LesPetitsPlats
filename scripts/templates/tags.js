class Tag {
    constructor(value) {
        this.value = value
        this.tagsContainer = document.querySelector(".tags_container");
    }


    createTag() {
        console.log(this.value)
        const tagElement = document.createElement("div")
        tagElement.classList.add("tag")
        const tagContent = `<p>${this.value}</p>`
        tagElement.innerHTML = tagContent;
        this.tagsContainer.appendChild(tagElement);
    }
}