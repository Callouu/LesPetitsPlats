class Tag {
    constructor(value) {
        this.value = value
        this.tagsContainer = document.querySelector(".tags_container");
    }


    createTag() {
        console.log(this.value)
        const tagElement = document.createElement("div")
        tagElement.classList.add("tag")
        const tagContent = `<p>${this.value}</p>
        <i class="fa-solid fa-xmark" data-value="${this.value}"></i>`
        tagElement.innerHTML = tagContent;
        this.tagsContainer.appendChild(tagElement);

        tagElement.querySelector(".fa-xmark").addEventListener("click", (event) => {
            const tagValue = event.target.getAttribute("data-value");
            home.removeTag(tagValue);
        });
    }
}