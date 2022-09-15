import React from "react";
import { Link } from 'react-router-dom'


export function Login(){
    return(
        <div className="container text-light">
            <div className="row justify-content-center align-items-center mt-5 ">
                <div className="col-lg-6 p-5 mt-5">
                    <h2 className="text-center">Iniciar Sesión</h2>
                    <hr/>
                    <form>
                        <div className="form-group mt-3">
                            <input name="nickname" type="text" className="form-control" placeholder="Nombre de Usuario o Correo"/>
                        </div>
                        <div className="form-group mt-3">
                            <input name="password" type="password" className="form-control" placeholder="Contraseña"/>
                        </div>
                        <div className="row justify-content-center align-items-center mt-4">
                            <div className="col-5 p-2">
                                <button type="button" className="btn btn-danger col-12">Iniciar Sesión</button>
                            </div>
                            <div className="col-5 p-2">
                                <Link to="/register" className="btn btn-secondary col-12">Registrarse</Link>
                            </div>
                        </div>
                    </form> 
                </div>
            </div>
        </div>
    );
}