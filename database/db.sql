CREATE DATABASE agendaphp;
USE agendaphp;

CREATE TABLE contactos(
	id int(11) not null primary key auto_increment,
	nombre varchar(60) not null,
	empresa varchar(50) not null,
	telefono varchar(15) not null
);
