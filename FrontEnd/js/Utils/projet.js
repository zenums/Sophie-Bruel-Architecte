import { deleteData } from '../API.js';
import { projetHome } from './HTMLprojet.js';
import { Gallery } from './import.js';

const DeleteProjet = ( DeleteProjet,projetAPI ) => {

    DeleteProjet.addEventListener('click', async () => {

        const ProjetId = DeleteProjet.id;

        const DeleteProjets = async () => {
            try {
                await deleteData(`http://localhost:5678/api/works/${ProjetId}`);
                console.log(`Projet avec l'ID ${ProjetId} supprimé avec succès.`);
            } catch (error) {
                console.error(`Erreur lors de la suppression du projet : ${error}`);
            }
        }

        await DeleteProjets();
        await projetAPI();
    });
}

const HandleFiltre = (filtre,projetData, Filtres) => {
 
    filtre.addEventListener("click", () => {

        Filtres.forEach(element => {
            element.classList.remove('active');
        });
        filtre.classList.add('active');

        const categorieID = filtre.dataset.id;

        let filtreProjet;

        if (categorieID === "all") {
            filtreProjet = projetData;
        } else {
            filtreProjet = projetData.filter((projet) => {
                return projet.categoryId == categorieID;
            });
        }

        const projetsFilter = filtreProjet.map((data) => {
            return projetHome(data);
        }).join('');
        Gallery.innerHTML = projetsFilter;
    });
}


export { DeleteProjet, HandleFiltre };