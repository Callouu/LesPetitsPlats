class Tag {
    constructor(value) {
        this.value = value
        this.tagsContainer = document.querySelector(".tags_container");
    }


    createTag() {
        console.log(this.value)
        const tagElement = document.createElement("div")
        tagElement.classList.add("tag")
        tagElement.classList.add("w-[190px]", "h-[60px]", "bg-[#FFD15B]", "flex", "flex-row", "justify-between", "items-center", "p-[15px]", "capitalize", "font-manrope", "rounded-[10px]")
        const tagContent = `<p class="text-[0.8rem]">${this.value}</p>
        <i class="fa-solid fa-xmark cursor-pointer w-2.5 hover:text-[white]" data-value="${this.value}"></i>
        `
        tagElement.innerHTML = tagContent;
        this.tagsContainer.appendChild(tagElement);

        tagElement.querySelector(".fa-xmark").addEventListener("click", (event) => {
            const tagValue = event.target.getAttribute("data-value");
            home.removeTag(tagValue);
        });
    }
}