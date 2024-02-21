const express = require("express");
const router = express.Router();

const products = require("./controllers/products");
const fornecedores = require("./controllers/fornecedores");
const clients = require("./controllers/clients");

const verifier = (req, res) => {
    res.json("Back-end respondedno");
}

router.get("/", verifier);

router.get("/products", products.getAll);
router.get("/products/:id", products.get);
router.post("/products", products.create);
router.put("/products/:id", products.update);
router.delete("/products/:id", products.deleteProduct);

router.get("/fornecedores", fornecedores.getAll);
router.get("/fornecedores/:id", fornecedores.get);
router.post("/fornecedores", fornecedores.create);
router.put("/fornecedores/:id", fornecedores.update);
router.delete("/fornecedores/:id", fornecedores.deleteFornecedor);

router.get("/clients", clients.getAll);
router.get("/clients/:id", clients.get);
router.post("/clients", clients.create);
router.put("/clients/:id", clients.update);
router.delete("/clients/:id", clients.deleteClient);

module.exports = router;
