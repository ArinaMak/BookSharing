const {connectingToDB} = require('./connectingToDB')

const db = connectingToDB();

function getAuthorByPartOfName(req, res) {
    const author = req.params.author;
    let qry="SELECT author.id_author, author.author_name FROM libweb5.author WHERE author_name LIKE '"+'%'+author+'%'+"' LIMIT 5"
    db.query(
        qry,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("result111222333");
                console.log(result);
                res.send(result);
                console.log("result");
                console.log(result);
            }
        }
    );

};
function getIDAuthorByName(req, res) {
    const author = req.params.author;
    db.query(
        "SELECT id_author FROM libweb5.author WHERE author_name = ?",[author],
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
function addAuthorAndGetNewId(req, res) {
    const author = req.params.author;
    db.query(
        "INSERT INTO libweb5.author (author_name) VALUES (?);",[author],
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


module.exports = {
  getAuthorByPartOfName,
  getIDAuthorByName,
  addAuthorAndGetNewId
};
