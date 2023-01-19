const {connectingToDB} = require('./connectingToDB')
const db = connectingToDB();


function getAllSections(req, res) {
    console.log("hello world2222222222!")
    db.query(
        "SELECT * FROM libweb5.section",
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

function getIdSectionByName(req, res) {
    const section = req.params.section;

    db.query(
        "SELECT id_section FROM libweb5.section WHERE section_title = ?",[section],
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


module.exports = {
    getAllSections, getIdSectionByName
};