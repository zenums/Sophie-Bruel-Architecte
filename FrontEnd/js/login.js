// Importe la fonction postData depuis le fichier 'API.js'
import { postData } from './API.js';

// Sélectionne l'élément du formulaire avec la classe '.form-login'
const FormLogin = document.querySelector('.form-login');

// Sélectionne les champs d'entrée pour l'e-mail et le mot de passe
const InputMail = document.querySelector('#email');
const InputMdp = document.querySelector('#mdp');

// Sélectionne l'élément d'erreur pour afficher les messages d'erreur
const ErrorLogin = document.querySelector('.error-login');

// Ajoute un écouteur d'événements pour le formulaire lorsqu'il est soumis
FormLogin.addEventListener('submit', (e) => {
    // Empêche le comportement par défaut du formulaire (rechargement de la page)
    e.preventDefault();

    // Crée un objet 'data' avec les valeurs des champs d'entrée pour l'e-mail et le mot de passe
    const data = {
        email: InputMail.value,
        password: InputMdp.value
    }

    // Fonction asynchrone pour gérer la connexion de l'utilisateur
    const Login = async () => {
        try {
            // Appelle la fonction postData pour envoyer les données de connexion à l'API
            const UsersLogin = await postData('http://localhost:5678/api/users/login', data);

            // Affiche les données de connexion dans la console (à des fins de débogage)
            console.log(UsersLogin);

            // Stocke le jeton d'authentification dans le stockage local
            localStorage.setItem('authToken', UsersLogin.token);

            // Stocke une indication de connexion réussie dans le stockage local
            localStorage.setItem('IsLogin', true);

            // Redirige l'utilisateur vers la page d'accueil
            window.location.href = '/FrontEnd/index.html';
            
        } catch (error) {
            // En cas d'erreur, affiche l'erreur dans la console et active la classe 'active' pour afficher un message d'erreur
            console.error(error);
            ErrorLogin.classList.add('active');
        }
    };

    // Appelle la fonction de connexion lors de la soumission du formulaire
    Login();
});
