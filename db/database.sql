CREATE DATABASE IF NOT EXISTS TC1004B;

USE TC1004B;

CREATE TABLE Usuario (
  idUsuario INT NOT NULL AUTO_INCREMENT,
    nombreUsuario VARCHAR(25) NOT NULL,
    contrasena VARCHAR (25) NOT NULL,
    nombre VARCHAR (50) NOT NULL,
    apellido VARCHAR (50) NOT NULL,
    PRIMARY KEY(idUsuario)
);

CREATE TABLE Casa (
    idCasa INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    nombreCasa VARCHAR(255) NOT NULL,
    nombreRed VARCHAR(255) NOT NULL,
    contrasenaRed VARCHAR(255) NOT NULL,

    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Dispositivo (
    idDisp INT PRIMARY KEY AUTO_INCREMENT,
    idCasa INT NOT NULL,
    macAdress VARCHAR(20) NOT NULL,
    nombreDisp VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    modo INT NOT NULL,
    finManualFecha DATE NOT NULL,
    finManualHora TIME NOT NULL,

    FOREIGN KEY (idCasa) REFERENCES Casa(idCasa)
);

CREATE TABLE Fallas (
    idFalla INT PRIMARY KEY AUTO_INCREMENT,
    idDisp INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    concepto VARCHAR(1000) NOT NULL,

    FOREIGN KEY (idDisp) REFERENCES Dispositivo(idDisp)
);


CREATE TABLE Registro (
    idResgistro INT PRIMARY KEY AUTO_INCREMENT,
    idDisp INT NOT NULL,
    fecha DATE NOT NULL,  
    hora Time NOT NULL,
    lecturaSensor INT NOT NULL,
    accionTomada INT NOT NULL,
    
    FOREIGN KEY (idDisp) REFERENCES Dispositivo(idDisp)
);


CREATE TABLE Horario (
    idHorario INT PRIMARY KEY AUTO_INCREMENT,
    idDisp INT NOT NULL,
    diaSemana INT NOT NULL,
    horario TIME NOT NULL,
    duracion INT NOT NULL,
    accion INT NOT NULL,
    
    FOREIGN KEY (idDisp) REFERENCES Dispositivo(idDisp)
);


CREATE TABLE Comando (
    idComando INT NOT NULL AUTO_INCREMENT,
    idDisp INT,
    duracion INT NOT NULL,
    accion INT NOT NULL,
    estado VARCHAR(20) NOT NULL,
    PRIMARY KEY (idComando),
    FOREIGN KEY (idDisp) REFERENCES Dispositivo(idDisp)
);
