const { rejects } = require("assert");
const db = require("../db/db");

exports.login = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM userTable where password=? and username=? or email=?;", () (req, res) => {

        })
    })
}