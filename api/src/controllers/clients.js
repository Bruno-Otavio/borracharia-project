const connection = require("../connect/connect");

const getAll = (req, res) => {
    let query = "SELECT * FROM Client";
    connection.query(query, (err, result) => {
        if (err) res.status(400).json(err).end();
        else res.status(202).json(result).end();
    });
}

const get = (req, res) => {
    const id = req.params.id;
    let query = `SELECT * FROM Client WHERE id = "${id}"`;
    connection.query(query, (err, result) => {
        if (err) res.status(404).json(err).end();
        else res.status(202).json(result[0]).end();
    });
}

const create = (req, res) => {
    const client = {
        cpf: req.body.cpf,
        name: req.body.name,
        sobrenome: req.body.sobrenome,
        number: req.body.number
    };
    
    let query = `INSERT INTO Client(cpf, nome, sobrenome, numero) VALUE ("${client.cpf}", "${client.name}", "${client.sobrenome}", "${client.number}")`;
    connection.query(query, (err, result) => {
        if (err) res.status(400).json(err).end();
        else {
            const newClient = req.body;
            newClient.id = result.insertId;
            res.status(201).json(newClient).end();
        }
    });
}

const update = (req, res) => {
    const client = {
        id: req.params.id,
        cpf: req.body.cpf,
        name: req.body.name,
        sobrenome: req.body.sobrenome,
        number: req.body.number
    };

    let query = `UPDATE item SET cpf = ${client.cpf}, nome = '${client.name}', sobrenome = '${client.sobrenome}', "${client.number} WHERE id = ${client.id}`;
    connection.query(query, (err, result) => {
        if (err) res.status(400).json(err).end();
        else {
            if (result.affectedRows > 0) {
                res.status(202).json(req.body).end();
            } else {
                res.status(404).json(err).end();
            }
        }
    });
}

const deleteClient = (req, res) => {
    const id = req.params.id;
    let query = `DELETE FROM Client WHERE id = ${id}`;
    connection.query(query, (err, result) => {
        if (err) res.status(404).json(err).end();
        else {
            if (result.affectedRows > 0) {
                res.status(204).json(result).end();
            }
            else {
                result.message = "ID not found";
                res.status(404).json(result).end();
            }
        }
    });
}

module.exports = { getAll, get, create, update, deleteClient };
