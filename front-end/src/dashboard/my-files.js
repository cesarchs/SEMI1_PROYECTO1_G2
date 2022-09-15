import React, { useState } from "react";

import { File } from "../components/file";
import { FilesHeader } from "../components/files-header";

//TEMP
let data = [
    {
        id:1,
        fileName:"Arhivo1",
        url:"url del archivo xd",
        fileType:"pdf",
        owner: "Yo", 
        date:"09/06/2022",
        isPrivate:true
    },
    {
        id:2,
        fileName:"Arhivo2",
        url:"url del archivo xd",
        fileType:"txt",
        owner: "Yo", 
        date:"09/06/2022",
        isPrivate:false
    },
    {
        id:2,
        fileName:"Arhivo2",
        url:"url del archivo xd",
        fileType:"img",
        owner: "Yo", 
        date:"09/06/2022",
        isPrivate:false
    }
]


export function MyFiles(){
    // TABS 
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    // REQUEST 
    // const [data, setData] = useState([])

    // useEffect(() => {
    //     fetch(`URL`)
    //     .then(res => res.json())
    //     .then(data => setData(data));  
    // }, []);

    let currentFiles = [];

    if(data.length !== 0){
        if(toggleState === 2){
            currentFiles = data.filter((obj) => {
                return obj.isPrivate
            })
        }else if(toggleState === 3){
            currentFiles = data.filter((obj) => {
                return !obj.isPrivate
            })
        }else{
            currentFiles = data
        }
    }

    return(
        <div className="container p-0">
            {/* TITLE */}
            <div className="nav navbar navbar-inverse navbar-expand-lg p-0">
                <h4 className="navbar-brand">Mis Archivos</h4>
                <div className="navbar-nav">
                    <span role="button" className={toggleState === 1 ? "btn btn-sm bg-danger text-light" : "btn btn-sm"} 
                            onClick={() => toggleTab(1)}>Todos</span>
                    <span role="button" className={toggleState === 2 ? "btn btn-sm bg-danger text-light ms-2" : "btn btn-sm ms-2"} 
                            onClick={() => toggleTab(2)}>Privados</span>
                    <span role="button" className={toggleState === 3 ? "btn btn-sm bg-danger text-light ms-2" : "btn btn-sm ms-2"} 
                            onClick={() => toggleTab(3)}>Públicos</span>
                </div>
            </div>
            <hr className="mb-3 mt-2"></hr>
            
            {/* CONTENT */}
            <FilesHeader />
            {
                Object.values(currentFiles).map((obj) => {
                    return (
                        <File 
                            id={obj.id}
                            fileName={obj.fileName} 
                            fileType={obj.fileType} 
                            owner={obj.owner}
                            date={obj.date} 
                            isPrivate={obj.isPrivate}
                            editable={true}
                        />
                    )
                })
            }

            {/* EDIT  */}

        </div>
    );
}
