import React, { useState } from "react";

import { File } from "../components/file";

export function MyFiles(){

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return(
        <div className="container">
            {/* TITLE */}
            <div className="nav navbar navbar-inverse navbar-expand-lg p-0">
                <h4 className="navbar-brand">Mis Archivos</h4>
                <div className="navbar-nav">
                    <span role="button" className={toggleState === 1 ? "bg-danger text-light p-2 ms-2" : "p-2 ms-2"} 
                            onClick={() => toggleTab(1)}>Todos</span>
                    <span role="button" className={toggleState === 2 ? "bg-danger text-light p-2 ms-2" : "p-2 ms-2"} 
                            onClick={() => toggleTab(2)}>Privados</span>
                    <span role="button" className={toggleState === 3 ? "bg-danger text-light p-2 ms-2" : "p-2 ms-2"} 
                            onClick={() => toggleTab(3)}>Públicos</span>
                </div>
            </div>
            <hr></hr>
            {/* CONTENT */}
            
            <div className="">
                <File fileName={"Arhivo1.pdf"} fileType={"pdf"} owner={"Yo"} date={"09/06/2022"} visibility={"Público"}/>
                <File fileName={"Arhivo2.txt"} fileType={"txt"} owner={"Yo"} date={"09/06/2022"} visibility={"Privado"}/>
                <File fileName={"Arhivo3.png"} fileType={"img"} owner={"Yo"} date={"09/06/2022"} visibility={"Privado"}/>
            </div>
        </div>
    );
}