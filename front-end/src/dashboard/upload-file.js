import React from "react";

export function UploadFile(){
    return (
        <div className="container p-0">
            {/* TITLE */}
            <div className="nav navbar navbar-inverse navbar-expand-lg p-0">
                <h4 className="navbar-brand">Subir Archivo</h4>
                {/* <div className="navbar-nav">
                    <span role="button" className={toggleState === 1 ? "bg-danger text-light p-2 ms-2" : "p-2 ms-2"} 
                            onClick={() => toggleTab(1)}>Todos</span>
                    <span role="button" className={toggleState === 2 ? "bg-danger text-light p-2 ms-2" : "p-2 ms-2"} 
                            onClick={() => toggleTab(2)}>Privados</span>
                    <span role="button" className={toggleState === 3 ? "bg-danger text-light p-2 ms-2" : "p-2 ms-2"} 
                            onClick={() => toggleTab(3)}>Públicos</span>
                </div> */}
            </div>
            <hr className="mb-3 mt-2"></hr>
        </div>
    );
}