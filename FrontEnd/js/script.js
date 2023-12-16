// Importez la fonction fetchData depuis le fichier API.js
import { fetchData, deleteData } from './API.js';

// Sélectionnez les éléments du DOM pour la galerie et les filtres
const Gallery = document.querySelector('.gallery');
const Filter = document.querySelector('.filter');

const Edit = document.querySelector('.modification-projet');

const Modal = document.querySelector('.container-modal');
const ContainerProjet_Modal = document.querySelector('.container-projet');
const CloseModal = document.querySelector('.fa-xmark');
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
            DeleteProjet.addEventListener('click', async (event) => {
                // Empêchez le comportement par défaut du lien ou du bouton
                event.preventDefault();

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
const IsLogin = localStorage.getItem('IsLogin');

// Vérifie si la valeur de 'IsLogin' est présente et évaluée à true
if (IsLogin) {
    // Si c'est le cas, ajoute la classe 'active' à l'élément avec la classe '.modification-projet'
    Edit.classList.add('active');
}

// Ajoutez un écouteur d'événements pour afficher ou masquer le modal lors du clic sur le bouton d'édition
Edit.addEventListener('click', () => {
    Modal.classList.toggle('active');
})

// Ajoutez un écouteur d'événements pour masquer le modal lors du clic
CloseModal.addEventListener('click', () => {
    Modal.classList.remove('active');
})
