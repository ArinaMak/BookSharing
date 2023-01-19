import Axios from "axios"

export default class BookService {

    static axiosInstance = Axios.create({
        baseURL: 'http://localhost:5000/'
    });

    static postNewBook = (newbook) => {
        this.axiosInstance.post("/bookshelf", {
            title: newbook.title,
            description: newbook.description,
            section: newbook.section,
            publishing_house: newbook.publishing_house,
        });
    };
    //++++++++Home
    static async getBooks3 () {
        const response = await this.axiosInstance.get("/bookshelf/books")
        return response;
    };


    static postNewBook2 = (newbook, id_section) => {
        this.axiosInstance.post("/bookshelf", {
            title: newbook.title,
            description: newbook.description,
            section: id_section,
            publishing_house: newbook.publishing_house,
            year_of_publication: newbook.year_of_publication
        });
    };

    static postNewBook3 = (newbook, id_section, id_publishing_house) => {
        this.axiosInstance.post("/bookshelf", {
            title: newbook.title,
            description: newbook.description,
            section: id_section,
            publishing_house: id_publishing_house,
            year_of_publication: newbook.year_of_publication
        });
    };
    //++++++++++TheFirstPartOfAddingTheBook in Books3
    static async getAuthorByPartOfTitle (title) {
        const response = await this.axiosInstance.get(`/bookshelf/${title}`)
        return response.data;
    };

    //+++++++++Books3
    static async getBookByTitleAndAuthor(book_title, author_name) {
        let response
        response = await this.axiosInstance.get("/book_id",{
            params: {
                book_title: book_title,
                author_name: author_name
            }
        }
        )
        return response.data;
    };

    //++++++UserBookshelf
    static async getBooksByIDUser(id_user) {
        let response
        response = await this.axiosInstance.get("/book_by_id_user",{
            params: {
                id_user: id_user,
            }
        }
        )
        return response.data;
    };

    static addNewBookWithAllParams1 = (newbook) => {
        this.axiosInstance.post("/new_book", {
            book_title: newbook.book_title,
            book_description: newbook.book_description,
            book_id_section: newbook.book_id_section,
            book_id_publishing_house: newbook.book_id_publishing_house,
            book_id_author: newbook.book_id_author
        });
    };
    //++++++++Books3, TheSecondPartOfAnndingTheBook in Books3
    static async addNewBookWithAllParams(book_title, book_description, book_id_section, book_id_publishing_house, book_id_author) {
        let response = await this.axiosInstance.post("/new_book", {
            book_title: book_title,
            book_description: book_description,
            book_id_section: book_id_section,
            book_id_publishing_house: book_id_publishing_house,
            book_id_author: book_id_author
        })
        return response;
    };

    //++++++++++Home
    static async getAllInformationAboutBookByPartOfTitle (title) {
        const response = await this.axiosInstance.get("/book/booksearch/title", {
            params: {
                title: title,
            }
        })
        return response.data;
    };

    //++++++++ExtraditionIdBook
    static async getAllInformationAboutBookByIdBookForExtradition(id_book, metro_station_title) {
        let response = await this.axiosInstance.get("/extradition/id_book/metro_station_title", {

            params: {
                id_book: id_book,
                metro_station_title: metro_station_title,
            }
        })
        return response;
    };
    //+++++++++BorrowedBooks
    static async getAllInformationAboutBorrowedBookByIdUser(id_user) {
        let response = await this.axiosInstance.get("/borrowed_books_by_id_user", {
            params: {
                id_user: id_user,
            }
        })
        return response;
    };

}