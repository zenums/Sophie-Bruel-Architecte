import { deleteData } from '../API.js';
import { projetHome } from './HTMLprojet.js';
import { Gallery, nameProjet, InfoIMG, Modal, ModalPresentation, ModalAjout, msgSucess, select, ButtonSaveProjet} from './import.js';

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

const checkFormValidity = (fileInput) => {
    const nameProjetFilled = nameProjet.value.trim() !== '';
    const selectFilled = select.value.trim() !== '';

    console.log(nameProjetFilled, selectFilled, fileInput);

    if (nameProjetFilled && selectFilled &&  fileInput) {
        ButtonSaveProjet.classList.add('active');
    } else {
        ButtonSaveProjet.classList.remove('active');
    }
};

const resetForm = () => {

    nameProjet.value = '';
    InfoIMG.classList.remove('active');
    const previewImage = document.querySelector('.img-preview');    
    previewImage.remove();

    setTimeout(() => {
        Modal.classList.remove('active');
        ModalPresentation.classList.remove('active');
        ModalAjout.classList.remove('active');
        msgSucess.classList.remove('active');
    }, 1500)
 
}

export { DeleteProjet, HandleFiltre, checkFormValidity,resetForm};