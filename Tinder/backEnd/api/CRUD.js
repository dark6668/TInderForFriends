
const db = require(".././db-connection")
class CRUD {
	constructor(collectionName) {
		this.collectionName = collectionName;
	}

async getAllData(req,res){
    const  select = `Select * FROM ${this.collectionName}`;
    db.query(select, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(result);
        }
      });
}

}

module.exports = {
	CRUD,
};