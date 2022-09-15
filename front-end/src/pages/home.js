import React from "react";

import { Header } from "../components/header";

export function Home(){
    return(
        <div className="text-light">
            <Header/>
            <div className="container mt-5">
                <section className="jumbotron text-center">
                    <div className="container">
                        <h2 className="jumbotron-heading">Proyecto N°1 - Grupo #2</h2>
                        <p className="lead mt-5">
                            <b>Descripción de la aplicación:</b>
                        </p>
                        <p className="lead">
                            Esta aplicación consiste en el almacenamiento de archivos públicos y
                            privados con las opciones de agregar amigos y poder ver sus archivos compartidos y con la
                            posibilidad de compartir nuestros propios archivos para que estos los puedan ver y también
                            tener la opción de guardar archivos en modo secreto.
                        </p>
                        <p>
                            <p className="btn btn-primary my-2">Iniciar Sesión</p>
                        </p>
                    </div>
                </section>
            </div>

            <div className="container mt-5">
                <footer className="footer text-center text-light">
                    <div className="inner">
                        <small>
                        <p>
                            <a href="https://google.com" className="text-light">Repositorio Github</a> | Grupo #2
                        </p>
                        </small>                        
                    </div>
                </footer>
            </div>
        </div>
    );
}
