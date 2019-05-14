import React from 'react';
import './button.css';

class Button extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <button type="button" className="btn-click" onClick={()=>{this.props.fun()}}>{this.props.buttonText}</button>
                </div>
        )
    }
}

export default Button;