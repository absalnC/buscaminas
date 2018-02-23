import React, { Component } from 'react';
import {createStore} from "redux";
import{Provider,connect} from "react-redux";
import reducer from "./reducers.js";
import logo from './logo.svg';
import './App.css';
import Game from "./Game.js";

const store=createStore(reducer);

function mapStateToProps(state){
  return{
    hasStarted:state.hasStarted,
    hasFinished:state.hasFinished,
    cells:state.cells,
    bombsLeft:state.bombsLeft,
    hasWon:state.hasWon
  }
}

function mapDispatchToProps(dispatch){
  return{dispatch:(action)=>dispatch(action)}
}
let Tapp=connect(mapStateToProps,mapDispatchToProps)(Game);
class App extends Component {


  render() {
    return (
      <div className="App">
        <Provider store={store}><Tapp/></Provider>
      </div>
    );
  }
}



export default App;
