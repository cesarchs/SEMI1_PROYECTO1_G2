USE BD_PROYECTO1;
SELECT *FROM USUARIO;

SELECT USUARIO.idUsuario, USUARIO.user, convert(aes_decrypt(pwd,'administrador210305')using utf8) as contraseniaDesencriptada FROM USUARIO;

INSERT INTO USUARIO(user, fullname, email, pwd, photo)
VALUES('mine10', 'minerva10 suarez', 'minerva10@gmail.com', aes_encrypt('LaContrasenyaEncriptada1998$#','administrador210305'), 'photo.png');

INSERT INTO USUARIO(user, fullname, email, pwd, photo)
VALUES('mine', 'minerva suarez', 'minerva@gmail.com', aes_encrypt('1','administrador210305'), 'photo.png');

INSERT INTO USUARIO(user, fullname, email, pwd, photo)
VALUES('mine1', 'minerva1 suarez', 'minerva1@gmail.com', aes_encrypt('2','administrador210305'), 'photo.png');

INSERT INTO USUARIO(user, fullname, email, pwd, photo)
VALUES('mine2', 'minerva2 suarez', 'minerva2@gmail.com', aes_encrypt('3','administrador210305'), 'photo.png');

INSERT INTO USUARIO(user, fullname, email, pwd, photo)
VALUES('mine3', 'minerva3 suarez', 'minerva3@gmail.com', aes_encrypt('4','administrador210305'), 'photo.png');

INSERT INTO USUARIO(user, fullname, email, pwd, photo)
VALUES('mine4', 'minerva4 suarez', 'minerva4@gmail.com', aes_encrypt('5','administrador210305'), 'photo.png');

INSERT INTO USUARIO(user, fullname, email, pwd, photo)
VALUES('mine5', 'minerva5 suarez', 'minerva5@gmail.com', aes_encrypt('6','administrador210305'), 'photo.png');

INSERT INTO USUARIO(user, fullname, email, pwd, photo)
VALUES('mine6', 'minerva6 suarez', 'minerva6@gmail.com', aes_encrypt('7','administrador210305'), 'photo.png');

INSERT INTO USUARIO(user, fullname, email, pwd, photo)
VALUES('mine7', 'minerva7 suarez', 'minerva7@gmail.com', aes_encrypt('8','administrador210305'), 'photo.png');

INSERT INTO USUARIO(user, fullname, email, pwd, photo)
VALUES('mine8', 'minerva8 suarez', 'minerva8@gmail.com', aes_encrypt('9','administrador210305'), 'photo.png');

INSERT INTO USUARIO(user, fullname, email, pwd, photo)
VALUES('mine9', 'minerva9 suarez', 'minerva9@gmail.com', aes_encrypt('10','administrador210305'), 'photo.png');

-- ---------------------------------------------------
-- INSERTANDO TIPOS DE ARCHIVOS
INSERT INTO TIPOARCHIVO(Tipo,Extension)
VALUES('PDF','.pdf');
INSERT INTO TIPOARCHIVO(Tipo,Extension)
VALUES('TXT','.txt');
INSERT INTO TIPOARCHIVO(Tipo,Extension)
VALUES('PNG','.png');
INSERT INTO TIPOARCHIVO(Tipo,Extension)
VALUES('JPG','.jpg');
INSERT INTO TIPOARCHIVO(Tipo,Extension)
VALUES('JPEG','.jpeg');
-- ----------------------------------------------------

