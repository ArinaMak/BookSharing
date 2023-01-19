import Axios from "axios"

export default class SectionService {

    static axiosInstance = Axios.create({
        baseURL: 'http://localhost:5000/'
    });

    //++++++++++TheSecondPartOfAddingBook in Books3
    static async getSection () {
        const response = await this.axiosInstance.get("/section")
        return response;
    };
    //+++++++++Books3, TheSecondPartOfAddingBook in Books3
    static async getSectionByName (section) {
        const response = await this.axiosInstance.get(`/section/${section}`)
        return response.data;
    };
}