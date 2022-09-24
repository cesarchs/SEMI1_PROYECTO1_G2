import React from "react";
import { Link } from 'react-router-dom';
// import base64 from 'react-native-base64'

export class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:"",
            fullname:"",
            email:"",
            pwd:"",
            pwd2:"",
            file:"",
            base64: "",
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
            resolve(baseURL);
          };
        });
      };

    inputChangeHandler(event){
        const target = event.target; 
        var value = target.name === "file" ? target.files[0] : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        if(target.name === "file"){
            let file = value;
            this.getBase64(value).then(result => {
                file["base64"] = result;
                this.setState({
                    base64: result
                });
            })
            .catch(err => {
                console.log(err);
            });
        } 
    }

    submit(event){
        event.preventDefault(); 
        let url = "http://balancerg2-1443778845.us-east-1.elb.amazonaws.com/apiUsuarioN/register";
        if(this.state.pwd !== this.state.pwd2){
            alert("Contraseña no coiciden!")
        }else{
            let data ={
                user: this.state.user,
                fullname: this.state.fullname,
                email: this.state.email,
                pwd:this.state.pwd,
                base64: this.state.base64,
            };
            let status = 0;
            // console.log(data)
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
                                    <input name="file" type="file" accept="image/*" className="form-control" id="inputGroupFile" onChange={this.inputChangeHandler} required/>
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