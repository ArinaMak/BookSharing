import Axios from "axios"

export default class ExtraditionService {

    static axiosInstance = Axios.create({
        baseURL: 'http://localhost:5000/'
    });

    //+++++++++ExtraditionIdBookUser
    static async addNewExtradition(id_book_user, id_user, date_of_extradition, required_return_date) {
        let response = await this.axiosInstance.post("/new_extradition", {
            id_book_user: id_book_user,
            id_user: id_user,
            date_of_extradition: date_of_extradition,
            required_return_date: required_return_date
        })
        return response;
    };
    //+++++++BorrowedBooks
    static async getExtradition(id_user) {
        let response
        response = await this.axiosInstance.get("/extradition/id_user",{
            params: {
                id_user: id_user,
            }
        }
        )
        return response;
    };


}