-- ---------------------------------------------------
--  INSERTANDO AMIGOS 
INSERT INTO AMIGO(usuario1,usuario2,fechaAmistad)
VALUES(1,2,DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO AMIGO(usuario1,usuario2,fechaAmistad)
VALUES(3,4,DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO AMIGO(usuario1,usuario2,fechaAmistad)
VALUES(5,1,DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO AMIGO(usuario1,usuario2,fechaAmistad)
VALUES(4,2,DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO AMIGO(usuario1,usuario2,fechaAmistad)
VALUES(2,3,DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO AMIGO(usuario1,usuario2,fechaAmistad)
VALUES(9,1,DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO AMIGO(usuario1,usuario2,fechaAmistad)
VALUES(7,8,DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO AMIGO(usuario1,usuario2,fechaAmistad)
VALUES(7,2,DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO AMIGO 
VALUES(3,7,DATE_SUB(now(), INTERVAL 6 HOUR));
SELECT *FROM AMIGO;
-- ------------------------------------
-- INSERTANTO DATOS PARA ARCHIVO
INSERT INTO ARCHIVO(file_name,propietario,private,URL,FechaCreacion,FechaModificacion)
VALUES ('archivo1',1,1, 'archivo1.pdf' ,DATE_SUB(now(), INTERVAL 6 HOUR),DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO ARCHIVO(file_name,propietario,private,URL,FechaCreacion,FechaModificacion)
VALUES ('archivo1.1',1,1, 'archivo1.1.pdf' ,DATE_SUB(now(), INTERVAL 6 HOUR),DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO ARCHIVO(file_name,propietario,private,URL,FechaCreacion,FechaModificacion)
VALUES ('archivo1.2',1,1, 'archivo1.1.pdf' ,DATE_SUB(now(), INTERVAL 6 HOUR),DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO ARCHIVO(file_name,propietario,private,URL,FechaCreacion,FechaModificacion)
VALUES ('archivoprivadousuario1',1,1, 'archivo1.pdf' ,DATE_SUB(now(), INTERVAL 6 HOUR),DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO ARCHIVO(file_name,propietario,private,URL,FechaCreacion,FechaModificacion)
VALUES ('archivo2pubico',2,0, 'archivo2publico.pdf' ,DATE_SUB(now(), INTERVAL 6 HOUR),DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO ARCHIVO(file_name,propietario,private,URL,FechaCreacion,FechaModificacion)
VALUES ('archivo3',3,0, 'archivo3.pdf' ,DATE_SUB(now(), INTERVAL 6 HOUR),DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO ARCHIVO(file_name,propietario,private,URL,FechaCreacion,FechaModificacion)
VALUES ('archivo4',4,1, 'archivo4.pdf' ,DATE_SUB(now(), INTERVAL 6 HOUR),DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO ARCHIVO(file_name,propietario,private,URL,FechaCreacion,FechaModificacion)
VALUES ('archivo5',5,0, 'archivo5.pdf' ,DATE_SUB(now(), INTERVAL 6 HOUR),DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO ARCHIVO(file_name,propietario,private,URL,FechaCreacion,FechaModificacion)
VALUES ('archivo6',6,1, 'archivo6.pdf' ,DATE_SUB(now(), INTERVAL 6 HOUR),DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO ARCHIVO(file_name,propietario,private,URL,FechaCreacion,FechaModificacion)
VALUES ('archivo7',7,0, 'archivo7.pdf' ,DATE_SUB(now(), INTERVAL 6 HOUR),DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO ARCHIVO(file_name,propietario,private,URL,FechaCreacion,FechaModificacion)
VALUES ('archivo8',8,1, 'archivo8.pdf' ,DATE_SUB(now(), INTERVAL 6 HOUR),DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO ARCHIVO(file_name,propietario,private,URL,FechaCreacion,FechaModificacion)
VALUES ('archivo9',9,0, 'archivo9.pdf' ,DATE_SUB(now(), INTERVAL 6 HOUR),DATE_SUB(now(), INTERVAL 6 HOUR));
INSERT INTO ARCHIVO(file_name,propietario,private,URL,FechaCreacion,FechaModificacion)
VALUES ('archivo10',10,1, 'archivo10.pdf' ,DATE_SUB(now(), INTERVAL 6 HOUR),DATE_SUB(now(), INTERVAL 6 HOUR));
select *from USUARIO;
