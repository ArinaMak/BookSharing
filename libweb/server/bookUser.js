const {connectingToDB} = require('./connectingToDB')

const db = connectingToDB();

function addBookUser(req, res) {
    console.log("req")
    console.log(req)
    const id_book = req.body.params.id_book;
    const id_user = req.body.params.id_user;
    console.log("id_book")
    console.log(id_book)
    console.log("id_user")
    console.log(id_user)
    db.query(
        "INSERT INTO libweb5.book_user (book_user_id_book, book_user_id_user) VALUES (?, ?)",[id_book, id_user],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);       //доработать
                console.log("result");
                console.log(result);
            }
        }
    );

};

function deleteBookUser(req, res) {
    console.log("req")
    console.log(req)
    console.log("req.query")
    console.log(req.query)
    console.log("req.params")
    console.log(req.params)
    console.log("req.query")
    console.log(req.query)
    const id_book_user = req.params.id_book_user

    db.query(
        "DELETE FROM libweb5.book_user WHERE (id_book_user = ?);",[id_book_user],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);       //доработать
                console.log("result");
                console.log(result);
            }
        }
    );

};

module.exports = {
    addBookUser, deleteBookUser
};