import React from "react";

import { File } from "../components/file";
import { FilesHeader } from "../components/files-header";

export class MyFiles extends React.Component{
    constructor(props){
        super(props)
        
        this.state ={
            files: [],
            tab: 1
        }
    }

    componentWillMount() {
        let url = "http://balancerg2-1443778845.us-east-1.elb.amazonaws.com/apiUsuarioN/userFiles/"+ localStorage.getItem("idUsuario");
        let status = 0;
        fetch(url, {
            method:'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((result)=>{
            status = result.status;
            if(status === 200){
                result.json().then((res)=>{
                    this.setState({ files: res })
                })
            }else{
                alert("Error en la petición!")
            }
        });
    }

    selectedTab(tabIndex){
        this.setState({tab:tabIndex})
    }    

    render(){
        const { files } = this.state;

        return(
            <div className="container">
                {/* TITLE */}
                <div className="nav navbar navbar-inverse navbar-expand-lg p-0">
                    <h4 className="navbar-brand">Mis Archivos</h4>
                    <div className="navbar-nav">
                        <span role="button" className={this.state.tab === 1 ? "btn btn-sm bg-danger text-light" : "btn btn-sm"} 
                                onClick={() => this.selectedTab(1)}>Todos</span>
                        <span role="button" className={this.state.tab === 2 ? "btn btn-sm bg-danger text-light ms-2" : "btn btn-sm ms-2"} 
                                onClick={() => this.selectedTab(2)}>Privados</span>
                        <span role="button" className={this.state.tab === 3 ? "btn btn-sm bg-danger text-light ms-2" : "btn btn-sm ms-2"} 
                                onClick={() => this.selectedTab(3)}>Públicos</span>
                    </div>
                </div>
                <hr className="mb-3 mt-2"></hr>
                
                {/* CONTENT */}
                <FilesHeader />

            {/* TODOS LOS ARCHIVOS */}
            {
                files && this.state.tab === 1 && files.map( (obj, i) => {
                    return( <File
                                key={i} 
                                id={obj.idArchivo} 
                                url={obj.URL}
                                fileName={obj.file_name}
                                fileType={obj.tipoArchivo}
                                owner={"Yo"}
                                date={obj.FechaCreada}
                                isPrivate={obj.private}
                                editable={true}/>
                        )
                })
            }
                
            {/* ARCHIVOS PRIVADOS */}
            {
                files && this.state.tab === 2 && files.filter((obj) => { return obj.private}).map( (obj, i) => {
                    return( <File 
                                key={i} 
                                id={obj.idArchivo} 
                                url={obj.URL} 
                                fileName={obj.file_name}
                                fileType={obj.tipoArchivo}
                                owner={"Yo :p"}
                                date={obj.FechaCreada}
                                isPrivate={obj.private}
                                editable={true}/>
                        )
                })
            }

            {/* ARCHIVOS PPUBLICOS */}
            {
                files && this.state.tab === 3 && files.filter((obj) => { return ! obj.private}).map( (obj, i) => {
                    return( <File 
                                key={i} 
                                id={obj.idArchivo} 
                                url={obj.URL} 
                                fileName={obj.file_name}
                                fileType={obj.tipoArchivo}
                                owner={"Yo :p"}
                                date={obj.FechaCreada}
                                isPrivate={obj.private}
                                editable={true}/>
                        )
                })
            } 

        </div>
        );
    }
}
