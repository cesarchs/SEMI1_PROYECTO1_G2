import React from "react";
import { Link } from 'react-router-dom';


export class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:"",
            fullname:"",
            email:"",
            pwd:"",
            pwd2:"",
            photo:""
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submit = this.submit.bind(this);
    } 
    inputChangeHandler(event){
        const target = event.target;
        var value = target.name === "photo" ? target.files[0] : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    
    submit(event){
        event.preventDefault(); 
        let url = "http://localhost:5000/apiUsuarioN/register";
        let data = this.state;
        let status = 0;
        console.log(data)
        fetch(url, {
            method:'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            status = result.status;
            if(status === 200){
                alert("Usuario registrado con éxito!")
                window.location.href = "./login"
            }else{
                alert("Error en la creación del usuario!")
            }
        });

    } 

    render(){
        return(
            <div className="container text-light">
                <form onSubmit={this.submit}>
                    <div className="row justify-content-center align-items-center mt-5 ">
                        <div className="col-lg-6 p-5">
                            <h2 className="text-center mt-3">Registro de Usuario</h2>
                            <hr/>
                            <div className="form-group mt-3">
                                <input name="fullname" type="text" className="form-control" placeholder="Nombre Completo" onChange={this.inputChangeHandler} required/>
                            </div>
                            <div className="form-group mt-3">
                                <input name="email" type="email" className="form-control" placeholder="Correo electrónico" onChange={this.inputChangeHandler} required/>
                            </div>
                            <div className="form-group mt-3">
                                <input name="user" type="text" className="form-control" placeholder="Nombre de Usuario" onChange={this.inputChangeHandler} required/>
                            </div>                            
                            <div className="form-group mt-3">
                                <input name="pwd" type="password" className="form-control" placeholder="Contraseña" onChange={this.inputChangeHandler} required/>
                            </div>
                            <div className="form-group mt-3">
                                <input name="pwd2" type="password" className="form-control" placeholder="Confirmar Contraseña" onChange={this.inputChangeHandler} required/>
                            </div>
                            <div className="form-group mt-3">
                                <div className="input-group custom-file-button">
                                    <label className="input-group-text" htmlFor="inputGroupFile">Foto de Perfil</label>
                                    <input name="photo" type="file" accept="image/*" className="form-control" id="inputGroupFile" onChange={this.inputChangeHandler} required/>
                                </div>
                            </div>
                            <div className="row justify-content-center align-items-center mt-4">
                                <div className="col-5 p-2">
                                    <button type="submit" className="btn btn-danger col-12">Registrarse</button>
                                </div>
                                <div className="col-5 p-2">
                                    <Link to="/" className="btn btn-secondary col-12">Cancelar</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}