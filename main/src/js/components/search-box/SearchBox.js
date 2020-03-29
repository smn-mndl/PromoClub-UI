import React, { Component } from 'react';
import "./SearchBox.scss"

export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputChar: ""
        }
    }

    inputChar = (data) => {
        this.setState({
            inputChar: data
        })
    }

    render() {
        let inputClass = this.state.inputChar.length === 0 ? "inputbox" : "inputbox-focused"
        return (
            <div>
                <input className={inputClass} placeholder="Search" defaultValue={this.state.inputChar}
                    onChange={(evt)=>{this.inputChar(evt.target.value)}}></input>
            </div>
        )
    }
}
