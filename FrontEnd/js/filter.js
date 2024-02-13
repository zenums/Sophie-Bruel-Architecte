import { fetchData } from "./API.js";
import { HTMLfiltre } from "./Utils/HTMLprojet.js";
import { Filter } from './Utils/import.js'
import { HandleFiltre } from "./Utils/projet.js";


const categoriesProjets = async (categories,projetData) => {
    try {
        categories = await fetchData("http://localhost:5678/api/categories");

        const IsLogin = sessionStorage.getItem('IsLogin');
        if (IsLogin){

            Filter.innerHTML = "";

        } else{

            const ContainerCategorie = HTMLfiltre(categories);
            Filter.innerHTML = ContainerCategorie;
            
            const Filtres = document.querySelectorAll('.filtre');

            Filtres.forEach(filtre => {
               HandleFiltre(filtre,projetData,Filtres);
            });
        }

    } catch (error) {
        console.error(error);
    }

    return categories;
};

export { categoriesProjets };