import Axios from "axios"

export default class PublishingHouseService {

    static axiosInstance = Axios.create({
        baseURL: 'http://localhost:5000/'
    });

    //++++++TheSecondPartOfAddingTheBook in Books3
    static async getPublishingHouse () {
        const response = await this.axiosInstance.get("/publishing_house")
        return response;
    };
    //++++++++Books3,   TheSecondPartOfAddingTheBook in Books3
    static async getIDPublishingHouseByName (publishing_house) {
        const response = await this.axiosInstance.get(`/publishing_house/${publishing_house}`)
        return response.data;
    };
}