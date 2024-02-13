const projetHome = (data)=>{
    return `
    <figure>
        <img src="${data.imageUrl}" alt="${data.title}">
        <figcaption>${data.title}</figcaption>
    </figure>`
};

const projetModal = (data)=>{
    return `
    <div class="modal-projet">
        <img src="${data.imageUrl}" alt="${data.title}">
        <div class="icon-delete" id="${data.id}">
            <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>
        </div>
    </div>`
}

const HTMLfiltre = (categories) => {
    return `
    <span class="filtre" data-id="all">Tous</span>` +
    categories.map((data) => {
        return `<span class="filtre" data-id="${data.id}">${data.name}</span>`;
    }).join('');
}

export {projetHome, projetModal, HTMLfiltre};