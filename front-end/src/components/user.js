import React from "react";

export function User({id, url, userName, publicFiles, aggregable}){
    
    //AGREGAR AMIGO
    const handleClick = () => {
        let url = "http://localhost:5000/apiUsuarioN/editFile";
        let data = {
            idUsuario: localStorage.getItem("idUsuario")
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
    

    return( 
        <div className="col-6 p-2">
            {/* TITULO */}
            <div className="row border rounded m-2 bg-white">
                <div className="col-6 p-2">
                    <img src={url} width="150px" height="150px" alt=""/>
                </div>
                <div className="col-6 p-2">
                    <p>Nombre de Usuario: <h6 className="text-danger">{userName}</h6></p>
                    <p>Archivos Públicos: <h6 className="text-danger">{publicFiles}</h6></p>
                    { aggregable && <span role="button" className="btn btn-sm btn-outline-danger" onClick={handleClick}>Agregar Amigo</span> }
                </div>
            </div>
        </div>
    );
}