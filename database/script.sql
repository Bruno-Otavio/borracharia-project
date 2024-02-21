DROP DATABASE IF EXISTS borracharia;
CREATE DATABASE borracharia CHARSET=UTF8 COLLATE utf8_general_ci;
use borracharia;

-- Forncedores
CREATE TABLE Fornecedor(
    id_fornecedor integer not null primary key auto_increment,
    cnpj varchar(20) unique not null,
    company varchar(50) not null
);

-- Produtos
CREATE TABLE Product(
    id_product integer unique not null primary key auto_increment,
    nome varchar(50) not null,
    price decimal(10,2) not null,
    id_fornecedor integer not null,
    foreign key (id_fornecedor) references Fornecedor(id_fornecedor)
);

CREATE TABLE Stock(
    id_stock integer unique not null auto_increment,
    product integer unique not null,
    foreign key (product) references Product(id_product),
    quantity integer
);

-- Clientes
CREATE TABLE Client(
    id_client integer not null primary key auto_increment,
    cpf varchar(14) unique,
    nome varchar(50) not null,
    sobrenome varchar(50) not null,
    numero varchar(50) not null
);

-------------------------------------
--        Inserção de Dados        --
-------------------------------------
INSERT INTO Fornecedor(cnpj, company) VALUES
("83697428000162", "Pneus LTDA"),
("21003792000128", "Mecânicos Normais"),
("89509646000102", "Kolan Mech");

INSERT INTO Product(nome, price, id_fornecedor) VALUES
("Pneu comum", 500, 1),
("Pneu pesado", 2500, 1),
("Cola vulcanizante", 108, 2),
("Válvulas para pneus", 66, 1),
("Macaco hidráulico", 1606, 3);

INSERT INTO Stock(product, quantity) VALUES
(1, 10),
(2, 20),
(3, 5),
(4, 55),
(5, 18);

INSERT INTO Client(cpf, nome, sobrenome, numero) VALUES
("26809575049", "Ana", "Souza", "19925178377"),
("60552094030", "Bruno", "Ramos", "19935521374"),
("40004809017", "Larissa", "Manoela", "19929971372"),
("96336913031", "Jorge", "Florença", "19925298311"),
("26532600008", "Mario", "Mushroom", "19921178434");

SELECT * FROM Product;
SELECT * FROM Stock;
SELECT * FROM Fornecedor;
SELECT * FROM Client;
