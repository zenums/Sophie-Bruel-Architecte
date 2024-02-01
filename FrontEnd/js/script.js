// Importez la fonction fetchData depuis le fichier API.js
import { fetchData, deleteData, AjoutData, postData } from './API.js';

// Sélectionnez les éléments du DOM pour la galerie et les filtres
const Gallery = document.querySelector('.gallery');
const Filter = document.querySelector('.filter');

const Edit = document.querySelectorAll('.modification-projet');

const Modal = document.querySelector('.container-modal');
const ModalPresentation = document.querySelector('.presentation');
const ModalAjout = document.querySelector('.ajout');
const ContainerProjet_Modal = document.querySelector('.container-projet');
const CloseModal = document.querySelectorAll('.fa-xmark');
const ButtonAjoutProjet = document.querySelector('.next-modal');
let DeleteProjetIcon;

// Déclarez des variables globales pour stocker les données des projets et des catégories
let projetData;
let categories;

// Fonction asynchrone pour récupérer les données des projets
const projetAPI = async () => {
    try {
        // Utilisez la fonction fetchData pour obtenir les données des projets depuis l'API
        projetData = await fetchData("http://localhost:5678/api/works");
        console.log(projetData);

        // Utilisez la méthode map pour transformer les données en balises HTML de figure et les joindre en une seule chaîne
        const projets = projetData.map((data) => {
            return `
                <figure>
                    <img src="${data.imageUrl}" alt="${data.title}">
                    <figcaption>${data.title}</figcaption>
                </figure>`;
        }).join('');

        // Injectez la chaîne HTML dans la galerie
        Gallery.innerHTML = projets;

        // Créez la chaîne HTML pour les projets modaux avec des boutons de suppression
        const projetsModal = projetData.map((data) => {
            return `
                <div class="modal-projet">
                    <img src="${data.imageUrl}" alt="${data.title}">
                    <div class="icon-delete" id="${data.id}">
                        <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>
                    </div>
                </div>`;
        }).join('');

        // Injectez la chaîne HTML dans le conteneur modal
        ContainerProjet_Modal.innerHTML = projetsModal;

        // Sélectionnez tous les boutons de suppression après les avoir ajoutés au DOM
        DeleteProjetIcon = document.querySelectorAll('.icon-delete');

        // Ajoutez des écouteurs d'événements à chaque bouton de suppression
        DeleteProjetIcon.forEach(DeleteProjet => {
            DeleteProjet.addEventListener('click', async () => {


                // Récupérez l'ID du projet à partir de l'attribut id du bouton de suppression
                const ProjetId = DeleteProjet.id;
                console.log(ProjetId)

                // Fonction asynchrone pour supprimer le projet
                const DeleteProjets = async () => {
                    try {
                        // Utilisez la fonction deleteData pour supprimer le projet via l'API
                        await deleteData(`http://localhost:5678/api/works/${ProjetId}`);
                        console.log(`Projet avec l'ID ${ProjetId} supprimé avec succès.`);
                    } catch (error) {
                        console.error(`Erreur lors de la suppression du projet : ${error}`);
                    }
                }

                // Appelez la fonction pour supprimer le projet, puis mettez à jour la galerie
                await DeleteProjets();
                await projetAPI();
            })
        });

    } catch (error) {
        console.error(error);
    }
};

// Fonction asynchrone pour récupérer les données des catégories et afficher les filtres
const categoriesProjets = async () => {
    try {
        // Utilisez la fonction fetchData pour obtenir les données des catégories depuis l'API
        categories = await fetchData("http://localhost:5678/api/categories");
        console.log(categories);

        // Utilisez la méthode map pour créer des balises HTML pour chaque catégorie, ajoutez une option "Tous"
        const categorie = `
            <span class="filtre" data-id="all">Tous</span>` +
            categories.map((data) => {
                return `<span class="filtre" data-id="${data.id}">${data.name}</span>`;
            }).join('');

        // Injectez la chaîne HTML dans les filtres
        Filter.innerHTML = categorie;

        // Sélectionnez tous les filtres après les avoir ajoutés au DOM
        const Filtres = document.querySelectorAll('.filtre');

        // Ajoutez des écouteurs d'événements à chaque filtre
        Filtres.forEach(filtre => {
            filtre.addEventListener("click", () => {
                // Retirez la classe 'active' de tous les filtres
                Filtres.forEach(element => {
                    element.classList.remove('active');
                });
                // Ajoutez la classe 'active' au filtre cliqué
                filtre.classList.add('active');

                // Obtenez l'ID de la catégorie à partir de l'attribut data-id du filtre
                const categorieID = filtre.dataset.id;

                // Déclarez une variable pour stocker les projets filtrés
                let filtreProjet;

                // Vérifiez si l'option "Tous" est sélectionnée
                if (categorieID === "all") {
                    // Si "Tous" est sélectionné, affichez tous les projets
                    filtreProjet = projetData;
                } else {
                    // Sinon, filtrez les projets en fonction de la catégorie sélectionnée
                    filtreProjet = projetData.filter((projet) => {
                        return projet.categoryId == categorieID;
                    });
                }

                // Affichez les projets filtrés dans la galerie
                const projetsFilter = filtreProjet.map((data) => {
                    return `
                        <figure>
                            <img src="${data.imageUrl}" alt="${data.title}">
                            <figcaption>${data.title}</figcaption>
                        </figure>`;
                }).join('');

                // Injectez la chaîne HTML des projets filtrés dans la galerie
                Gallery.innerHTML = projetsFilter;
            });
        });

    } catch (error) {
        console.error(error);
    }
};

