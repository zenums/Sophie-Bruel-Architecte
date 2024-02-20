import { postData } from './API.js';
import { FormLogin,InputMail,InputMdp,ErrorLogin } from './Utils/import.js';

FormLogin.addEventListener('submit', (e) => {
   
    e.preventDefault();

    const data = {
        email: InputMail.value,
        password: InputMdp.value
    }

    const Login = async () => {
        try {
            const UsersLogin = await postData('http://localhost:5678/api/users/login', data);

            sessionStorage.setItem('authToken', UsersLogin.token);
            sessionStorage.setItem('IsLogin', true);

            window.location.href = '/FrontEnd/index.html';
            
        } catch (error) {
            console.error(error);
            ErrorLogin.classList.add('active');
        }
    };

    Login();
});
