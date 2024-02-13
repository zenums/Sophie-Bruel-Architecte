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

const ContainerFile = document.querySelector('.upload-img');
const fileInput = document.querySelector('.button-file');
const btn_ajout_photo = document.querySelector('.label-file');

const ButtonSaveProjet = document.querySelector('.save-projet');
const ReturnModal = document.querySelector('.fa-arrow-left');
const select = document.querySelector(".select")

const msgSucess = document.querySelector('.success-ajout');
const msgError = document.querySelector('.error-ajout');

const FormLogin = document.querySelector('.form-login');
const InputMail = document.querySelector('#email');
const InputMdp = document.querySelector('#mdp');
const ErrorLogin = document.querySelector('.error-login');

export { Modal, ModalPresentation, ModalAjout, CloseModal, Edit, ButtonAjoutProjet, ContainerProjet_Modal, Filter, Gallery,ContainerFile,fileInput,btn_ajout_photo,ButtonSaveProjet,ReturnModal,select,msgSucess,msgError,FormLogin,InputMail,InputMdp,ErrorLogin};