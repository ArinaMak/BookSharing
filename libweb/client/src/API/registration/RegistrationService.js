import Axios from "axios"
//++++SignIn
export default class RegistrationService {

    static axiosInstance = Axios.create({
        baseURL: 'http://localhost:5000/'
    });

    static postNewUser = (newuser) => {
        this.axiosInstance.post("/reg", {
            login: newuser.login,
            email: newuser.email,
            surname: newuser.surname,
            name: newuser.name,
            patronymic: newuser.patronymic,
            userpassword: newuser.userpassword
        });
    };
}