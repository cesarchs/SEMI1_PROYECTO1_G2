UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
FACULTAD DE INGENIERÍA
ESCUELA DE CIENCIAS Y SISTEMAS
SEMINARIO DE SISTEMAS 1
SEGUNDO SEMESTRE DE 2022

#
# 
# 
# 
#




 
                                    PROYECTO NO. 01
 
 
#
# 
# 
# 
#





 
      

 
 
 
 
                            GUATEMALA 11 DE SEPTIEMBRE DE 2022


# OBJETIVO DEL MANUAL


##### La finalidad de este manual es proporcionar al lector las diferentes configuraciones y la lógica con la cual se ha desarrollado el siguiente proyecto a mencionar. Se detalla acerca de cada una de las herramientas utilizadas y su forma de operación y aplicación.

##### Se identificará los aspectos y características que forman parte del proyecto, proporcionando una identidad y personalidad de lo cual el proyecto se ha ejecutado de manera que los desarrolladores podrán reconocer más fácilmente las ventajas, desventajas, características y funcionalidades que implican en el desarrollo del proyecto.

##### La siguiente guía se encuentra dividida en las herramientas que se usaron para la creación del sistema con una breve explicación paso a paso. El aplicativo web maneja diferentes funcionalidades el cual requieren de hardware y software el cual se explicará qué funcionamiento realiza cada uno de ellos, dando sugerencias para el debido uso del sistema de información.

##### Dar a conocer el uso adecuado del sistema en aspectos técnicos de manera descriptiva e ilustrada sobre los componentes y funcionalidades que conforman el buen funcionamiento del sistema de información. 

##### Se darán a conocer conceptos, definiciones y explicaciones de los componentes del aplicativo desde un punto de vista teórico para mayor entendimiento por parte del lector sobre el funcionamiento del sistema de información y herramientas.

# ARQUITECTURA DEL PROYECTO

### HERRAMIENTAS UTILIZADA

#### Consola de AWS

##### Es una aplicación web que engloba y hace referencia a un amplio conjunto de consolas de servicios para la administración de recursos de AWS.

#### MYSQL WORKBENCH

##### Es un entorno gráfico de diseño de bases de datos, servidores, administración y mantenimiento para el sistema MySQL. Además,  permite a los desarrolladores, arquitectos de datos y demás clientes diseñar, modelar, gestionar y generar bases de datos de manera visual o gráfica, incluyendo todos los elementos necesarios para realizar modelos con un alto nivel de complejidad.

#### TERMIUS

##### Es multiplataforma, lo que significa que puede acceder de forma segura a dispositivos Linux o IoT un dispositivo móvil, Android o iOS, así como desde cualquier computadora con Windows, Mac OS o Linux.  nos permite realizar conexiones ssh de manera segura; uno de los puntos más importantes a tener en cuenta a la hora de utilizar una herramienta así

##### NODEJS

##### Es un entorno de ejecución JavaScript de código abierto y multiplataforma para desarrollar aplicaciones de servidor, basado en una arquitectura no bloqueante y manejada por eventos para ayudar a los desarrolladores a crear aplicaciones distribuidas robustas.

#### PYTHON

##### Es un lenguaje de programación de propósito general, que es otra forma de decir que puede ser usado para casi todo. Lo más importante es que se trata de un lenguaje interpretado, lo que significa que el código escrito no se traduce realmente a un formato legible por el ordenador en tiempo de ejecución.


#### S3

##### Amazon Simple Storage Service (Amazon S3) es un servicio de almacenamiento de objetos que ofrece escalabilidad, disponibilidad de datos, seguridad y rendimiento líderes del sector. Los clientes de todos los tamaños y sectores pueden utilizar Amazon S3 para almacenar y proteger cualquier cantidad de datos para diversos casos de uso, tales como lagos de datos, sitios web, aplicaciones móviles, copia de seguridad y restauración, archivado, aplicaciones empresariales, dispositivos IoT y análisis de big data. Amazon S3 proporciona funciones de gestión para que pueda optimizar, organizar y configurar el acceso a sus datos para satisfacer sus requisitos empresariales, organizativos y de conformidad específicos.

#### EC2

##### Amazon Elastic Compute Cloud (Amazon EC2) proporciona capacidad de computación escalable en la nube de Amazon Web Services (AWS). El uso de Amazon EC2 elimina la necesidad de invertir inicialmente en hardware, de manera que puede desarrollar e implementar aplicaciones en menos tiempo. Puede usar Amazon EC2 para lanzar tantos servidores virtuales como necesite, configurar la seguridad y las redes, y administrar el almacenamiento. Amazon EC2 le permite escalar hacia arriba o hacia abajo para controlar los cambios en los requisitos o los picos de popularidad, con lo que se reduce la necesidad de prever el tráfico.


