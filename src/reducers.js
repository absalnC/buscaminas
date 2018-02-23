import Board from "./Board.js";


const initial={
  hasStarted:false,
  hasFinished:false,
  cells:(new Board()).getBoard(),
  bombsLeft:10,
  hasWon:false
}

function reducer(state=initial,action){
	let board=new Board();
	let temp={};
	let cellsLeft=state.cells.length*state.cells[0].length;
	//console.log("cells left:"+cellsLeft);
	switch(action.type){
		case "RESTART":
		//console.log("match restart");
			if(!state.hasStarted){
				return state;
			}
			temp=initial;
			board.restart();
			temp.cells=board.getBoard();
			return temp;
		case "PRESS":
			//si el juego ya termino no hacer nada
			if(state.hasFinished){
				return state;
			}
			//si no ha terminado...
			// asegurarse de que estado iniciado fue seteado
			temp=copy(state);
			temp.hasStarted=true;
			//marcar celda como presionada
			temp.cells[action.row][action.col].beenPressed=true;
			//terminar juego si celda tiene bomba
			if(temp.cells[action.row][action.col].hasBomb){
				temp.hasFinished=true;
			}
			//si celda no tiene bomba
			else{
				//contar celdas presionadas
				let countPressed=temp.cells.reduce(
					(count1,row)=>count1+row.reduce(
						(count2,col)=>count2+(col.beenPressed?1:0)
						,0)
					,0);
				//si ya se presionaron todas las celdas sin bomba declarar ganador
				cellsLeft-=(countPressed+temp.bombsLeft);
				if(cellsLeft<=0){
					temp.hasWon=true;
					temp.hasFinished=true;
				}
			}
			return temp;
		default:
			return state;
	}
}

function copy(state){
	let temp={...initial};
	temp.cells=state.cells.map(row=>row.map(col=>({...col})));
	return temp;
}
export default reducer;