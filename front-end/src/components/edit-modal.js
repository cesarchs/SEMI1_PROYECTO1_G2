import React from "react";


export function EditModal({id, fileName, isPrivate}){

    return(
        <div className="container">
            <form>
                <div className="row mt-3">
                    <div className="col">
                        Nombre del Archivo:
                        <input name="fileName" type="text" className="form-control" required/>
                    </div>
                    <div className="col">
                        Contraseña:
                        <input name="password" type="password" className="form-control" placeholder="Ingrese Contraseña" required/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                    <div className="form-check form-switch form-switch-md">
                        <input name="private" className="form-check-input" type="checkbox" id="switch"></input>
                        <label className="custom-control-label m-1 ms-3" for="switch">Archivo Privado</label>
                    </div>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-danger col-12">Modificar</button>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-secondary col-12">Cancelar</button>
                    </div>
                </div>
            </form> 
        </div>
    )
}