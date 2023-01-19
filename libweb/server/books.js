const {connectingToDB} = require('./connectingToDB')

const db = connectingToDB();

function addNewBook(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const section = req.body.section;
    const publishing_house = req.body.publishing_house;

    db.query(
        "INSERT INTO libweb5.book (book_title, book_description, book_id_section, book_id_publishing_house) VALUES (?,?,?,?)",
        [title, description, section, publishing_house],
        (err, result) => {
            if (err) {
                console.log(err);
                throw new Error('BROKEN')
            } else {
                res.send("Values inserted!!!");
                console.log("hellloooooooooo");
            }
        }
    );

};

function getMoreInformationAboutBook(req, res) {
    db.query(
        /*"SELECT libweb5.book.id_book, libweb5.book.book_title, libweb5.author.author_name, libweb5.book.book_description, libweb5.section.section_title, libweb5.publishing_house.publishing_house_title FROM libweb5.publishing_house INNER JOIN (libweb5.section INNER JOIN (libweb5.book INNER JOIN (libweb5.author INNER JOIN libweb5.author_book ON libweb5.author.id_author = libweb5.author_book.author_book_id_author) ON libweb5.book.id_book = libweb5.author_book.author_book_id_book) ON libweb5.section.id_section = libweb5.book.book_id_section) ON libweb5.publishing_house.id_publishing_house = libweb5.book.book_id_publishing_house",*/
        ////"SELECT libweb5.book.id_book, libweb5.book.book_title, libweb5.author.author_name, libweb5.book.book_description, libweb5.section.section_title, libweb5.publishing_house.publishing_house_title FROM libweb5.publishing_house INNER JOIN (libweb5.section INNER JOIN (libweb5.author INNER JOIN (libweb5.book) ON libweb5.author.id_author = libweb5.book.book_id_author) ON libweb5.section.id_section = libweb5.book.book_id_section) ON libweb5.publishing_house.id_publishing_house = libweb5.book.book_id_publishing_house WHERE libweb5.book.book_quantity != 0 ORDER BY RAND() LIMIT 10",
        "SELECT libweb5.book.id_book, libweb5.book.book_title, libweb5.author.author_name, libweb5.book.book_description, libweb5.section.section_title, libweb5.publishing_house.publishing_house_title FROM libweb5.publishing_house INNER JOIN (libweb5.section INNER JOIN (libweb5.author INNER JOIN (libweb5.book) ON libweb5.author.id_author = libweb5.book.book_id_author) ON libweb5.section.id_section = libweb5.book.book_id_section) ON libweb5.publishing_house.id_publishing_house = libweb5.book.book_id_publishing_house ORDER BY RAND() LIMIT 5",

        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log("res");
                console.log("result", result);
            }
        }
    );

};


function getBookByPartOfName(req, res) {
    const title = req.params.title;
    let qry="SELECT book.id_book, book.book_title FROM libweb5.book WHERE book_title LIKE '"+'%'+title+'%'+"' LIMIT 5"
    db.query(
        qry,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log("result");
                console.log(result);
            }
        }
    );

};

function getBookByTitleAndAuthor(req, res) {
    const book_title = req.query.book_title;
    const author_name = req.query.author_name;
    console.log("book_title")
    console.log(book_title)
    console.log("author_name")
    console.log(author_name)
    db.query("SELECT libweb5.book.id_book, libweb5.book.book_title, libweb5.author.author_name, libweb5.book.book_description, libweb5.section.section_title, libweb5.publishing_house.publishing_house_title FROM libweb5.publishing_house INNER JOIN (libweb5.section INNER JOIN (libweb5.author INNER JOIN (libweb5.book) ON libweb5.author.id_author = libweb5.book.book_id_author) ON libweb5.section.id_section = libweb5.book.book_id_section) ON libweb5.publishing_house.id_publishing_house = libweb5.book.book_id_publishing_house WHERE libweb5.author.author_name = ? AND libweb5.book.book_title = ?",
        [author_name, book_title],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                //console.log("result");
                //console.log(result);
            }
        }
    );

};

function getBookByIDUser(req, res) {
    const id_user = req.query.id_user;
    console.log("id_user")
    console.log(id_user)
    db.query("SELECT libweb5.book.id_book, libweb5.book.book_title, libweb5.author.author_name, libweb5.book.book_description, libweb5.section.section_title, libweb5.publishing_house.publishing_house_title, libweb5.book_user.id_book_user FROM libweb5.section INNER JOIN (libweb5.publishing_house INNER JOIN ((libweb5.author INNER JOIN libweb5.book ON libweb5.author.id_author = libweb5.book.book_id_author) INNER JOIN libweb5.book_user ON libweb5.book.id_book = libweb5.book_user.book_user_id_book) ON libweb5.publishing_house.id_publishing_house = libweb5.book.book_id_publishing_house) ON libweb5.section.id_section = libweb5.book.book_id_section WHERE libweb5.book_user.book_user_id_user = ?",
        [id_user],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                //console.log("result");
                //console.log(result);
            }
        }
    );

};


function addNewBookWithAllParams(req, res) {
    const book_title = req.body.book_title;
    const book_description = req.body.book_description;
    const book_id_section = req.body.book_id_section;
    const book_id_publishing_house = req.body.book_id_publishing_house;
    const book_id_author = req.body.book_id_author;
    db.query(
        "INSERT INTO libweb5.book (book_title, book_description, book_id_section, book_id_publishing_house, book_id_author) VALUES (?, ?, ?, ?, ?)",
        [book_title, book_description, book_id_section, book_id_publishing_house, book_id_author],
        (err, result) => {
            if (err) {
                console.log(err);
                throw new Error('BROKEN')
            } else {
                res.send(result);     //переделать
                console.log("hellloooooooooo");
            }
        }
    );

};

