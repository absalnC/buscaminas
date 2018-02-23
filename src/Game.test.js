import {shallow,configure} from "enzyme";
import React from "react";
import Game from "./Game.js"
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Game",()=>{
	it("should have a restart button",()=>{
		//const sh=shallow(<Game>)
	});

	it("should call handle restart when restart pressed",()=>{

	});

	it("should call handle press when a Cell pressed",()=>{

	});

	it(" Game Finished should be shown when a cell with a bomb is pressed ",()=>{

	});

	it(" Should show win lose message when game finished",()=>{

	});
	
})