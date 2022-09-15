import React from "react";
import { Link } from 'react-router-dom';

// import { useEffect, useState} from 'react';


export function Register(){

    // const [user, setUser] = useState([])

    // useEffect(() => {
    //     const reqOps = {
    //         method: 'POST',            
    //         headers: { 'Content-Type': 'application/json' }
    //     };
        
    //     fetch(`http://localhost:5000/subirFoto`, reqOps)      
    //     .then(res => res.json())
    //     .then(data => setPersonas(data));
  
    // }, []);

    return(
        <div className="container text-light">
            <form>
                <div className="row justify-content-center align-items-center mt-5 ">
                    <div className="col-lg-6 p-5">
                        <h2 className="text-center mt-3">Registro de Usuario</h2>
                        <hr/>
                        <div className="form-group mt-3">
                            <input name="text" type="text" className="form-control" placeholder="Nombre de Usuario" required/>
                        </div>
                        <div className="form-group mt-3">
                            <input name="email" type="email" className="form-control" placeholder="Correo electrónico" required/>
                        </div>
                        <div className="form-group mt-3">
                            <input name="password" type="password" className="form-control" placeholder="Contraseña" required/>
                        </div>
                        <div className="form-group mt-3">
                            <input name="cofirmPassword" type="password" className="form-control" placeholder="Confirmar Contraseña" required/>
                        </div>
                        <div className="form-group mt-3">
                            <input name="image" type="file" className="form-control" placeholder="Subir Imagen" required/>
                        </div>
                        <div className="row justify-content-center align-items-center mt-4">
                            <div className="col-5 p-2">
                                <button type="button" className="btn btn-danger col-12">Registrarse</button>
                            </div>
                            <div className="col-5 p-2">
                                <Link to="/" className="btn btn-secondary col-12">Cancelar</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}