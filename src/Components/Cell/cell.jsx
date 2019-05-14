import React from 'react';
import Button from '../Button/Button';
import './cell.css';

class Cell extends React.Component{

    constructor(){
        super();
        this.state={
            width:10,
            height:10,
            mines:10,
            dataArray: []
    
        }
    }
    
    componentDidMount(){
        this.plantMines(this.state.width,this.state.height,this.state.mines)
    }

    multipleElements = () =>{
        let elements = [];
        for(let i=0; i<100; i++){
            elements.push(<div key={i}> element{i+1}</div>)
        }
        return elements;
    }

    getKey = (key) => {
        let newKey;
        if (key > 9) {
            newKey = {
                    firstKey: parseInt(key / 10),
                    secondKey: key % 10
                }
            } 
            else{
            newKey = {
                firstKey: 0,
                secondKey: key % 10
                    }
            }
            let i = newKey.firstKey;
            let j = newKey.secondKey;
            return this.state.dataArray[i][j].neighbour
        }

    separateElement = () =>{
    let separateElements = [];
    var multiElements = this.multipleElements();
    let buttonText='';

    for(let i = 0; i < multiElements.length; i+=10) {
    let oneRow = [];
    oneRow.push(multiElements.slice(i, i+10).map(item => {
        buttonText = this.getKey(item.key)
        return(<div style={{display:'inline-block'}}><Button  fun={() => {}} buttonText={buttonText}/></div>) 
    }))

    separateElements.push(oneRow.map(itm => {return <div className="oneRow">{itm}</div>}))
  }
    return separateElements;
    }

    getRandomNumber = (value) =>{
        return Math.floor((Math.random() * value) + 0);
    }

    emptyArray = (width,height) => {
        let data= [];
        for (let i=0; i< height; i++){
            data.push([]);
            for(let j=0; j< width; j++){
                data[i][j] = {
                    x: i,
                    y: j,
                    isMine: false,
                    isEmpty: false,
                    neighbour: 0
                }
            }
        }
        return data;
    }

    plantMines = (width,height,mines) => {
        let data=this.emptyArray(width,height);
        let random_x, random_y, minesPlanted = 0;
        while(minesPlanted < mines){
            random_x = this.getRandomNumber(width);
            random_y = this.getRandomNumber(height);

            if(!(data[random_x][random_y].isMine)){
                data[random_x][random_y].isMine = true;
                data[random_x][random_y].neighbour = "*";
                minesPlanted++;
            }
        }
        data=this.getNeighbours(width,height,data);
        this.setState({
            dataArray:data
        }, ()=>{
            console.log("UpdatedData after plantMines--->>>",this.state.dataArray)
            })
        }

        getNeighbours = (width,height,data) =>{
            let Data = data;
            for(let i = 0; i < height; i++){
                for(let j = 0; j < width; j++){
                    if(data[i][j].isMine !== true){
                        let mine = 0;
                        const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
                        area.map(value => {
                            if(value.isMine){
                                mine++
                            }
                        });
                        if(mine == 0){
                           Data[i][j].isEmpty = true;
                        }
                        Data[i][j].neighbour = mine;
                    }
                }
            }
            return (Data);
        }

        traverseBoard = (x,y,data) =>{
            const item = [];
            if(x > 0){
                item.push(data[x-1][y]);
            }
            if(x < this.state.height - 1){
                item.push(data[x+1][y]);
            }
            if(y > 0){
                item.push(data[x][y-1]);
            }
            if(y < this.state.width - 1){
                item.push(data[x][y+1]);
            }
            if(x > 0 && y > 0){
                item.push(data[x-1][y-1]);
            }
            if(x > 0 && y < this.state.width - 1){
                item.push(data[x-1][y+1]);
            }
            if(x < this.state.height - 1 && y < this.state.width -1){
                item.push(data[x+1][y+1]);
            }
            if(x < this.state.height - 1 && y > 0){
                item.push(data[x+1][y-1]);
            }
            return item;
        }
     
    render(){
        if(!this.state || this.state.dataArray.length < 1){
            return (
            <div><p>Loading...</p></div>
            )}
        return(
            <div>
                <div className="inner-box2">
                {this.separateElement()}
                </div>
                </div>
        )}
    }

export default Cell;