import React from "react"
import { GrDocumentPdf, GrDocument, GrDocumentTxt, GrDocumentImage } from "react-icons/gr";

export function File({fileName, fileType, owner, date, visibility}){
    
    let icon =<GrDocument size="30px"/>;
    if(fileType.toLowerCase() === 'pdf'){
        icon = <GrDocumentPdf size="30px"/>
    }else if(fileType.toLowerCase() === 'txt'){
        icon = <GrDocumentTxt size="30px"/>
    }else if(fileType.toLowerCase() === 'img'){
        icon = <GrDocumentImage size="30px"/>
    }

    return( 
        <div className="card mb-2">
            {icon}
            <div className="card-body p-1 m-1">
                {/* <div class="d-flex w-100 justify-content-around"> */}
                <div className="row">
                    <div className="col-4">
                        {fileName}
                    </div>
                    <div className="col-2">
                        <small className="text-secondary">{owner}</small>
                    </div>
                    <div className="col-2">
                        <small className="[text-secondary">{date}</small>
                    </div>
                    <div className="col-2">
                        <small className="text-secondary">{visibility}</small>
                    </div>
                    <div className="col-2">
                        <span href="/home" className="bg-danger text-light p-1">Editar</span>
                        <span href="/home" className="bg-primary text-light p-1 ms-2">Ver</span>
                    </div>

                </div>
            </div>
        </div>
    );
}