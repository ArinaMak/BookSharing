const express = require("express")
const mysql = require('mysql')
const config = require("config")
const cors = require("cors")
const {addNewBook, getMoreInformationAboutBook, getBookByPartOfName, getBookByTitleAndAuthor, getBookByIDUser, addNewBookWithAllParams, getAllInformationAboutBookByPartOfName, getAllInformationAboutBookByIdBookForExtradition, getAllInformationAboutBorrowedBookByIdUser} = require("./books")
const {getAllPublishingHouse, getIdPublishingHouseByName} = require("./publishingHouse")
const {getAuthorByPartOfName, getIDAuthorByName, addAuthorAndGetNewId} = require("./author")
const {connectingToDB} = require('./connectingToDB')
const {addNewUser, searchIDUserByLoginAndPassword, searchIDUserByLoginAndPassword2, getAllInformationAboutUserByIDUser} = require('./user')
const {addBookUser, deleteBookUser} = require('./bookUser')
const {addNewExtradition, getExtradition} = require('./extradition')
const {getAllSections, getIdSectionByName} = require('./section')

const app = express()
app.use(cors());
app.use(express.json());
const PORT = config.get('serverPort')
const db = connectingToDB();

//author
app.get ("/author/:author", getAuthorByPartOfName);
app.get ("/author/id_author/:author", getIDAuthorByName);
app.post ("/author/id_new_author/:author", addAuthorAndGetNewId);

//book
app.get ("/bookshelf/books", getMoreInformationAboutBook);
app.get ("/bookshelf/:title", getBookByPartOfName);
app.get ("/book_by_id_user", getBookByIDUser);
app.get ("/book/booksearch/title", getAllInformationAboutBookByPartOfName);
app.get ("/extradition/id_book/metro_station_title", getAllInformationAboutBookByIdBookForExtradition);
app.get ("/borrowed_books_by_id_user", getAllInformationAboutBorrowedBookByIdUser);
app.get ("/book_id", getBookByTitleAndAuthor);
app.post ("/bookshelf", addNewBook );
app.post ("/new_book", addNewBookWithAllParams);

//bookUser
app.post ("/book_user1", addBookUser);
app.delete ("/delete/:id_book_user", deleteBookUser);

//extradition
app.get ("/extradition/id_user", getExtradition);
app.post ("/new_extradition", addNewExtradition);

//publishingHouse
app.get ("/publishing_house", getAllPublishingHouse);
app.get ("/publishing_house/:publishing_house", getIdPublishingHouseByName);

//section
app.get ("/section", getAllSections);
app.get ("/section/:section", getIdSectionByName);

//user
app.get ("/user/id_user", searchIDUserByLoginAndPassword2);
app.get ("/profile/information", getAllInformationAboutUserByIDUser);
app.post ("/reg", addNewUser);
app.post ("/user", searchIDUserByLoginAndPassword);

app.listen(PORT, () => {
    console.log('server started on port ', PORT);
});




