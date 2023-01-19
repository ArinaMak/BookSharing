import Axios from "axios"

export default class AuthorService {
    static axiosInstance = Axios.create({
        baseURL: 'http://localhost:5000/'
    });

    //++++The firstPartOfAddingTheBook in Books3
    static async getAuthorByPartOfName (author) {
        const response = await this.axiosInstance.get(`/author/${author}`)
        return response.data;
    };
    //++++++Books3, TheSecondPartOfAddingTheBook in Books3
    static async getIDAuthorByName (author) {
        const response = await this.axiosInstance.get(`/author/id_author/${author}`)
        return response.data;
    };
    //++++++++Books3, TheSecondPartOfAddingTheBook in Books3
    static addAuthorAndGetNewId = (author) => {
        const response = this.axiosInstance.post(`/author/id_new_author/${author}`);
        return response;
    };
}