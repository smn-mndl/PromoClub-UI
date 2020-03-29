import React, { Component } from 'react';
import "./Navbar.scss"
import SearchBox from '../Search-Box/SearchBox';
import CreateNewAccount from '../CreateNewAccount/CreateNewAccount';

export default class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            createNewAccount : false
        }
    }

    createNewAccount = () => {
        this.setState({
            createNewAccount : true
        })
    }
    render() {
        return (
            <div className="nav-bar">
                <div className="pixlet">PixLet</div>
                <div className="search-box"><SearchBox/></div>
                <div onClick={()=>this.createNewAccount()}>Create New Account</div>
                {this.state.createNewAccount && <CreateNewAccount/>}
            </div>
        )
    }
}
