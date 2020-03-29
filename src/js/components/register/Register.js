import React, { Component } from 'react';
import "./Register.scss"
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Messages} from 'primereact/messages';
import {Message} from 'primereact/message';
import {Button} from 'primereact/button';
import { Redirect } from 'react-router';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state ={
            firstname: "",
            lastname:"",
            firstpassword: "",
            secondpassword: "",
            email: ""
        }
    }

    handleOnClick = () => {
        // some action...
        // then redirect
        this.setState({redirect: true});
    }

    checkForAlltheFields = () => {
        let state = this.state;
        let flag = true , emptyField = "";
        Object.keys(state).some((each)=>{
            if(state[each] && state[each].length===0){
                flag = false;
                emptyField = each
                return emptyField
            }
        })
        return {flag : flag , emptyField : emptyField}
    }

    checkForPasswordMatch = (passwordField , passwordValue) => {
        let obj = {};
        obj[passwordField] = passwordValue;
        debugger
        let passFlag = false;
        this.setState(obj,()=>{
            let passValue = passwordField === "firstpassword" ? this.state.secondpassword : this.state.firstpassword;
            if(passValue === passwordValue && this.state.secondpassword.length>0){;
                passFlag = true;
                // this.showInfo("Password Matched!")
            }
        })
        return passFlag
    }

    checkForPasswordPattern = () => {
        let givenpass = this.state.firstpassword;
        // if(givenpass.length)
        
        return givenpass.length > 7 ? true : false;
    }

    checkForEmailPattern = () =>{
        let re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        return re.test(this.state.email);

    }

    onSubmitRegister = () => {
        let x = this.checkForAlltheFields();
        let y = this.checkForEmailPattern();
        let passMatch = this.checkForPasswordMatch();
        let passCheck = this.checkForPasswordPattern();
        console.log(passMatch)
        if(x.flag){
            if(y && passMatch && passCheck){
            /** There will be service call if x.flag is true. That means users has entered proper data
             * After successfull service call showSuccess function will be called to show success message to user.
             */
            this.showSuccess("Successfully registered");
            }
            else if(!y && passMatch){
                this.showWarn("Invalid email format")
            }

            else if(!passCheck){
                this.showWarn("Password should contain at least 8 characters")
            }
            else if((y && !passMatch) || (!y && !passMatch)){
                this.showWarn("Password did not match")
            }

        }
        else{
            this.showError("Every field is required!");
        }
    }

    showSuccess(detail) {
        this.messages.show({ severity: 'success', summary: 'Success Message', detail: detail });
    }
    
    showInfo(detail) {
        this.messages.show({ severity: 'info', summary: 'Info Message', detail: detail });
    }
    
    showWarn(detail) {
        this.messages.show({ severity: 'warn', summary: '', detail: detail });
    }
    
    showError(detail) {
        this.messages.show({ severity: 'error', summary: '', detail: detail });
    }
    render() {
        // this.messages && this.messages.clear();
        if (this.state.redirect) {
            return <Redirect push to="/" />;
          }
        return (
            <React.Fragment>
                
                {/* <Button onClick={()=>this.showSuccess()} label="Success" className="p-button-success" /> */}

                <div className="navbar-header">
                    Register
                </div>
                <div className="messages-de"><Messages ref={(el) => this.messages = el}></Messages></div>
                
                <div class="container">
                <div className="row">
                
                    <div className="col-md-4 col-lg-4"></div>
                    <div className="col-md-4 col-lg-4">

                    <div className="form-group"></div>
                    <div className="form-group">
                    <span className="p-float-label">
                        <InputText id="in" value={this.state.firstname} onChange={(e) => this.setState({firstname: e.target.value})} />
                        <label htmlFor="in">First Name</label>
                    </span>
                    </div>

                    <div className="form-group">
                    <span className="p-float-label">
                        <InputText id="in" value={this.state.lastname} onChange={(e) => this.setState({lastname: e.target.value})} />
                        <label htmlFor="in">Last Name</label>
                    </span>
                    </div>

                    <div className="form-group">
                    <span className="p-float-label">
                        <Password feedback={false} id="in" value={this.state.firstpassword} onChange={(e) => this.checkForPasswordMatch("firstpassword" , e.target.value)} />
                        <label htmlFor="in">Password</label>
                    </span>
                    </div>

                    <div className="form-group">
                    <span className="p-float-label">
                        <Password feedback={false} id="in" value={this.state.secondpassword} onChange={(e) => this.checkForPasswordMatch("secondpassword" , e.target.value)} />
                        <label htmlFor="in">Confirm Password</label>
                    </span>
                    </div>

                    <div className="form-group">
                    <span className="p-float-label">
                        <InputText type="email" id="in" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                        <label htmlFor="in">Email</label>
                    </span>
                    </div>

                    <div className="form-group">
                        <span className="p-float-label submit-btn">
                            <button type="submit" className="btn btn-default" onClick={()=>this.onSubmitRegister()} >Submit</button>
                        </span>
                    </div>

                    <div className="form-group">
                        <span className="p-float-label submit-btn">
                            Already registered? Go to Login
                        </span>
                    </div>

                    <div className="form-group">
                        <span className="p-float-label submit-btn">
                            <button type="submit" className="btn btn-default" onClick={()=>this.handleOnClick()}>Login</button>
                        </span>
                    </div>
                   

                    </div>
                </div>
</div>

                
            </React.Fragment>

        )
    }
}

export default Register;