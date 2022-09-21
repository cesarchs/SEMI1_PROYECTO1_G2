import React, { useState } from "react";

import { MyFiles } from "../dashboard/my-files";
import { FriendFiles } from "../dashboard/friend-files";
import { UploadFile } from "../dashboard/upload-file";
import { Friends } from "../dashboard/friends";

export function Dashboard(){

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
        if(index === 5){
            localStorage.clear();
            window.location.href = "./"
        }
    };

    let fullname = localStorage.getItem("fullname");
    let photo = localStorage.getItem("photo");

    return(
        <div className="container">
            <div className="row mt-3 justify-content-center">
                {/* SIDEBAR */}
                <div className="col-lg-3">
                    <div className="container bg-light shadow p-4">
                        {/* LOGO */}
                        <h3 className="text-center mb-3 text-dark">SuperStorage</h3>
                        <hr/>
                        <div className="mb-4">
                            <img src={photo} width="100%" alt=""></img>
                            <h5 className="text-center text-danger mt-3">{fullname}</h5>
                        </div>
                        {/* MENU */}
                        <span role="button" className={toggleState === 1 ? "btn bg-danger text-light d-block mb-2 shadow" : "btn text-danger d-block mb-2 "} 
                            onClick={() => toggleTab(1)}>Mis Archivos</span>
                        <span role="button" className={toggleState === 2 ? "btn bg-danger text-light d-block mb-2 shadow" : "btn text-danger d-block mb-2"} 
                            onClick={() => toggleTab(2)}>Archivos de Amigos</span>
                        <span role="button" className={toggleState === 3 ? "btn bg-danger text-light d-block mb-2 shadow" : "btn text-danger d-block mb-2"} 
                            onClick={() => toggleTab(3)}>Amigos</span>
                        <span role="button" className={toggleState === 4 ? "btn bg-danger text-light d-block mb-2 shadow" : "btn text-danger d-block mb-2"} 
                            onClick={() => toggleTab(4)}>Subir Archivo</span>
                        <span role="button" className={toggleState === 5 ? "btn bg-danger text-light d-block mb-2 shadow" : "btn text-danger d-block mb-2"} 
                            onClick={() => toggleTab(5)}>Cerrar Sesión</span>
                    </div>
                </div>
                {/* CONTENT */}
                <div className="col-lg-9">
                    <div className="container bg-light shadow p-4 fh">
                        {/* MY FILES */}
                        <div key={1} className={toggleState === 1 ? "show-active" : "d-none"}>
                            <MyFiles></MyFiles>
                        </div>
                        {/* FRIENDS' FILES */}
                        <div key={2} className={toggleState === 2 ? "show-active" : "d-none"}>
                            <FriendFiles></FriendFiles>
                        </div>
                        {/* MY FRIENDS */}
                        <div key={3} className={toggleState === 3 ? "show-active" : "d-none"}>
                            <Friends></Friends>
                        </div>
                        {/* UPLOAD A FILE */}
                        <div key={4} className={toggleState === 4 ? "show-active" : "d-none"}>
                            <UploadFile></UploadFile>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}