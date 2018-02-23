function getPressAction(row,col){
	return {
		type:"PRESS",
		row:row,
		col:col	
	}
	
}

const RESTART={
	type:"RESTART"
}

export(getPressAction,RESTART);