class Board{
	constructor(width=20,length=10,bombNumber=5){
		if((typeof width)!="number"||(typeof length)!="number"||(typeof bombNumber)!="number"){
			throw new Error("Invalid Input");
		}
		this.width=width;
		this.length=10;
		this.bombNumber=5;
		this.restart();
		
	}
	restart(){
		this.board=[];
		this.generate();
		this.addBombs();
		this.addNeighbours();
	}
	generate(){
		for(let i =0;i<this.length;i++){
			this.board.push([]);
			for(let j=0;j<this.width;j++){
				this.board[i].push({
					row:i,
					col:j,
					neighbours:0,
					beenPressed:false,
					hasBomb:false
				});

			}
		}

	}

	addBombs(){
		let bombs=[];
		let bombCount=0;
		let coords={row:0,col:0}
		let counter=0;
		while(bombCount<this.bombNumber){
			coords.row=Math.floor(Math.random()*this.length);
			coords.col=Math.floor(Math.random()*this.length);
			if(!bombs.find(el=>el.row==coords.row&&el.col==coords.col)){
				bombs.push({...coords});
				bombCount++;
			}
			if(counter>1000){
				console.log("taking too long, aborting");
				break;
			}
		}

		for (let bomb of bombs){
			this.board[bomb.row][bomb.col].hasBomb=true;
		}

	}

	addNeighbours(){
		for(let i =0;i<this.board.length;i++){
			for(let j=0;j<this.board[0].length;j++){
				//console.log("doing the neighbours times "+i+"vs"+j);
				this.board[i][j].neighbours=this.countNeighbours(i,j);
			}
		}
	}
	countNeighbours(row,col){
		let count=0;
		for(let i=-1;i<2;i++){
			for(let j=-1;j<2;j++){
				if((i==0&&j==0)||row+i<0||col+j<0|| row+i>=this.length||col+j>=this.width){
					continue;
				}
				if(this.board[row+i][col+j].hasBomb){
					count++;	
				}
			}
		}
		console.log("count:"+count);
		return count;
	}
	getBoard(){
		return this.board.map(row=>row.map(col=>({...col})));
	}
}
export default Board;