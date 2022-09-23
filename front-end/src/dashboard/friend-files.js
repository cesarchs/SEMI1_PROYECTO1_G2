import React from "react";

import { File } from "../components/file";
import { FilesHeader } from "../components/files-header";

export class FriendFiles extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            files: [],
            tab: 1,
            search:"",
            fileType:"",
            filteredFiles:[]
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.search = this.search.bind(this);
    }

    inputChangeHandler(event){
        const target = event.target;
        var value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    componentWillMount() {
        let url = "http://localhost:5000/apiUsuarioN/friendFiles/"+ localStorage.getItem("idUsuario");
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

    search(event){
        event.preventDefault();

        let temp = [];
        if(this.state.fileType === "" || this.state.fileType === "all"){
            temp = this.state.files;
        }else{
            temp = this.state.files.filter( obj =>{
                return obj.tipoArchivo === this.state.fileType;
            })
        }
        if(this.state.search !== ""){
            let regex = new RegExp(this.state.search, 'i');
            temp = temp.filter( obj => {
                return regex.test(obj.file_name)
            })
        }
        this.setState({
            filteredFiles: temp
        });
    }

    render(){
        const { files } = this.state;
        const { filteredFiles } = this.state;
        return(
            <div className="container">
                {/* TITLE */}
                <div className="nav navbar navbar-inverse navbar-expand-lg p-0">
                    <h4 className="navbar-brand">Archivos de Amigos</h4>
                    <div className="navbar-nav">
                        <span role="button" className={this.state.tab === 1 ? "btn btn-sm bg-danger text-light" : "btn btn-sm"} 
                                onClick={() => this.selectedTab(1)}>Todos</span>
                        <span role="button" className={this.state.tab === 2 ? "btn btn-sm bg-danger text-light ms-2" : "btn btn-sm ms-2"} 
                                onClick={() => this.selectedTab(2)}>Filtrar</span>
                    </div>
                </div>
                <hr className="mb-3 mt-2"></hr>
                
            {/* CONTENT */}

            {/* FORM BUSCAR */}
            {
                this.state.tab === 2 &&
                <div className="mb-3">
                    <form onSubmit={this.search}>
                        <div className="row">
                                <div className="col-5">
                                    <input name="search" className="form-control" type="text" placeholder="Nombre del Archivo"  onChange={this.inputChangeHandler}/>
                                </div>
                                <div className="col-5">
                                    <select name="fileType" className="form-select" onChange={this.inputChangeHandler}>
                                        <option value="all">Todos</option>
                                        <option value="pdf">PDF</option>
                                        <option value="txt">TXT</option>
                                        <option value="img">Imagen</option>
                                    </select>
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-danger" type="submit">Buscar</button>
                                </div>
                        </div>
                    </form>
                </div>
            }

            {/* TODOS LOS ARCHIVOS */}
            <FilesHeader />
            {
                files && this.state.tab === 1 && files.map( (obj, i) => {
                    return( <File 
                                key={i} 
                                id={obj.idArchivo} 
                                url={obj.URL}
                                fileName={obj.file_name}
                                fileType={obj.tipoArchivo}
                                owner={obj.user}
                                date={obj.FechaModificacion}
                                isPrivate={obj.private}
                                editable={false}/>
                        )
                })
            }

            {/* ARCHIVOS CON FILTRO DE BUSQUEDA */}
            {
                files && this.state.tab === 2 && filteredFiles.map( (obj, i) => {
                    return( <File 
                                key={i} 
                                id={obj.idArchivo} 
                                url={obj.URL}
                                fileName={obj.file_name}
                                fileType={obj.tipoArchivo}
                                owner={obj.user}
                                date={obj.FechaModificacion}
                                isPrivate={obj.private}
                                editable={false}/>
                        )
                })
            }


        </div>
        );
    }
}
