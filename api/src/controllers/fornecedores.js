const connection = require("../connect/connect");

const getAll = (req, res) => {
    let query = "SELECT * FROM Fornecedor";
    connection.query(query, (err, result) => {
        if (err) res.status(400).json(err).end();
        else res.status(202).json(result).end();
    });
}

const get = (req, res) => {
    const id = req.params.id;
    let query = `SELECT * FROM Fornecedor WHERE id = "${id}"`;
    connection.query(query, (err, result) => {
        if (err) res.status(404).json(err).end();
        else res.status(202).json(result[0]).end();
    });
}

const create = (req, res) => {
    const fornecedor = {
        id: req.params.id,
        cnpj: req.body.cnpj,
        company: req.body.company
    };
    
    let query = `INSERT INTO fornecedor(cnpj, company) VALUE ("${fornecedor.cnpj}", "${fornecedor.company}")`;
    connection.query(query, (err, result) => {
        if (err) res.status(400).json(err).end();
        else {
            const newfornecedor = req.body;
            newfornecedor.id = result.insertId;
            res.status(201).json(newfornecedor).end();
        }
    });
}

const update = (req, res) => {
    const fornecedor = {
        id: req.params.id,
        cnpj: req.body.cnpj,
        company: req.body.company
    };

    let query = `UPDATE Fornecedor SET cnpj = ${fornecedor.cnpj}, company = ${fornecedor.company}`
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

const deleteFornecedor = (req, res) => {
    const id = req.params.id;
    let query = `DELETE FROM fornecedor WHERE id = ${id}`;
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

module.exports = { getAll, get, create, update, deleteFornecedor };
