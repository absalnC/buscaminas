import reducer from "./reducers.js";
import Board from "./Board.js";
describe("reducers",()=>{

	it("should do nothing on action RESTART if gameHasNotStarted",()=>{
		let board=new Board()
		let initial={
			  hasStarted:false,
			  hasFinished:false,
			  cells:board.getBoard(),
			  bombsLeft:10,
			  hasWon:false
			};
		expect((reducer(initial,{type:"RESTART"}))).toEqual(
			initial
		);

	});

	it("should restart game on action RESTART if hasStarted",()=>{
		let board=new Board();
		board.restart=jest.fn();
		let initial={
			  hasStarted:true,
			  hasFinished:false,
			  cells:board.getBoard(),
			  bombsLeft:10,
			  hasWon:false
			};
		let newState=reducer(initial,{type:"RESTART"})
		expect(newState.hasStarted).toBe(false);
		expect(newState.hasFinished).toBe(false);
		expect(newState.bombsLeft).toBe(10);
		expect(newState.hasWon).toBe(false);
		//para poder testear que se llama Board.restart se podria pasar la funcion como parte de la accion, pero habria que modificar
		//la definicion de la accion
	});

	it("should do nothing on action PRESS if  hasFinished ",()=>{
		let initial={
			  hasStarted:true,
			  hasFinished:true,
			  cells:[[]],
			  bombsLeft:10,
			  hasWon:false
			};
		expect(reducer(initial,{type:"PRESS",row:5,col:3})).toEqual(initial);
	});

	it("should set cell beenPressed on action PRESS if not hasFinished and the others should stay the same",()=>{
		let iniboard=(new Board).getBoard();
		let initial={
			  hasStarted:true,
			  hasFinished:false,
			  cells:iniboard,
			  bombsLeft:10,
			  hasWon:false
			};
		let result=reducer(initial,{type:"PRESS",row:5,col:3});
		expect(result.cells[5][3].beenPressed).toBe(true);
	});


	it("should start game on action PRESS if not hasStarted ",()=>{
		let iniboard=(new Board).getBoard();
		let initial={
			  hasStarted:true,
			  hasFinished:false,
			  cells:iniboard,
			  bombsLeft:10,
			  hasWon:false
			};
		let result=reducer(initial,{type:"PRESS",row:5,col:3});
		expect(result.hasStarted).toBe(true);
	});

	it("should finish the game and tell defeat on action PRESS  if cell hasBomb ",()=>{
		let iniboard=(new Board).getBoard();
		let initial={
			  hasStarted:true,
			  hasFinished:false,
			  cells:iniboard,
			  bombsLeft:10,
			  hasWon:false
			};
			initial.cells[5][3].hasBomb=true;
		let result=reducer(initial,{type:"PRESS",row:5,col:3});
		expect(result.hasFinished).toBe(true);
		expect(result.hasWon).toBe(false);
	});

	it("should finish the game and tell victory on action PRESS if cell not hasBomb and bombsLeft==1",()=>{
		let iniboard=(new Board).getBoard();
		let initial={
			  hasStarted:true,
			  hasFinished:false,
			  cells:iniboard,
			  bombsLeft:10,
			  hasWon:false
			};
		initial.cells[5][3].hasBomb=false;
		for(var i=0;i<initial.cells.length;i++){
			for(var j =0;j<initial.cells[0].length;j++){
				if(i==5 && j==3){
					continue;
				}
				//if(!initial.cells[i][j].hasBomb){
					initial.cells[i][j].beenPressed=true;
				//}
			}
		}
		
		let result=reducer(initial,{type:"PRESS",row:5,col:3});
		expect(result.hasFinished).toBe(true);
		expect(result.hasWon).toBe(true);

	});
	
	//si aun hay celdas

})