import React from "react";
import { Link } from 'react-router-dom'

export function Header(){
    return(
        <div className="container mt-4">
            <nav className="navbar navbar-inverse navbar-expand-lg navbar-light bg-light p-3 shadow">
                <a className="navbar-brand" href="/">SuperSorage</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav">
                        <Link to="/login" className="nav-item nav-link">Iniciar Sesión</Link>
                        <Link to="/register" className="nav-item nav-link">Registrarse</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}