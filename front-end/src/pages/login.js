import React from "react";
import { Link } from 'react-router-dom';

export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:"",
            pwd:""
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
                    localStorage.setItem("idUsuario", res.idUsuario);
                    localStorage.setItem("fullname", res.fullname);
                    localStorage.setItem("email", res.email);
                    localStorage.setItem("photo", res.photo);
                    window.location.href = "./dashboard"
                })
            }else{
                alert("Usuario o Contraseña incorrectos!")
            }
        });

    } 
    
    render(){
        // console.log(getIdUser)

        return(
            <div className="container text-light">
                <div className="row justify-content-center align-items-center mt-5 ">
                    <div className="col-lg-6 p-5 mt-5">
                        <h2 className="text-center">Iniciar Sesión</h2>
                        <hr/>
                        <form onSubmit={this.submit}>
                            <div className="form-group mt-3">
                                <input name="user" type="text" className="form-control" placeholder="Nombre de Usuario o Correo" onChange={this.inputChangeHandler}/>
                            </div>
                            <div className="form-group mt-3">
                                <input name="pwd" type="password" className="form-control" placeholder="Contraseña" onChange={this.inputChangeHandler}/>
                            </div>
                            <div className="row justify-content-center align-items-center mt-4">
                                <div className="col-5 p-2">
                                    <button type="submit" className="btn btn-danger col-12">Iniciar Sesión</button>
                                </div>
                                <div className="col-5 p-2">
                                    <Link to="/register" className="btn btn-secondary col-12">Registrarse</Link>
                                </div>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        );
    } 
}