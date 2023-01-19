import Axios from "axios"

export default class BookUserService {

    static axiosInstance = Axios.create({
        baseURL: 'http://localhost:5000/'
    });

    //++++++++BookForm in Books3, TheSecondPartOfAddingTheBook in Books3
    static async addBookUser(id_book, id_user) {
        let response = await this.axiosInstance.post("/book_user1",{
            params: {
                id_book: id_book,
                id_user: id_user
            }
        })
        return response.data;
    };
    //+++++UserBookshelf
    static async deleteBookUser(id_book_user) {
        let response = await this.axiosInstance.delete(`/delete/${id_book_user}`)
        //return response.data;
    };
}