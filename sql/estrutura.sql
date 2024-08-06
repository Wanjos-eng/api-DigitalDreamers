CREATE DATABASE pdv

CREATE TABLE usuarios (
    id serial primary key,
    nome text not null,
    email text not null unique,
    senha text not null
);

CREATE TABLE categorias (
    id serial primary key,
    descricao text not null
);