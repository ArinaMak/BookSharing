import Axios from "axios"

export default class UserService {

    static axiosInstance = Axios.create({
        baseURL: 'http://localhost:5000/'
    });

    static getIDUserByLoginAndPassword = (user_login, user_password) => {
        this.axiosInstance.post("/user", {
            user_login: user_login,
            user_password: user_password,
        });
    };
    //++++++++Login
    static async getIDUserByLoginAndPassword2(user_login, user_password) {
        let response
        response = await this.axiosInstance.get("/user/id_user",{
            params: {
                user_login: user_login,
                user_password: user_password
            }
        }
        )
        return response.data;
    };

    //++++++++++++++UserProfile
    static async getAllInformationAboutUserByIDUser(id_user) {
        let response
        response = await this.axiosInstance.get("/profile/information",{
            params: {
                id_user: id_user,
            }
        }
        )
        return response;
    };
}
