import React from "react";

export class UploadFile extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submit = this.submit.bind(this);
    }

    inputChangeHandler(event){
        const target = event.target;
        var value = target.value;
        const name = target.name;   
        this.setState({
            [name]: value
        });
    }


    submit(event){
        event.preventDefault(); 
        let url = "http://localhost:5000/apiUsuarioN/login";
        let data = this.state;
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
                    window.location.href = "./dashboard"
                })
            }else{
                alert("Usuario o Contraseña incorrectos!")
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
                            <input name="user" type="text" className="form-control" placeholder="Nombre de Usuario o Correo" onChange={this.inputChangeHandler}/>
                        </div>
                        <div className="form-group mt-3">
                            <input name="pwd" type="password" className="form-control" placeholder="Contraseña" onChange={this.inputChangeHandler}/>
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