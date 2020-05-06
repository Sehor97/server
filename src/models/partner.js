const mysqli = require('mysql');

connection = mysqli.createConnection({
    host: 'localhost',
    user: 'root',
    passwird: '',
    database: 'rinnapp'
});

let userModel = {};

userModel.getPatner = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM partner',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        );
    }
}

userModel.insertPatner = (userData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO partner SET ?', userData,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, {
                        'id': userData.nit
                    });
                }
            }
        );
    }
}

userModel.updatePatner = (userData, callback) => {
    console.log(userData.id)
    if (connection) {
        const sql = `
        UPDATE partner SET
        name = ${connection.escape(userData.name)},
        address = ${connection.escape(userData.address)},
        make = ${connection.escape(userData.make)},
        papper = ${connection.escape(userData.papper)}
        WHERE nit = ${connection.escape(userData.nit)};
        `
        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                callback(null, {
                    "msg": "sucess"
                });
            }
        });
    }
}

userModel.deletePatner = (id, callback) => {
    if (connection) {
        const sql = `SELECT * FROM partner WHERE NIT =${connection.escape(id)}`;

        connection.query(sql, (err, row) => {
            if (row) {
                let sql = `DELETE FROM partner WHERE NIT =${connection.escape(id)}`;
                connection.query(sql, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: 'eliminado'
                        })
                    }
                })
            } else {
                callback(null, {
                    msg: 'no existe un registro'
                })
            }
        })
    }
}

module.exports = userModel;