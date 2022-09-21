USE BD_PROYECTO1;
-- ----------------------------------------------
-- AGREGAR USUARIO 
CREATE TABLE USUARIO(
	idUsuario INT PRIMARY KEY auto_increment,
    user VARCHAR(20) unique,
    fullname VARCHAR(100) unique,
    email VARCHAR(100) unique,
    pwd VARCHAR(100) default NULL,
    photo VARCHAR(100) not null
) engine = innodb default charset = latin1;
-- 
-- TIPO DE ARCHIVO (PNG, JPG, JPGE, PDF) 
CREATE TABLE TIPOARCHIVO(
	idTipoArchivo INT PRIMARY KEY auto_increment,
    Tipo VARCHAR(5),
    Extension VARCHAR(5)
);
-- ----------------------------------------------
-- AMIGO
CREATE TABLE AMIGO(
    usuario1 INT,
    usuario2 INT,
    fechaAmistad DATE,
    
    CONSTRAINT PK_Amigo PRIMARY KEY(usuario1, usuario2),
    CONSTRAINT FK_UsuarioAmigo1 FOREIGN KEY(usuario1) REFERENCES USUARIO(idUsuario),
    CONSTRAINT FK_UsuarioAmigo2 FOREIGN KEY(usuario2) REFERENCES USUARIO(idUsuario)
);
-- ------------------------------------------------
-- ARCHIVO
CREATE TABLE ARCHIVO(
	idArchivo INT PRIMARY KEY AUTO_INCREMENT,
    file_name VARCHAR(50) not null,
	propietario INT NOT NULL,
    private tinyint ,
    URL VARCHAR(100),
    FechaCreacion DATE,
    FechaModificacion DATE,
    
    CONSTRAINT FK_ArchivoUsuario FOREIGN KEY(propietario) REFERENCES USUARIO(idUsuario)
);
-- -------------------------------------------------
DROP TABLE ARCHIVO;
DROP TABLE AMIGO;
DROP TABLE USUARIO;
DROP TABLE TIPOARCHIVO;


