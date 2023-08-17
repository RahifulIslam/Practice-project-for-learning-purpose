const Pool = require("mysql/lib/Pool");
const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO REGISTRATION (firstName, lastName, gender, email, userpassword, number) values(?,?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.userpassword,
                data.number
            ],
            (error, results, fields) => {
                if (error) {
                   return callBack(error)
                }
                return callBack(null, results)
            }
        )
    }

    // getUser
};