const connection = require("../connect/connect");

const getAll = (req, res) => {
    let query = "SELECT * FROM Product";
    connection.query(query, (err, result) => {
        if (err) res.status(400).json(err).end();
        else res.status(202).json(result).end();
    });
}

const get = (req, res) => {
    const id = req.params.id;
    let query = `SELECT * FROM Product WHERE id = "${id}"`;
    connection.query(query, (err, result) => {
        if (err) res.status(404).json(err).end();
        else res.status(202).json(result[0]).end();
    });
}

const create = (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
    };
    
    let query = `INSERT INTO product(nome, descricao, valor) VALUE ("${product.name}","${item.price}")`;
    connection.query(query, (err, result) => {
        if (err) res.status(400).json(err).end();
        else {
            const newProduct = req.body;
            newProduct.id = result.insertId;
            res.status(201).json(newProduct).end();
        }
    });
}

const update = (req, res) => {
    const product = {
        id: req.params.id,
        name: req.body.name,
        price: req.body.price,
    };

    let query = `UPDATE Product SET nome = '${item.name}', valor = ${item.price} WHERE id = ${product.id}`;
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

const deleteProduct = (req, res) => {
    const id = req.params.id;
    let query = `DELETE FROM Product WHERE id = ${id}`;
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

module.exports = { getAll, get, create, update, deleteProduct };
