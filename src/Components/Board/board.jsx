import React from 'react';
import './board.css';
import Cell from '../Cell/cell';
import Timer from '../Timer/Timer';

class Board extends React.Component{
    constructor(){
        super();
    }

render(){
        return(
            <div className="outer-box">
            <div className="inner-box1">
            <div><Timer /></div>
            </div>
                <Cell/>
            </div>
        )
    }
}

export default Board;