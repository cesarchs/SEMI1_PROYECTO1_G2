import React from "react";

export function User({id, url, userName, publicFiles, fullname, email, aggregable}){
    

    //AGREGAR AMIGO
    const handleClick = () => {
        // {
        //     "id_user":"12",
        //     "id_friend":"12"
        // }
        let url = "http://localhost:5000/apiUsuarioN/addFriend";
        let data = {
            id_user: localStorage.getItem("idUsuario"),
            id_friend: id
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
                alert("Amigo agregado con éxito!")
            }else{
                alert("Error al agregar el amigo")
            }
            window.location.reload(false);
        });
    };
    

    return( 
        <div className="col-6 p-2">
            {/* TITULO */}
            <div className="row border rounded m-1 bg-white">
                <div className="col-6 p-2">
                    <img src={url} width="150px" height="170px" alt=""/>
                </div>
                <div className="col-6 p-2 ">
                    <p>Nombre de Usuario: <strong className="text-danger">{userName}</strong></p>
                    { !aggregable &&<p>Nombre: <strong className="text-danger">{fullname}</strong></p>}
                    { !aggregable &&<p>Correo: <strong className="text-danger paragraph">{email}</strong></p>}
                    { aggregable && <p>Archivos Públicos: <strong className="text-danger">{publicFiles}</strong></p>}
                    { aggregable && <span role="button" className="btn btn-sm btn-outline-danger" onClick={handleClick}>Agregar Amigo</span> }
                </div>
            </div>
        </div>
    );
}