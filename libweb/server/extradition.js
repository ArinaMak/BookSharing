const {connectingToDB} = require('./connectingToDB')
const db = connectingToDB();

function addNewExtradition(req, res) {
    const extradition_id_book_user = req.body.id_book_user;
    const extradition_id_user = req.body.id_user;
    const extradition_date_of_extradition = req.body.date_of_extradition;
    const extradition_required_return_date = req.body.required_return_date;


    db.query(
        "INSERT INTO libweb5.extradition (extradition_id_book_user, extradition_id_user, extradition_date_of_extradition, extradition_required_return_date) VALUES (?, ?, ?, ?)",
        [extradition_id_book_user, extradition_id_user, extradition_date_of_extradition, extradition_required_return_date],
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

function getExtradition(req, res) {
    const id_user = req.query.id_user;
    console.log("id_user")
    console.log(id_user)
    db.query("SELECT * FROM libweb5.extradition WHERE libweb5.extradition.extradition_id_user = ?",
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
    addNewExtradition, getExtradition
};