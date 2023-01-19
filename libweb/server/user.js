const {connectingToDB} = require('./connectingToDB')

const db = connectingToDB();

function addNewUser(req, res) {
    const login = req.body.login;
    const email = req.body.email;
    const surname = req.body.surname;
    const name = req.body.name;
    const patronymic = req.body.patronymic;
    const userpassword = req.body.userpassword;

    db.query(
        "INSERT INTO libweb5.user (user_name, user_surname, user_patronymic, user_login, user_email, user_password) VALUES (?,?,?,?,?,?)",
        [name, surname, patronymic, login, email, userpassword],
        (err, result) => {
            if (err) {
                throw new Error('BROKEN')
            } else {
                res.send("Values inserted");
            }
        }
    );
};


function searchIDUserByLoginAndPassword(req, res) {
    const user_login = req.body.user_login;
    const user_password = req.body.user_password;
    db.query(
        "SELECT id_user FROM libweb5.user WHERE user_login = ? AND user_password = ?",
        [user_login, user_password],
        (err, result) => {
            if (err) {
                console.log(err);
                throw new Error('BROKEN')
            } else {
                console.log("user_login")
                console.log(user_login)
                console.log("user_password")
                console.log(user_password)
                console.log("result123456789")
                console.log(result[0].id_user)
                res.send(result[0]);
                console.log("hellloooooooooo");
            }
        }
    );

};
function searchIDUserByLoginAndPassword2(req, res) {
    const user_login = req.query.user_login;
    const user_password = req.query.user_password;
    db.query(
        "SELECT id_user, user_login FROM libweb5.user WHERE user_login = ? AND user_password = ?",
        [user_login, user_password],
        (err, result) => {
            if (err) {
                console.log(err);
                throw new Error('BROKEN')
            } else {
                console.log("result12345678910_11")
                console.log(result)
                res.send(result);
            }
        }
    );
};

function getAllInformationAboutUserByIDUser(req, res) {
    const id_user = req.query.id_user;
    console.log("id_user")
    console.log(id_user)
    db.query("SELECT libweb5.user.id_user, libweb5.user.user_name, libweb5.user.user_surname, libweb5.user.user_patronymic, libweb5.user.user_login, libweb5.user.user_email, libweb5.metro_station.metro_station_title FROM libweb5.metro_station INNER JOIN libweb5.user ON libweb5.metro_station.id_metro_station = libweb5.user.user_id_metro_station WHERE libweb5.user.id_user = ?",
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

module.exports = {
  addNewUser, searchIDUserByLoginAndPassword, searchIDUserByLoginAndPassword2, getAllInformationAboutUserByIDUser
};