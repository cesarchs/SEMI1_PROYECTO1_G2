-- ---------------------------------------------------------------
-- CONSULTA LOGIN VALIDAR DATOS
-- ---------------------------------------------------------------
SELECT *FROM USUARIO WHERE (user = 'mine' AND pwd = aes_encrypt('1','administrador210305')) or (email = 'minerva@gmail.com' AND pwd = aes_encrypt('1','administrador210305'));
-- ---------------------------------------------------------------
-- CONSULTAR SI EL USUARIO EXISTE PARA AGREGAR
-- ---------------------------------------------------------------
SELECT * FROM USUARIO WHERE user = 'mine' or email = 'minerva@gmail.com' ; 
-- ---------------------------------------------------------------
-- CONSULTAS PARA LA PANTALLA PRINCIPAL
-- ---------------------------------------------------------------
SELECT idArchivo, file_name, private, URL, date_format(FechaCreacion, '%d/%m/%Y') as FechaCreada , date_format(FechaModificacion, '%d/%m/%Y') as FechaModificacion
FROM ARCHIVO WHERE propietario = '6' ORDER BY private ASC;
-- ---------------------------------------------------------------
-- CONSULTAS PARA CREAR ARCHIVO
-- ---------------------------------------------------------------
SELECT *FROM USUARIO WHERE user = 'mine8' AND pwd = aes_encrypt('9','administrador210305');
-- INSERTAR ARCHIVO DESPUES DE VALIDAR LA CONTRASENYA
INSERT INTO ARCHIVO(file_name, propietario, private, URL, FechaCreacion, FechaModificacion)
VALUES('archivousuario8',10, 0, '{archivousuario8.png}', DATE_SUB(now(), INTERVAL 6 HOUR),
DATE_SUB(now(), INTERVAL 6 HOUR));
SELECT *FROM ARCHIVO WHERE propietario=10;
-- ---------------------------------------------------------------
-- CONSULTAS PARA ELIMINAR ARCHIVO
-- ---------------------------------------------------------------
SELECT *FROM USUARIO WHERE user = 'mine8' AND pwd = aes_encrypt('9','administrador210305');
-- ELIMINAR ARCHIVO DESPUES DE VALIDAR DATOS
DELETE FROM ARCHIVO WHERE idArchivo = 10 AND propietario =10;
SELECT *FROM ARCHIVO WHERE propietario=10;
-- ---------------------------------------------------------------
-- CONSULTAS PARA EDITAR ARCHIVO
-- ---------------------------------------------------------------
SELECT * FROM USUARIO WHERE idUsuario = 10 AND pwd = aes_encrypt('9','administrador210305');
-- ACTUALIZAR ARCHIVO DESPUES DE VALIDAR DATOS.
UPDATE ARCHIVO SET file_name = 'archivoActualizado', private = 0 , FechaModificacion = DATE_SUB(now(), INTERVAL 6 HOUR) WHERE idArchivo = 11 AND propietario = 10 ;
SELECT *FROM ARCHIVO WHERE propietario=10;

-- ---------------------------------------------------------------
-- CONSULTAS PARA PANTALLA DE AGREGAR AMIGO
-- ---------------------------------------------------------------
SELECT *FROM ARCHIVO;
SELECT aux.idUsuario, aux.user, aux.ArchivosPublicos , aux.ArchivosPrivados
FROM (
		SELECT u.idUsuario, u.user, COUNT(CASE WHEN a.private = 0 THEN 0 END) as ArchivosPublicos, COUNT(CASE WHEN a.private=1 THEN 1 END) as ArchivosPrivados
		FROM USUARIO u
		INNER JOIN ARCHIVO a ON u.idUsuario = a.propietario
		WHERE u.idUsuario <> 1
		GROUP BY u.idUsuario, u.user 
		ORDER BY u.idUsuario ASC
	) aux
LEFT JOIN (SELECT usuario2 as idUsuario FROM AMIGO where usuario1 = 1) aux1 ON aux.idUsuario = aux1.idUsuario
LEFT JOIN (SELECT usuario1 as idUsuario FROM AMIGO where usuario2 = 1) aux2 ON aux.idUsuario = aux2.idUsuario
WHERE aux1.idUsuario is NULL AND aux2.idUsuario is NULL
ORDER BY aux.user ASC ;
-- ---------------------------------------------------------------
--  CONSULTAS PARA AGREGAR AMIGO
-- ---------------------------------------------------------------
SELECT fechaAmistad FROM AMIGO WHERE (usuario1 = 1 AND usuario2 = 2) OR (usuario1 = 2 AND usuario2 = 1);
-- INSERTAR AMISTAD DESPUES DE VALIDAD QUE NO SEAN AMIGOS
INSERT INTO AMIGO VALUES(1,6,  DATE_SUB(now(), INTERVAL 6 HOUR));
-- ---------------------------------------------------------------
-- CONSULTAS PARA OBTENER ARCHIVOS PUBLICOS DE AMIGOS
-- ---------------------------------------------------------------
SELECT *FROM ARCHIVO;
SELECT aux.idArchivo, aux.file_name, aux.user, date_format(aux.FechaModificacion, '%d/%m/%Y') AS FechaModificacion
FROM (
		SELECT a.idArchivo, u.idUsuario, a.file_name, u.user, a.FechaModificacion
		FROM USUARIO u
		INNER JOIN ARCHIVO a ON u.idUsuario = a.propietario
		WHERE a.private = 1  AND u.idUsuario <> 2
		-- GROUP BY u.idUsuario, u.user 
		-- ORDER BY u.user ASC
	) aux
INNER JOIN(
		(SELECT usuario2 as idUsuario FROM AMIGO where usuario1 = 2)
		UNION
		(SELECT usuario1 as idUsuario FROM AMIGO where usuario2 = 2)
    )aux1 ON aux.idUsuario = aux1.idUsuario
ORDER BY aux.user ASC

-- ---------------------------------------------------------------


