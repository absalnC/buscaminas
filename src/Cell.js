import React from "react";
import PropTypes from "prop-types";
import "./Cell.css";
class Cell extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const color=this.props.beenPressed?(this.props.hasBomb?"red":"white"):"black";

		const st={
			border:color==="white"?"solid black 1px":"solid red 1px",
			backgroundColor:color
		}
		return (
			<div  className="cell" id={this.props.row+"-"+this.props.col} style={st} onClick={this.props.press} >
				{this.props.beenPressed?this.props.neighbours:""}
			</div>);
	}

}

Cell.propTypes={
	beenPressed:PropTypes.bool.isRequired,
	hasBomb:PropTypes.bool.isRequired,
	neighbours:PropTypes.number.isRequired,
	row:PropTypes.number.isRequired,
	col:PropTypes.number.isRequired,
	press:PropTypes.func.isRequired,

}
export default Cell;

