import {shallow,configure} from "enzyme";
import React from "react";
import Cell from "./Cell.js";

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

//describe("<Cell/>",()=>{
	it("should always have name formed by props.row-props.col",()=>{
		const mockFun=jest.fn();
		const el=shallow(<Cell beenPressed={false} hasBomb={true} neighbours={3} row={3} col={3} press={mockFun} />);
		expect(el.find("div").prop("name")).toBe("3-3");
	});

	it("should be black when hasNotBeenPressed and not show any content",()=>{
		const mockFun=jest.fn();
		const el=shallow(<Cell beenPressed={false} hasBomb={true} neighbours={3}  row={3} col={3} press={mockFun}/>);
		expect(el).toMatchSnapshot();
	});
	it("should show neighbours when beenPressed",()=>{
		const mockFun=jest.fn();
		const el=shallow(<Cell beenPressed={false} hasBomb={true} neighbours={3} row={3} col={3} press={mockFun}/>);
		expect(el).toMatchSnapshot();
		el.setProps({beenPressed:true,hasBomb:false,neighbours:3,row:3,col:3,press:mockFun});
		expect(el).toMatchSnapshot();
	});
	it("should be white when  beenPressed and not hasBomb",()=>{
		const mockFun=jest.fn();
		const el=shallow(<Cell beenPressed={false} hasBomb={false} neighbours={3} row={3} col={3} press={mockFun}/>);
		expect(el).toMatchSnapshot();
		el.setProps({beenPressed:true,hasBomb:false,neighbours:3,row:3,col:3,press:mockFun});
		expect(el).toMatchSnapshot();
	});
	

	it("should show switch to red when been pressed and hasBomb is true",()=>{
		const mockFun=jest.fn();
		const el=shallow(<Cell beenPressed={false} hasBomb={true} neighbours={3} row={3} col={3} press={mockFun}/>);
		expect(el).toMatchSnapshot();
		el.setProps({beenPressed:true,hasBomb:true,neighbours:3,row:3,col:3,press:mockFun});
		expect(el).toMatchSnapshot();	
	});

	it("should call props.press when is pressed",()=>{
		const mockFun=jest.fn();
		
		const el=shallow(<Cell beenPressed={false} hasBomb={true} neighbours={3} row={3} col={3} press={mockFun}/>);
		el.simulate("click");
		expect(mockFun.mock.calls.length).toBe(1);

	});
	
//})