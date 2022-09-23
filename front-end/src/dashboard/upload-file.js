import React from "react";

export class UploadFile extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            fileName:"",
            private:false,
            file:"",
            base64:"",
            pwd:""
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submit = this.submit.bind(this);
    }

    getBase64 = file => {
        return new Promise(resolve => {
          let baseURL = "";
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            baseURL = reader.result;
            // console.log(baseURL);
            resolve(baseURL);
          };
        //   console.log(fileInfo);
        });
    };

    inputChangeHandler(event){
        const target = event.target;
        var value = target.name === "file" ? target.files[0] :
                    target.name === "private" ? event.target.checked : target.value;
        const name = target.name;   
        this.setState({
            [name]: value
        });

        if(target.name === "file"){
            let file = value;
            this.getBase64(value).then(result => {
                file["base64"] = result;
                this.setState({
                base64: result,
                file: file
                });
            })
            .catch(err => {
                console.log(err);
            });
        } 
    }


    submit(event){
        event.preventDefault(); 
        let url = "http://localhost:5000/apiUsuarioN/uploadFile";
        // text/plain
        // application/pdf
        // image/png
        let fileType = "";
        if(this.state.file.type.includes("text"))
            fileType = "txt";
        if(this.state.file.type.includes("pdf"))
            fileType = "pdf";
        if(this.state.file.type.includes("image"))
            fileType = "img";
        let data = {
            idUsuario: localStorage.getItem("idUsuario"),
            tipoArchivo: fileType,
            file_name: this.state.fileName,
            base64: this.state.base64,
            private: this.state.private,
            pwd: this.state.pwd
        };
        let status = 0;
        fetch(url, {
            method:'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            status = result.status;
            if(status === 200){
                result.json().then((res)=>{ 
                    alert("Archivo subido con éxito!");
                })
            }else{
                //alert("Error al subir el archivo!")
                result.json().then((res)=>{ 
                    alert(res);
                })
            }
        });
    } 

    render(){
        return (
            <div className="container p-0">
                {/* TITLE */}
                <div className="nav navbar navbar-inverse navbar-expand-lg p-0">
                    <h4 className="navbar-brand">Subir Archivo</h4>
                </div>
                <hr className="mb-3 mt-2"></hr>
    
                <div className="container">
                    <form onSubmit={this.submit}>
                        <div className="form-group mt-3">
                            Nombre del Archivo:
                            <input name="fileName" type="text" className="form-control" placeholder="Nombre del archivo" onChange={this.inputChangeHandler}/>
                        </div>
                        <div className="form-group mt-3">                                        
                            Archivo Privado:
                            <div className="form-check form-switch form-switch-md">
                                <input name="private" className="form-check-input" type="checkbox" onChange={this.inputChangeHandler}></input>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            Contraseña:
                            <input name="pwd" type="password" className="form-control" placeholder="Contraseña" onChange={this.inputChangeHandler}/>
                        </div>
                        <div className="form-group mt-3">
                            Subir Archivo(Imagen, .pdf o .txt):
                            <div className="input-group custom-file-button">
                                <label className="input-group-text" htmlFor="inputGroupFile">Subir Archivo</label>
                                <input name="file" type="file" accept="application/pdf, .txt, image/*" className="form-control" id="inputGroupFile" onChange={this.inputChangeHandler} required/>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-center mt-4">
                            <div className="col-5 p-2">
                                <button type="submit" className="btn btn-danger col-12">Subir Archivo</button>
                            </div>
                        </div>
                    </form> 
                </div>
            </div>
        );
    }
}