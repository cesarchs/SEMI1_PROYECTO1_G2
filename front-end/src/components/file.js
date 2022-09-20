import React, { useState } from "react"

import { VscFilePdf, VscFileMedia, VscFile, VscClose } from "react-icons/vsc";

export function File({id, url, fileName, fileType, owner, date, isPrivate, editable}){
    
    const [inputfileName, setInputFileName] = useState(fileName);
    const [inputPrivate, setInputPrivate] = useState(isPrivate);
    const [inputPwd, setInputPwd] = useState("");

    const handleCheck= (e) =>{
        setInputPrivate(e.target.checked);
    }

    //EDITAR ARCHIVO
    const handleClick = () => {
        let url = "http://localhost:5000/apiUsuarioN/editFile";
        let data = {
            idUsuario: localStorage.getItem("idUsuario"),
            id_file: id,
            file_name: inputfileName,
            private: inputPrivate,
            pwd: inputPwd
        };
        console.log(data)
        let status = 0;
        fetch(url, {
            method:'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            status = result.status;
            if(status === 200){
                alert("Archivo modificado con éxito!")
            }else{
                alert("Error al modificar el archivo!")
            }
            window.location.reload(false);
        });
    };

    //ELIMINAR ARCHIVO
    const handleClickEliminate = () =>{
        let url = "http://localhost:5000/apiUsuarioN/deleteFile";
        let data = {
            idUsuario: localStorage.getItem("idUsuario"),
            id_file: id,
            pwd: inputPwd
        };
        let status = 0;
        fetch(url, {
            method:'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            status = result.status;
            if(status === 200){
                alert("Archivo modificado con éxito!")
                
            }else{
                alert("Error al modificar el archivo!")
            }
            window.location.reload(false);
        });
        

    };

    //ICON 
    let icon =<VscFile size="30px" className="me-2" color="dimgray"/>;
    if(fileType !== undefined){
        if(fileType.toLowerCase() === 'pdf'){
            icon = <VscFilePdf size="30px" className="me-2" color="red"/>
        }else if(fileType.toLowerCase() === 'img'){
            icon = <VscFileMedia size="30px" className="me-2" color="DarkCyan"/>
        }
    }

    //PRIVATE OR PUBLIC
    let visibility = isPrivate === 1 ? 
        <small className="text-danger">Privado</small> : 
        <small className="text-success">Público</small>

    return( 
        <div className="card mb-2 bg-light">
                {/* TITULO */}
            <div className="card-body p-1 m-1">
                <div className="row">
                    <div className="col-4">
                        {icon}
                        {fileName}
                    </div>
                    <div className="col-2 text-center">
                        <small className="text-secondary">{owner}</small>
                    </div>
                    <div className="col-2 text-center">
                        <small className="text-secondary">{date}</small>
                    </div>
                    <div className="col-2 text-center">
                        {visibility}
                    </div>
                    <div className="col-2 text-center">
                        
                        { editable && <span role="button" className="btn btn-sm btn-outline-danger" data-toggle="modal" data-target={"#modal"+id}>Editar</span> }
                        <a href={url} target="_blank" rel="noreferrer" role="button" className="btn btn-sm btn-outline-primary ms-2">Ver</a>
                    </div>
                </div>
                

                {/* MODAL PARA EDITAR */}
                <div className="modal fade" id={"modal"+id}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Archivo</h5>
                                <button type="button" className="close btn btn-danger ps-2 pe-2" data-dismiss="modal" aria-label="Close">
                                    <VscClose size="20px"/>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    Nombre del Archivo:
                                    <input name="fileName" type="text" className="form-control col-12" defaultValue={fileName} onChange={(e) => setInputFileName(e.target.value)} required/> 
                                </div>
                                <div className="form-group mt-3">                                        
                                    Archivo Privado:
                                    <div className="form-check form-switch form-switch-md">
                                        <input name="private" className="form-check-input" type="checkbox" defaultChecked={isPrivate} onChange={handleCheck}></input>
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    Contraseña:
                                    <input name="password" type="password" className="form-control col-12" placeholder="Ingrese Contraseña" onChange={(e) => setInputPwd(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-danger" data-dismiss="modal" onClick={handleClickEliminate}>Eliminar Arcivo</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={handleClick}>Guardar Cambios</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}