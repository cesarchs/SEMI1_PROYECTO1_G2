import React, { useState } from "react";

import { MyFiles } from "../dashboard/my-files";

export function Dashboard(){

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return(
        <div className="container">
            <div className="row mt-3 justify-content-center">
                {/* SIDEBAR */}
                <div className="col-lg-3">
                    <div className="container bg-light shadow p-5">
                        {/* LOGO */}
                        <h4 className="text-center mb-3 text-dark">SuperStorage</h4>
                        <div className="mb-4">
                            <img src="https://dummyimage.com/300x300/000/fff" width="100%" alt=""></img>
                            <h5 className="text-center text-danger mt-4"> Nombre Usuario</h5>
                        </div>
                        {/* MENU */}
                        <span role="button" className={toggleState === 1 ? "bg-danger text-light d-block p-3" : "text-danger d-block p-3"} 
                            onClick={() => toggleTab(1)}>Mis Archivos</span>
                        <span role="button" className={toggleState === 2 ? "bg-danger text-light d-block p-3" : "text-danger d-block p-3"} 
                            onClick={() => toggleTab(2)}>Archivos de Amigos</span>
                        <span role="button" className={toggleState === 3 ? "bg-danger text-light d-block p-3" : "text-danger d-block p-3"} 
                            onClick={() => toggleTab(3)}>Mis Amigos</span>
                        <span role="button" className={toggleState === 4 ? "bg-danger text-light d-block p-3" : "text-danger d-block p-3"} 
                            onClick={() => toggleTab(4)}>Subir Archivo</span>
                    </div>
                </div>
                {/* CONTENT */}
                <div className="col-lg-9">
                    <div className="container bg-light shadow p-5 fh">
                        {/* MY FILES */}
                        <div className={toggleState === 1 ? "show-active" : "d-none"}>
                            <MyFiles></MyFiles>
                        </div>
                        {/* FRIENDS' FILES */}
                        <div className={toggleState === 2 ? "show-active" : "d-none"}>

                        </div>
                        {/* MY FRIENDS */}
                        <div className={toggleState === 3 ? "show-active" : "d-none"}>
                            
                        </div>
                        {/* UPLOAD A FILE */}
                        <div className={toggleState === 4 ? "show-active" : "d-none"}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}