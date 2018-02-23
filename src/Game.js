import React from "react";
import Cell from "./Cell.js";
import PropTypes from "prop-types";
import "./Game.css";
class Game extends React.Component{
	constructor(props){
		super(props);
		console.log("game props");
		console.log(this.props);
	}
	handlePress=(ev)=>{
		let name=ev.target.id.split("-");
		let row=name[0];
		let col=name[1];
		this.props.dispatch({type:"PRESS",row:row,col:col});
	}
	handleRestart=()=>{
		this.props.dispatch({type:"RESTART"});
	}
	

	render(){
		const msj="";
		const cells=this.props.cells.map((row,idrow)=>(
			<div className="row" key={idrow}>
			{row.map((el,idel)=>(
				<Cell key={idel}beenPressed={el.beenPressed} hasBomb={el.hasBomb} neighbours={el.neighbours} row={el.row} col={el.col} press={this.handlePress}/>
				))}
			
			</div>
			));
		return(
			<div className="Game">
					<div><h2>{msj}</h2> <div onClick={this.props.handleRestart}>Reiniciar</div></div>
					{cells}
			</div>
			);
	}
}

Game.propTypes={
	hasStarted:PropTypes.bool.isRequired,
	hasFinished:PropTypes.bool.isRequired,
	cells:PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
		row:PropTypes.number,
		col:PropTypes.number,
		beenPressed:PropTypes.bool,
		hasBomb:PropTypes.bool,
		neighbours:PropTypes.number,
	}))),
	bombsLeft:PropTypes.number,
	hasWon:PropTypes.bool.isRequired,
	dispatch:PropTypes.func.isRequired
}
export default Game;