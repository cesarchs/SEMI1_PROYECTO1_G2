import React from "react";

export function FilesHeader(){
    return(
        <div className="card mb-2 bg-danger text-light shadow-sm">
            <div className="card-body p-1 m-1">
                <div className="row text-center">
                    <div className="col-4 ">
                        Nombre de Archivo
                    </div>
                    <div className="col-2">
                        Propietario
                    </div>
                    <div className="col-2">
                        Creación
                    </div>
                    <div className="col-2">
                        Visibilidad
                    </div>
                    <div className="col-2">
                        Acciones
                    </div>
                </div>
            </div>
        </div>
    );
}