#### LOAD BALANCER

##### Es una tecnología diseñada para distribuir la carga de trabajo de trabajo entre distintos servidores o aplicaciones. El objetivo es optimizar las prestaciones globales de la infraestructura, así como su rendimiento y su capacidad.

#### RDS

##### Amazon Relational Database Service (Amazon RDS) es una colección de servicios administrados que facilita las tareas de configuración, operación y escalado de una base de datos en la nube

# COMO ESTA ESTRUCTURADO 

##### Para la implementación de esta aplicación wb se implemento la arquitectura en la nube de AWS, por lo que el proyecto se estructuro de la siguiente manera.

## FRONTEND

##### Se desarrolló en el marco de trabajo de React, colocando el sitio web estatico en la nube de AWS con la creación de un Bucket S3, donde llegan las peticiones de los clientes y visualizan la interfaz con la comunicación con el usuario. Este se conecto con dos maquinas virtuales en Amazon con el servicio de EC2.

## LOAD BALANCER

##### Se implemento un Balanceador de carga, con el fin de redigir el trafico de la infomacion por razones que si en cierta ocasión uno de los dos servidores falla, la aplicación puede seguir funcionando perfectamente.

## ALMACENAMIENTO

##### Para almacenar toda la información y tener el acceso de la misma se utilizo un Bucket S3 en la nube de AWS, con la utilidad de optimizar la velocidad de respuestas 

## BACKEND

##### Para la parte del Backend se realizaron dos servidor uno en Node y otro en Python dos herramientas diferentes creadas kcon EC2 y comunicadas con el balanceador de carga, para luego acceder a la base de daos para obtener los recursos segun sea el caso.

# USUARIOS IAM



##### Se crearon 3 usuarios IAM y un usuario Administrador quien es el que creo los usuarios IAM y asigno las politicas respectivas para cada usuario.

## USUARIO UNO

##### El usuario de Cesar_00634 se le asigno los permiso de: 
* Acceso Full de EC2
* Acceso Full de S3

#### PORQUE ESAS POLITICAS

##### Las siguientes politicas fueron asignadas ya que el usuario cuenta con la parte de: La creación del backend del servidor del Node y las configuraciones de S3 para el almacenamiento de imagenes.

## USUARIO DOS

##### El usuario de Carlos_201602560 se le asigno los permiso de: 
* Acceso Full de EC2

#### PORQUE ESAS POLITICAS

##### Las siguientes politicas fueron asignadas ya que el usuario cuenta con la parte de la creacion del Servidor de Python.

## USUARIO TRES

##### El usuario de Grethel_201700499 se le asigno los permiso de: 
* Acceso Full de Base de Datos.
* Acceso Full de S3.

#### PORQUE ESAS POLITICAS

##### Las siguientes politicas fueron asignadas ya que el usuario cuenta con la parte de la creación de la Base de datos, dar acceso por medio de reglas de entrada a las diferentes IP con acceso a la base. Se le brindo acceso a S3 para la creación del bucket y las politicas para asignar Publico el bucket.

# USUARIO CUATRO

##### El usuario de Administrador quien da todos los permisos y la elaboración misma de cada usuario IAM. Proporciona acceso completo a los servicios y recursos de AWS

# CONFIGURACIÓN DE SERVICIOS

## RDS - CONFIGURACIÓN

##### Ingresamos a la pagina de la consola de AWS URL: https://aws.amazon.com/es/console/ y le damos clic donde dice Iniciar sesion en la consola.

