import React from 'react';
import './timer.css';
import Logo from '../Reset/Logo';

class Timer extends React.Component{
    constructor(){
        super();
        this.state={
            time: 0,
            flags:10
        }
    }

    startTimer = () => {
        this.timer = setInterval(() => this.setState({
            time: this.state.time + 1
        }),1000)
    }

    resetTimer = () => {
        clearInterval(this.timer);
        this.setState({
            time: 0
        })
    }

    remainingFlags = () =>{
        this.setState({
            flags: this.state.flags - 1
        })
    }
    render(){
        return (
            <div className="btns">
                <button className="timer">{this.state.flags}</button>
                <button className="reset" onClick={()=>{this.resetTimer()}}><Logo/></button>
                <button className="timer"onClick={this.startTimer}>{this.state.time}</button>
                </div>
        )
    }
}

export default Timer;