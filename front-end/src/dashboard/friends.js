import React from "react";

import { User } from "../components/user";

export class Friends extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            myFriends: [],
            users: [],
            tab: 1,
            search:"",
            filteredUsers:[]
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
        let url = "http://balancerg2-1443778845.us-east-1.elb.amazonaws.com/apiUsuarioN/myFriends/"+ localStorage.getItem("idUsuario");
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
                    this.setState({ myFriends: res })
                })
            }else{
                alert("Error en la petición!")
            }
        });
        
        let url2="http://balancerg2-1443778845.us-east-1.elb.amazonaws.com/apiUsuarioN/allUsers/" + localStorage.getItem("idUsuario");
        fetch(url2, {
            method:'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((result)=>{
            status = result.status;
            if(status === 200){
                result.json().then((res)=>{
                    this.setState({ users: res, filteredUsers: res})
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
        let temp = this.state.users;
        if(this.state.search !== ""){
            let regex = new RegExp(this.state.search, 'i');
            temp = temp.filter( obj => {
                return regex.test(obj.user)
            });
        }
        this.setState({
            filteredUsers: temp
        });
    }

    render(){
        const { myFriends} = this.state;
        const { filteredUsers } = this.state;
        
        return(
            <div className="container">
                {/* TITLE */}
                <div className="nav navbar navbar-inverse navbar-expand-lg p-0">
                    <h4 className="navbar-brand">Archivos de Amigos</h4>
                    <div className="navbar-nav">
                        <span role="button" className={this.state.tab === 1 ? "btn btn-sm bg-danger text-light" : "btn btn-sm"} 
                                onClick={() => this.selectedTab(1)}>Mis Amigos</span>
                        <span role="button" className={this.state.tab === 2 ? "btn btn-sm bg-danger text-light ms-2" : "btn btn-sm ms-2"} 
                                onClick={() => this.selectedTab(2)}>Buscar Amigos</span>
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
                            <div className="col-10">
                                <input name="search" className="form-control" type="text" placeholder="Nombre del Usuario"  onChange={this.inputChangeHandler}/>
                            </div>
                            <div className="col-2">
                                <button className="btn btn-danger" type="submit">Buscar</button>
                            </div>
                        </div>
                    </form>
                </div>
            }

            {
                myFriends && this.state.tab === 1 && 
                <div className="row"> {
                    myFriends.map( (obj, i) => {
                    return( <User 
                                key={i}
                                url={obj.photo}
                                id={obj.idUsuario}
                                userName={obj.user}
                                fullname={obj.fullname}
                                email={obj.email}
                                publicFiles={obj.ArchivosPublicos}
                                aggregable={false}
                            />
                        )
                    })
                }</div>
            }

            {/* ARCHIVOS CON FILTRO DE BUSQUEDA */}
            {
                filteredUsers && this.state.tab === 2 && 
                <div className="row"> {
                    filteredUsers.map( (obj, i) => {
                    return( <User 
                                key={i}
                                url={obj.photo}
                                id={obj.idUsuario}
                                userName={obj.user}
                                publicFiles={obj.ArchivosPublicos}
                                aggregable={true}
                            />
                        )
                    })
                }
                </div>
            }


        </div>
        );
    }
}
