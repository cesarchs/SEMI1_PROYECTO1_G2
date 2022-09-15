import React, {useState} from "react";

import { File } from "../components/file";
import { FilesHeader } from "../components/files-header";

export function FriendFiles(){
    return(
        <div className="container p-0">
            {/* TITLE */}
            <div className="nav navbar navbar-inverse navbar-expand-lg p-0">
                <h4 className="navbar-brand">Archivos de Amigos</h4>
                <div className="navbar-nav">
                    <input className="form-control  form-control-sm mr-sm-2" type="search" placeholder="Buscar Archivo" aria-label="Search"/>
                    <button className="btn btn-sm btn-danger my-2 my-sm-0" type="submit">Buscar</button>
                </div>
            </div>
            <hr className="mb-3 mt-2"></hr>
            
            {/* CONTENT */}
            <FilesHeader></FilesHeader>
            <File fileName={"Arhivo1.pdf"} fileType={"pdf"} owner={"Pedro"} date={"09/06/2022"} isPrivate={false}/>
            <File fileName={"Arhivo2.txt"} fileType={"txt"} owner={"Juan"} date={"09/06/2022"} isPrivate={false}/>
            <File fileName={"Arhivo3.png"} fileType={"img"} owner={"Carlos"} date={"09/06/2022"} isPrivate={false}/>
        </div>
    );
}

export function MyFriends(){
    
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return(
        <div className="container p-0">
            {/* TITLE */}
            <div className="nav navbar navbar-inverse navbar-expand-lg p-0">
                <h4 className="navbar-brand">Mis amigos</h4>
                <div className="navbar-nav">
                <span role="button" className={toggleState === 1 ? "btn btn-sm bg-danger text-light" : "btn btn-sm"} 
                            onClick={() => toggleTab(1)}>Mis Amigos</span>
                    <span role="button" className={toggleState === 2 ? "btn btn-sm bg-danger text-light ms-2" : "btn btn-sm ms-2"} 
                            onClick={() => toggleTab(2)}>Buscar Amigos</span>
                </div>
            </div>
            <hr className="mb-3 mt-2"></hr>
            <div className="container p-0">

            </div>
        </div>
    );
}