import Board from "./Board.js";

describe("Board",()=>{
	it("should accept only numbers for width",()=>{
		expect(()=>{ new Board("") }).toThrow("Invalid Input");		
	});
	it("should accept only numbers for length",()=>{
		expect(()=>{ new Board(9,"") }).toThrow("Invalid Input");		
	});
	it("should accept only numbers for bombNumber",()=>{
		expect(()=>{ new Board(9,7,"") }).toThrow("Invalid Input");		
	});
	
	it("should create an array of NxN objects on this.board when generate called\n",()=>{
		//board is called on constructor,default params are  20,10,5
		let board=new Board();
		expect(board.board.length).toBe(10);
		expect(board.board[0].length).toBe(20);
		
	});
	it("Each object on board array should have the fields (row,col,beenPressed,hasBomb,neighbours)",()=>{
		let board=new Board();
		expect(board.board).toEqual(
			expect.arrayContaining(
				[expect.arrayContaining(
					[expect.objectContaining(
						{
							row:expect.any(Number),
							col:expect.any(Number),
							neighbours:expect.any(Number),
							beenPressed:expect.any(Boolean),
							hasBomb:expect.any(Boolean)
						}
					)]
				)]
			)
		);
	});
	it("The count of objects with hasBomb set to true must be equal to bombNumber",()=>{
		let board=new Board();
		let countBombs=board.board.reduce((countrow,row)=>
			 countrow+row.reduce(
			 	(countcol,col)=>
			 		col.hasBomb?countcol+1:countcol,
			 	0)
		,0);
		expect(countBombs).toEqual(5);
	});
	it("getBoard should have the same values as board.board but be a different object in each case",()=>{
		let board=new Board();
		expect(board.getBoard).not.toBe(board.board);
		//falta probar que los arreglos internos no sean la misma referencia
		//falta probar que los objetos internos no sean los mismos
		//falta probar que los objetos internos tengan los mismos valores
	})
});
