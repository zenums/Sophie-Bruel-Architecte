import { ContainerFile, InfoIMG } from './import.js';

const prewiewImage = (imgProjet, fileInput) => {

    imgProjet = fileInput.files[0];
    const previewImage = document.createElement('img');
 
    if (imgProjet) {
        
        previewImage.classList.add('img-preview');

        const reader = new FileReader();

        reader.onload = (e) => {
            previewImage.src = e.target.result;
            InfoIMG.classList.add('active');
            ContainerFile.appendChild(previewImage);
        };

        reader.readAsDataURL(imgProjet);
    }

    return imgProjet;
}

export default prewiewImage;