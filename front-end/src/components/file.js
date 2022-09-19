import React, { useState } from "react"

import { VscFilePdf, VscFileMedia, VscFile } from "react-icons/vsc";

export function File({id, url, fileName, fileType, owner, date, isPrivate, editable}){
    
    const [editFile, setEditFile] = useState(false);

    const showModal = (value) => {
        setEditFile(value);
    };

    //ICON 
    let icon =<VscFile size="30px" className="me-2"/>;
    if(fileType !== undefined){
        if(fileType.toLowerCase() === 'pdf'){
            icon = <VscFilePdf size="30px" className="me-2"/>
        }else if(fileType.toLowerCase() === 'img'){
            icon = <VscFileMedia size="30px" className="me-2"/>
        }
    }

    //PRIVATE OR PUBLIC
    let visibility = isPrivate === 1 ? 
        <small className="text-danger">Privado</small> : 
        <small className="text-success">Público</small>

    return( 
        <div key={id} className="card mb-2 bg-light">
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
                        <a href={url} target="_blank" rel="noreferrer" role="button" className="btn btn-sm btn-outline-primary ms-2">Ver</a>
                    </div>
                </div>
                {/* <EditModal/> */}

                
            </div>
        </div>
    );
}