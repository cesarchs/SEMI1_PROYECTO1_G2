import React from "react"

import { VscFilePdf, VscFileMedia, VscFile } from "react-icons/vsc";

import { EditModal } from "./edit-modal"

export function File({id, fileName, fileType, owner, date, isPrivate, editable}){
    
    //ICON 
    let icon =<VscFile size="30px" className="me-2"/>;

    if(fileType.toLowerCase() === 'pdf'){
        icon = <VscFilePdf size="30px" className="me-2"/>
    }else if(fileType.toLowerCase() === 'img'){
        icon = <VscFileMedia size="30px" className="me-2"/>
    }

    //PRIVATE OR PUBLIC
    let visibility = <small className="text-success">Público</small>
    if(isPrivate === true){
        visibility = <small className="text-danger">Público</small>
    }

    return( 
        <div className="card mb-2 bg-light">
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
                        { editable && <span role="button" className="btn btn-sm btn-outline-danger">Editar</span> }
                        <span role="button" className="btn btn-sm btn-outline-primary ms-2">Ver</span>
                    </div>
                </div>
                <EditModal/>
            </div>
        </div>
    );
}