// Importez la fonction fetchData depuis le fichier API.js
import { fetchData, AjoutData } from './API.js';
import { projetHome, projetModal } from './Utils/HTMLprojet.js';
import { DeleteProjet,checkFormValidity, resetForm } from './Utils/projet.js';
import { categoriesProjets } from './filter.js';

import { Modal, ModalPresentation, ModalAjout, CloseModal, Edit, ButtonAjoutProjet, ContainerProjet_Modal, Gallery, fileInput,btn_ajout_photo, ButtonSaveProjet,ReturnModal,select,nameProjet,msgSucess,msgError, auth } from './Utils/import.js';

import prewiewImage from './Utils/previewImage.js';

let projetData;
let categories;


const projetAPI = async () => {
    try {
        projetData = await fetchData("http://localhost:5678/api/works");

        const projets = projetData.map((data) => {
            return projetHome(data);
        }).join('');
        Gallery.innerHTML = projets;


        const projetsModal = projetData.map((data) => {
            return projetModal(data);
        }).join('');
        ContainerProjet_Modal.innerHTML = projetsModal;


        const DeleteProjetsIcons = document.querySelectorAll('.icon-delete');
        DeleteProjetsIcons.forEach(DeleteProjetIcon => {
            DeleteProjet(DeleteProjetIcon,projetAPI);
        });

        categories = await categoriesProjets(categories,projetData);

    } catch (error) {
        console.error(error);
    }
};

projetAPI();



const IsLogin = sessionStorage.getItem('IsLogin');
if (IsLogin) {

    auth.innerHTML = "logout";
    auth.addEventListener('click', () => {
        sessionStorage.clear();
        auth.innerHTML = "login";
        window.location.reload();
    })
    
    const BandeauxEdition = document.querySelector('.edition').classList.add('active');
  
    Edit.forEach(ed => {
        ed.classList.add('active');
        ed.addEventListener('click', () => {
            Modal.classList.toggle('active');
            ModalPresentation.classList.add('active');
        })
    })
    
    CloseModal.forEach(cm => {
        cm.addEventListener('click', () => {
            Modal.classList.remove('active');
            ModalPresentation.classList.remove('active');
            ModalAjout.classList.remove('active');
        })
    })

    ReturnModal.addEventListener('click', ()=>{
        ModalAjout.classList.remove('active');
        ModalPresentation.classList.add('active');
    })

    nameProjet.addEventListener('input', checkFormValidity);
    select.addEventListener('input', checkFormValidity);
    fileInput.addEventListener('input', checkFormValidity);

     // création de l'image preview
     let imgProjet;

     btn_ajout_photo.addEventListener('click', (e) => {
         e.preventDefault();
         fileInput.click();
     });

     fileInput.addEventListener('input', () => {
         imgProjet = prewiewImage(imgProjet, fileInput);
     });

    ButtonAjoutProjet.addEventListener('click', () => {

        ModalPresentation.classList.remove('active');
        ModalAjout.classList.add('active');

        select.innerHTML = "";

        // création du select pour les catégories
        categories.forEach((categorie) => {
            const option = document.createElement("option");
            option.value = categorie.id;
            option.text = categorie.name;
            select.appendChild(option);
        });
    });

    ButtonSaveProjet.addEventListener('click', async (e) => {

        e.preventDefault();
    
        const formData  = new FormData();
        const nameProjetForm = nameProjet.value;
        const Catvalue = select.value;

        formData.append('image', imgProjet);
        formData.append('title', nameProjetForm);
        formData.append('category', Catvalue);

        try {
            const newprojet = await AjoutData('http://localhost:5678/api/works', formData );
            console.log(newprojet);
            
            await projetAPI();

            msgSucess.classList.add('active');
            
            resetForm();

        } catch (error) {
            msgError.classList.add('active');
            console.error(error);
        }
    });
}

