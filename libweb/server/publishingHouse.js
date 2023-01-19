const {connectingToDB} = require('./connectingToDB')
const db = connectingToDB();


function getAllPublishingHouse(req, res) {
    db.query(
        "SELECT * FROM libweb5.publishing_house",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                /*res.send("result_____________123");*/
                console.log("res1");
                res.send(result);
                /*res.send("resultend");*/
                console.log("res");
                console.log("result", result);
            }
        }
    );

};

function getIdPublishingHouseByName(req, res) {
    /*const section = req.body.section;*/
    const publishing_house = req.params.publishing_house;

    db.query(
        "SELECT id_publishing_house FROM libweb5.publishing_house WHERE publishing_house_title = ?",[publishing_house],
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
  getAllPublishingHouse, getIdPublishingHouseByName
};