![](https://i.imgur.com/Q4hEunI.png)

##### Seguidamente nos aparecerá una ventana como la siguiente, donde deberemos ingresar nuestros datos con el usuario y contraseña IAM hecho previamente. Clic en Iniciar sesión.

![](https://i.imgur.com/IOXUWdM.png)

##### Una vez ingresado en el sistema le damos clic en el servicio de RDS.

![](https://i.imgur.com/dSAz2GQ.png)

##### Nos aparecerá la siguiente ventana, y le damos clic en Crear base de datos.

![](https://i.imgur.com/kahhSTN.png)

##### Una vez realizado esto, procedemos a dar las configuraciones respectivas de nuestra base de datos en AWS. Seleccionamos Creación Estándar y elegimos el motor de nuestra preferencia, en este proyecto se utilizó MYSQL.

![](https://i.imgur.com/4f6UBg3.png)

##### Previamente dado eso, nos apareceran las versiones disponibles, seleccionamos la que preferimos en este caso se utilizó la versión 8.0.28

![](https://i.imgur.com/hEMhLRu.png)

##### En plantillas seleccionamos la opción de capa gratuita que nos da AWS, de esta manera las opciones de disponibilidad y durabilidad se nos quedarán deshabilitados ya que AWS ya nos elige lo que contiene la capa gratuita.

![](https://i.imgur.com/Zu13jeY.png)

##### Le damos un nombre a nuestra base de datos, este nombre debe ser único a todas las instancias de base de datos creadas en AWS.

![](https://i.imgur.com/wi1lEMw.png)

##### Agregamos el nombre de nuestro root, seguido de una contraseña que se estará ingresando cada vez que deseamos conectarnos a la base de datos.

![](https://i.imgur.com/XwmbEjh.png)

##### Las siguientes configuraciones, dejamos las respuestas que nos da AWS.

![](https://i.imgur.com/J15t2qP.png)

##### Para el almacenamiento dejamos las opciones que da AWS ya que son para la capa gratuita.

![](https://i.imgur.com/WinJDw9.png)

##### EN conectividad dejamos las opciones que da AWS
![](https://i.imgur.com/ew711zt.png)

##### Damos clic donde dice Acceso Publico, para asi mas adelante le daremos acceso a los usuarios respectivos.

![](https://i.imgur.com/DJMRZhn.png)

##### Cambiamos el puerto de preferencia

![](https://i.imgur.com/060U4fW.png)

##### En autenticación de base de datos, damos clic en la primera para que así cada vez que queramos acceder deberemos tener la contraseña para permitir el acceso.

![](https://i.imgur.com/ZFFdfyI.png)

##### Dejamos supervisión así como esta.

![](https://i.imgur.com/eoQ9mmA.png)

##### Agregamos el nombre que tendrá nuestra base de datos

![](https://i.imgur.com/x9C9HyB.png)

##### La copia de seguridad dejamos los datos tal como aparecen.

![](https://i.imgur.com/higkbis.png)

##### Una vez realizado todos los cambios previamente descritos, damos clic en Crear base de datos.

![](https://i.imgur.com/RpkdVub.png)

##### Donde nos llevará a la siguiente vista, donde nos indica que nuestra base de datos ya ha sido creada exitosamente. Procedimos a dar clic en el nombre de instancia de nuestra base de datos

![](https://i.imgur.com/yVGi55s.png)

##### Nos aparecerá la siguiente ventana, donde podremos visualizar mas detalladamente los cambios realizados. En la primera parte nos muestra un breve resumen.

![](https://i.imgur.com/4f6Rd0C.png)

##### La siguiente parte ya nos muestra una información mas privada como el puerto, nuestro punto de enlace que nos servira para conectarnos desde mysql a la nube de la base de datos.

![](https://i.imgur.com/cGpTg2j.png)

##### Para la conexión a MYSQL es necesario tener descargado MYSQL WORKBENCH en este caso este fue el que se utilizó. Le damos clic en el icono de más

![](https://i.imgur.com/iXMIFMk.png)

##### Nos aparecerá la siguiente ventana donde en la casilla de Hostname ingresará el punto de enlace que nos dio AWS y colocamos el puerto que elegimos. Le damos clic en Test de Connection

![](https://i.imgur.com/Zoe4zOl.png)

##### Nos mostrará la ventana para el ingreso de la contraseña que previamente ingresamos

![](https://i.imgur.com/2ftgncm.png)

##### Para ir finalizando, le damos clic en ok, y ya nuestra conexión se habrá hecho exitosamente.

![](https://i.imgur.com/LuwQ4fb.png)

##### Para comprobar que la conexión se realiza correctamente nos deberá aparecer de esta manera nuestra base de datos 

![](https://i.imgur.com/ui0dAc3.png)

## S3 - CONFIGURACIÓN

##### Ingresamos a la pagina de la consola de AWS URL: https://aws.amazon.com/es/console/ y le damos clic donde dice Iniciar sesion en la consola.

![](https://i.imgur.com/Q4hEunI.png)

##### Seguidamente nos aparecerá una ventana como la siguiente, donde deberemos ingresar nuestros datos con el usuario y contraseña IAM hecho previamente. Clic en Iniciar sesión.

![](https://i.imgur.com/IOXUWdM.png)

##### Una vez ingresado le damos clic en donde dice S3, si en dado caso no nos apareciera clic en servicios y buscar S3.

![](https://i.imgur.com/9gYjo9x.png)

##### En la siguiente pestaña le daremos clic en Crear Bucket.

![](https://i.imgur.com/1K1kr0S.png)

##### El primer campo a rellenar es el nombre del bucket, colocamos el nombre que le daremos a nuestro Bucket tomar en cuenta que este nombre debe ser a nivel Global de todo AWS. La región que nos aparece en el siguiente campo la dejamos tal y como esta.

![](https://i.imgur.com/tJO6Vkq.png)

##### Dejamos tal y como está, las configuraciones de propiedad del objeto.

![](https://i.imgur.com/FzvftXb.png)

##### Desbloqueamos el apartado de acceso Público.

![](https://i.imgur.com/GwAbVzB.png)

##### Una vez desbloqueado, se nos desactivaran todas las demas opciones que habian esto habilitada, no seleccionamos ninguna  a excepcion de la ultima casilla que nos tira una advertencia, le damos clic en Reconozco que la configuración actual puede provocar que este bucket y los objetos que contiene se vuelvan públicos.

![](https://i.imgur.com/pTwTU1y.png)

##### Dejamos las demas configuraciones tal y como no los brinda AWS.

![](https://i.imgur.com/5WfNse2.png)

##### Por ultimo le damos clic en guardar bucket para crearlo.

![](https://i.imgur.com/87XeebP.png)

##### Ya con las configuraciones dadas nuestro bucket ahora nos aparecera en los bucket que tenemos disponibles.

![](https://i.imgur.com/4nvf9fC.png)

##### Ahora debemos darle las respectivas policitas a nuestro bucket, para ello le damos clic en el nombre de nuesto bucket. Una vez realizado esta acción nos llevara a los detalles de nuestro bucket, damos clic en la pestaña de Permisos.

![](https://i.imgur.com/8rR37rj.png)

#### Clic en Editar en el apartado de Politicas de Bucket.

![](https://i.imgur.com/sesdeS7.png)

##### Esta acción nos llevara a la siguiente Pestaña

![](https://i.imgur.com/Jq0FZyr.png)

##### Agregamos la politica tal y como aparece en la imagen siguiente con la unica diferencia que en Resource se añadira lo que nos brinda aws marcado en verde en la parte superior de la imagen.

![](https://i.imgur.com/XlDxf51.png)

##### Hecho estos cambios le damos clic en Guardar. Con eso esos cambios nuestro bucket se ha hecho de mara Pública.

##### Para fines de nuestro proyecto se creo 3 carpetas diferentes donde se almacenaran los diferentes tipos de archivos a subir en este caso son fotos, archivos de textos y  archivos pdf.

![](https://i.imgur.com/266YOGX.png)

#### Para fines de nuestro proyecto creamos dos bucket, en uno de ellos estara nuestro sitio web estatico en este caso utilizamos React para nuestro front, los pasos para crear el bucket son los mismos pasos mencionados anteriormente.

# EC2 - CONFIGURACION

##### Damos clic en el apartado que dice EC2

![](https://i.imgur.com/Mmp4kqz.png)

##### Como siguiente paso es dar clic en Lanzar Instancia.

![](https://i.imgur.com/Mjs5r29.png)

##### El siguiente campo es para nombre 
![](https://i.imgur.com/P6NLkTx.png)

##### Seleccionamos el Motor que va a tener nuestra máquina virtual.
![](https://i.imgur.com/4CnhdRn.png)

##### En tipo de instancia dejamos de preferencia las opciones de capa gratuita que nos da AWS.

![](https://i.imgur.com/UxgK8Ae.png)

##### Seleccionamos par de claves este nos permitira conectarnos a la instancia desde un administador de servidores.

![](https://i.imgur.com/2R7c4D8.png)

##### En configuración de Red dejamos las opciones predeterminadas que nos da AWS.

![](https://i.imgur.com/rj0lpqv.png)

##### En configuración de almacenamiento dejamos las opciones predeterminadas de AWS.

![](https://i.imgur.com/6C6UI3U.png)

##### Ya teniendo las configuraciones realizadas, damos clic en Lanzar Instancia.

![](https://i.imgur.com/5LMakTx.png

##### Para confirmar que nuestra instancia fue efectiva nos apareceran en la ventana de instancias donde podremos ejecutarlas y detenerlas en cualquier momento. Tener en cuenta que la capa gratuita tienen limite de horas, una vez pasada de esas horas AWS empezara a cobrar las horas usadas fuera de la capa gratuita.

![](https://i.imgur.com/Uk5vLwH.png)

# LOAD BALANCER - CONFIGURACION

##### Para las configuraciones del balanceador de carga nos dirigimos en la opion de Equilibrio de carga y le damos clic en Balanceador de carga.

![](https://i.imgur.com/i8Rs4Gp.png)

##### Nos llevara a una ventana y le damos clic en el boton que dice Crear Balanceador de carga.

![](https://i.imgur.com/79L9N91.png)

##### Para ello seleccionamos que tipo de balanceador de cargas necesitamos (Para este proyecto se implemento un balanceador de tipo Http/Https). 

![](https://i.imgur.com/i5s4R8j.png)

##### Ingresamos el nombre que tendra nuestro balanceador de carga, las demas configur4acion en Basic Configuration dejamos las predeterminadas que nos da AWS.

![](https://i.imgur.com/OQGRNZR.png)

##### En las configuraciones de Network mapping en VPC dejamos la por default que nos da AWS, en Mapping seleccionamos la region en las que nos encontramos.

![](https://i.imgur.com/8wa7IIl.png)

##### Configuraciones de Security groups, para esta confiraciones deberamos crear un grupo de serguridad para ello seleccionamos o bien damos clic en la opcion que dice crear grupo de seguridad.

![](https://i.imgur.com/kIPi9oH.png)

##### Nos direccionara a la siguiente pantalla, ingresamos el nombre que tendra nuestro grupo de seguridad.

![](https://i.imgur.com/S1IuSl6.png)

##### Para nuestro grupo de seguridad es necesario definir reglas de entrada y de salida.

![](https://i.imgur.com/hfZbfw1.png)

##### En etiquetas opcional dejamos lo predefinido por AWS, y damos clic en crear grupo de seguridad.

![](https://i.imgur.com/nWOA2yS.png)

#### Ya con las configuraciones realizadas, dentro del listado de grupo de seguridad nos aparece el que hemos creado.

![](https://i.imgur.com/TvJw89u.png)

##### Para ver los detalles de nuestro grupo de seguridad solo basta con seleccionar bajar el scroll y en l apartado de detalle nos mostrara las configuraciones ya realizadas con anterioridad.

![](https://i.imgur.com/RH1y3rG.png)

##### Podemos visualizar las reglas de salida y de entrada que tendra nuestro por si deseamos modificarlas, eliminarlas o bien agregar una nueva regla.

![](https://i.imgur.com/PEJuqWF.png)

##### Ya teniendo nuestro grupo de seguridad volvemos a las configuraciones del Load Balancer y ya en grupo de seguridad tendremos los grupos creados, seleccionamos el que necesitamos.

![](https://i.imgur.com/DHhM0Po.png)

##### En las configuraciones de Listeners and routing, escribimos el puerto que estaremos escuchando.

![](https://i.imgur.com/W0QEtdz.png)

##### En las configuraciones de add-on-services dejamos las predefinidas por AWS. De igual manera en Tags. En summary podremos visualizar las configuraciones que le hemos dado a nuestro load balancer, motivos que AWS nos brinda antes de crear nuesto balanceador de carga.


![](https://i.imgur.com/8rIiU02.png)

##### Una vez realizado todas las configuraciones necesarias le damos clic en Cread Load Balancer.

![](https://i.imgur.com/Sy8bGFj.png)

##### Una vez realizado todas nuestras confiruaciones tendremos nuestro balanceador de carga.
![](https://i.imgur.com/UmWAxWd.png)

# CONCLUSIONES


##### Este manual se realiza con el fin de brindar soporte al lector, teniendo una breve idea de cómo fue implementado el sistema.

##### El presente proyecto me permitió adquirir el conocimiento de cómo se realizan la elaboración de políticas a los diferentes usuario IAM para el funcionamiento respectivo, con los procesos actualizados y mejorados.

##### Se desarrolló el respectivo manual con la finalidad de dar a conocer la información necesaria para realizar el mantenimiento, instalación y exploración del sistema, el cual consta de diferentes actividades para el mejoramiento de procesos.

##### Ofrece la información necesaria de cómo se está realizando para que la persona (Desarrolladora) que quiera editar el sistema lo haga de una manera apropiada. dando a conocer la estructura del desarrollo del aplicativo.

##### El manual detalla los aspectos técnicos e informáticos del sistema  con la finalidad de explicar la estructura del aplicativo al personal que quiera administrarlo, editarlo o configurarlo









