import { fetchData } from './API.js';

const Gallery = document.querySelector('.gallery');

const projetAPI = async () => {
    try {
        const projetData = await fetchData("http://localhost:5678/api/works");

        const projets = projetData.map((data) => {
            return `
                <figure>
                    <img src="${data.imageUrl}" alt="${data.title}">
                    <figcaption>${data.title}</figcaption>
                </figure>`
        });

        const galleryHTML = projets.join('');
        Gallery.innerHTML = galleryHTML;
       
    } catch (error) {
        console.error(error);
    }
};

projetAPI();

