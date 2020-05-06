const User = require('../models/partner');

module.exports = function (app) {
    app.get('/patner', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Content-Type: application/json');
        User.getPatner((err, data) => {
            res.status(200).json(data);
        });
    });
    app.post('/patner', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Content-Type: application/json');
        console.log(req.body)
        const userData = {
            nit: req.body.nit,
            name: req.body.name,
            address: req.body.address,
            make: req.body.make,
            papper: req.body.papper
        };

        User.insertPatner(userData, (err, data) => {
            console.log(data);
            if (data) {

                res.json({
                    success: true,
                    msg: 'patner insertado',
                    data: data
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                })
            }
        })
    });

    app.put('/patner', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        const userData = {
            nit: req.body.nit,
            name: req.body.name,
            address: req.body.address,
            make: req.body.make,
            papper: req.body.papper
        };

        User.updatePatner(userData, (err, data) => {
            if (data && data.msg) {
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: 'error'
                });
            }
        });

    });

    app.delete('/patner/:nit', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        User.deletePatner(req.params.nit, (err, data) => {
            if (data && data.msg === 'eliminado' || data.msg === 'no existe un registro') {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: 'Error'
                })
            }
        });
    });
}