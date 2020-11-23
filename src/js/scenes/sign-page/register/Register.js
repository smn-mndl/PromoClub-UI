import React, { Component } from "react";
import { Redirect } from "react-router";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      firstpassword: "",
      secondpassword: "",
      email: "",
      response: ""
    };
  }

  handleOnClick = () => {
    // some action...
    // then redirect
    this.setState({ redirect: true });
  };

  onSubmitRegister = () => {
    console.log("data", this.state);
    const myHeaders = new Headers();
    const response = fetch("http://localhost:8080/testPost", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => {
        console.log("data", res);
        this.setState({ response: res });
      })
      .catch(err => console.log(err));
    console.log("response", response);
  };

  componentDidMount() {}

  render() {
    // this.messages && this.messages.clear();
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <React.Fragment>
        {/* <Button onClick={()=>this.showSuccess()} label="Success" className="p-button-success" /> */}

        <div className="navbar-header">Register</div>
        <div className="messages-de"></div>

        <div class="container">
          <div className="row">
            <div className="col-md-4 col-lg-4"></div>
            <div className="col-md-4 col-lg-4">
              <div className="form-group"></div>
              <div className="form-group">
                <span className="p-float-label">
                  <input
                    id="in"
                    value={this.state.firstname}
                    onChange={e => this.setState({ firstname: e.target.value })}
                  />
                  <label htmlFor="in">First Name</label>
                </span>
              </div>

              <div className="form-group">
                <span className="p-float-label">
                  <input
                    id="in"
                    value={this.state.lastname}
                    onChange={e => this.setState({ lastname: e.target.value })}
                  />
                  <label htmlFor="in">Last Name</label>
                </span>
              </div>

              <div className="form-group">
                <span className="p-float-label">
                  <input
                    type="password"
                    feedback={false}
                    id="in"
                    value={this.state.firstpassword}
                    onChange={e =>
                      this.checkForPasswordMatch(
                        "firstpassword",
                        e.target.value
                      )
                    }
                  />
                  <label htmlFor="in">Password</label>
                </span>
              </div>

              <div className="form-group">
                <span className="p-float-label">
                  <input
                    type="password"
                    feedback={false}
                    id="in"
                    value={this.state.secondpassword}
                    onChange={e =>
                      this.checkForPasswordMatch(
                        "secondpassword",
                        e.target.value
                      )
                    }
                  />
                  <label htmlFor="in">Confirm Password</label>
                </span>
              </div>

              <div className="form-group">
                <span className="p-float-label">
                  <input
                    type="email"
                    id="in"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                  <label htmlFor="in">Email</label>
                </span>
              </div>

              <div className="form-group">
                <span className="p-float-label submit-btn">
                  <button
                    type="submit"
                    className="btn btn-default"
                    onClick={() => this.onSubmitRegister()}
                  >
                    Submit
                  </button>
                </span>
              </div>

              <div className="form-group">
                <span className="p-float-label submit-btn">
                  Already registered? Go to Login
                </span>
              </div>

              <div className="form-group">
                <span className="p-float-label submit-btn">
                  <button
                    type="submit"
                    className="btn btn-default"
                    onClick={() => this.handleOnClick()}
                  >
                    Login
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