function getAllInformationAboutBookByPartOfName(req, res) {
    let title = "";
    if(req.query.title) title = req.query.title;
    //let qry="SELECT libweb5.book.id_book, libweb5.book.book_title, libweb5.author.author_name, libweb5.book.book_description, libweb5.section.section_title, libweb5.publishing_house.publishing_house_title, libweb5.book.book_quantity, libweb5.book_user.id_book_user FROM libweb5.section INNER JOIN (libweb5.publishing_house INNER JOIN ((libweb5.author INNER JOIN libweb5.book ON libweb5.author.id_author = libweb5.book.book_id_author) INNER JOIN libweb5.book_user ON libweb5.book.id_book = libweb5.book_user.book_user_id_book) ON libweb5.publishing_house.id_publishing_house = libweb5.book.book_id_publishing_house) ON libweb5.section.id_section = libweb5.book.book_id_section WHERE book_title LIKE '"+'%'+title+'%'+"' LIMIT 5"
    let qry="SELECT libweb5.book.id_book, libweb5.book.book_title, libweb5.book.book_description, libweb5.section.section_title, libweb5.publishing_house.publishing_house_title, libweb5.author.author_name FROM libweb5.author INNER JOIN (libweb5.publishing_house INNER JOIN (libweb5.section INNER JOIN libweb5.book ON libweb5.section.id_section = libweb5.book.book_id_section) ON libweb5.publishing_house.id_publishing_house = libweb5.book.book_id_publishing_house) ON libweb5.author.id_author = libweb5.book.book_id_author WHERE libweb5.book.book_title LIKE '"+'%'+title+'%'+"' LIMIT 5"
    db.query(
        qry,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log("result112233");
                console.log(result);
            }
        }
    );

};

function getAllInformationAboutBookByIdBookForExtradition(req, res) {
    console.log("req.body")
    console.log(req.body)
    console.log("req.params")
    console.log(req.params)
    console.log("req.query")
    console.log(req.query)
    const id_book = req.query.id_book;
    let metro_station_title = "";
    if(req.query.metro_station_title)   metro_station_title = req.query.metro_station_title;
    let qry="SELECT libweb5.book.id_book, libweb5.book_user.id_book_user, libweb5.book_user.book_user_there_is, libweb5.user.id_user, libweb5.user.user_login, libweb5.metro_station.metro_station_title, libweb5.book.book_title, libweb5.book.book_description, libweb5.section.section_title, libweb5.publishing_house.publishing_house_title, libweb5.author.author_name, libweb5.book.book_quantity FROM (libweb5.metro_station INNER JOIN libweb5.user ON libweb5.metro_station.id_metro_station = libweb5.user.user_id_metro_station) INNER JOIN (libweb5.section INNER JOIN (libweb5.publishing_house INNER JOIN ((libweb5.author INNER JOIN libweb5.book ON libweb5.author.id_author = libweb5.book.book_id_author) INNER JOIN libweb5.book_user ON libweb5.book.id_book = libweb5.book_user.book_user_id_book) ON libweb5.publishing_house.id_publishing_house = libweb5.book.book_id_publishing_house) ON libweb5.section.id_section = libweb5.book.book_id_section) ON libweb5.user.id_user = libweb5.book_user.book_user_id_user WHERE libweb5.book.id_book = " + id_book + " AND libweb5.metro_station.metro_station_title LIKE '"+'%'+metro_station_title+'%'+"' LIMIT 5"
    db.query(
        qry,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log("result112233");
                //console.log(result);
            }
        }
    );

};
///////////////
function getAllInformationAboutBorrowedBookByIdUser(req, res) {
    console.log("req.body")
    console.log(req.body)
    console.log("req.params")
    console.log(req.params)
    console.log("req.query")
    console.log(req.query)
    const id_user = req.query.id_user;
    db.query(
        "SELECT libweb5.extradition.id_extradition, libweb5.extradition.extradition_id_user, libweb5.extradition.extradition_date_of_extradition, libweb5.extradition.extradition_required_return_date, libweb5.user.id_user, libweb5.user.user_login, libweb5.metro_station.metro_station_title, libweb5.book_user.id_book_user, libweb5.book.id_book, libweb5.book.book_title, libweb5.book.book_description, libweb5.section.section_title, libweb5.publishing_house.publishing_house_title, libweb5.author.author_name FROM libweb5.author INNER JOIN (libweb5.publishing_house INNER JOIN (libweb5.section INNER JOIN (libweb5.book INNER JOIN (libweb5.metro_station INNER JOIN (libweb5.user INNER JOIN (libweb5.book_user INNER JOIN libweb5.extradition ON libweb5.book_user.id_book_user = libweb5.extradition.extradition_id_book_user) ON libweb5.user.id_user = libweb5.book_user.book_user_id_user) ON libweb5.metro_station.id_metro_station = libweb5.user.user_id_metro_station) ON libweb5.book.id_book = libweb5.book_user.book_user_id_book) ON libweb5.section.id_section = libweb5.book.book_id_section) ON libweb5.publishing_house.id_publishing_house = libweb5.book.book_id_publishing_house) ON libweb5.author.id_author = libweb5.book.book_id_author WHERE libweb5.extradition.extradition_id_user = ?",
        [id_user],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log("result112233");
                //console.log(result);
            }
        }
    );

};



module.exports = {
  addNewBook, getMoreInformationAboutBook, getBookByPartOfName, getBookByTitleAndAuthor, getBookByIDUser, addNewBookWithAllParams, getAllInformationAboutBookByPartOfName, getAllInformationAboutBookByIdBookForExtradition, getAllInformationAboutBorrowedBookByIdUser
};