// Appelez les fonctions pour charger les données et afficher la galerie initiale
categoriesProjets();
projetAPI();


// Récupère la valeur associée à la clé 'IsLogin' dans le stockage local
const IsLogin = sessionStorage.getItem('IsLogin');
console.log(IsLogin);
// Vérifie si la valeur de 'IsLogin' est présente et évaluée à true
if (IsLogin) {
    
    const BandeauxEdition = document.querySelector('.edition').classList.add('active');
    // Si c'est le cas, ajoute la classe 'active' à l'élément avec la classe '.modification-projet'
    Edit.forEach(ed => {
        ed.classList.add('active');
    })

    // Ajoutez un écouteur d'événements pour afficher ou masquer le modal lors du clic sur le bouton d'édition
    Edit.forEach(ed => {
        ed.addEventListener('click', () => {
            Modal.classList.toggle('active');
            ModalPresentation.classList.add('active');
        })
    })
    
    // Ajoutez un écouteur d'événements pour masquer le modal lors du clic
    CloseModal.forEach(cm => {
        cm.addEventListener('click', () => {
            Modal.classList.remove('active');
            ModalPresentation.classList.remove('active');
            ModalAjout.classList.remove('active');
        })
    })

    ButtonAjoutProjet.addEventListener('click', () => {

        ModalPresentation.classList.remove('active');
        ModalAjout.classList.add('active');

        const ContainerFile = document.querySelector('.upload-img');
        const fileInput = document.querySelector('.button-file');
        const label = document.querySelector('.label-file');
        let imgProjet;

        // Ajoutez un gestionnaire d'événements à l'étiquette
        label.addEventListener('click', () => {
            // Simulez le clic sur le bouton de fichier
            fileInput.click();
        });

        // Ajoutez un gestionnaire d'événements au changement du bouton de fichier
        fileInput.addEventListener('change', () => {
            imgProjet = fileInput.files[0];
            const previewImage = document.createElement('img');

            if (imgProjet) {
                
                previewImage.classList.add('img-preview');

                // Utilisez FileReader pour lire le contenu de l'image et afficher un aperçu
                const reader = new FileReader();

                reader.onload = (e) => {
                    // Mettez à jour la source de l'image pour afficher l'aperçu
                    previewImage.src = e.target.result;
                    // Ajoutez l'élément img à votre conteneur
                    ContainerFile.innerHTML = "";
                    ContainerFile.appendChild(previewImage);
                };

                // Lisez le contenu de l'image en tant que Data URL
                reader.readAsDataURL(imgProjet);
            }
        });

        const ButtonSaveProjet = document.querySelector('.save-projet');
        const ReturnModal = document.querySelector('.fa-arrow-left');
        const select = document.querySelector(".select")

    
        // Supprimez d'abord toutes les options existantes
        select.innerHTML = "";
        
        // creation du select
        categories.forEach((categorie) => {
            const option = document.createElement("option");
            option.value = categorie.id;
            option.text = categorie.name;
            select.appendChild(option);
        });

        ReturnModal.addEventListener('click', ()=>{
            ModalAjout.classList.remove('active');
            ModalPresentation.classList.add('active');
        })

        ButtonSaveProjet.addEventListener('click', async (e) => {

            e.preventDefault();
        
            const formData  = new FormData();
            const nameProjet = document.querySelector('.nameProjet').value;
            const select = document.querySelector('.select');
            const Catvalue = parseInt(select.value, 10);

            formData.append('image', imgProjet);
            formData.append('title', nameProjet);
            formData.append('category', Catvalue);

            console.log(formData);
            try {
                // Utilisez la fonction AjoutData pour ajouter les données via une requête POST
                const newprojet = await AjoutData('http://localhost:5678/api/works', formData );
                console.log(newprojet);
                
                // Mettez à jour la galerie après l'ajout du nouveau projet
                await projetAPI();

                const msgSucess = document.querySelector('.success-ajout');
                msgSucess.classList.add('active');

            } catch (error) {
                const msgError = document.querySelector('.error-ajout');
                msgError.classList.add('active');
                console.error(error);
            }
        })
    });
}

