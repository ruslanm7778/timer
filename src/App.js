import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { timer, interval } from 'rxjs';
const start = 10;
import Count from "./components/Count";
let time= localStorage.getItem('timeLocal')/1000;
let timeLocal;
let MMLocal;
let startFrom =localStorage.getItem('timeLocal');
//(startFrom ==null)? startFrom=0:null;
console.log(startFrom);
let MM = localStorage.getItem('MMLocal');
console.log("MM"+MM);
let HH=localStorage.getItem('HHLocal');
let resetPush = Number(localStorage.getItem('resetPush'));
let startPressed = Number(localStorage.getItem('startPressed'));
let wasClicked = false;
let timeout;
let startWasClicked = Number(localStorage.getItem('startWasClickedLocal'));
class App extends Component {

    state = {
    reload: false

}
refreshPage = () => {
        this.setState(
            {reload: true},
            () => this.setState({reload: false})
        )
    }

    timer = (e)=>  timer(0, 1000).subscribe(n => {time=Number(startFrom/1000)+n;

        (time===60)?(localStorage.setItem('MMLocal',(++MM)),localStorage.setItem('timeLocal', (0)),time =0, window.location.reload(false)):null;
        (MM===60)?(localStorage.setItem('HHLocal',(++HH)),localStorage.setItem('MMLocal', (0)),MM =0, window.location.reload(false)):null;
        //console.log('timer', n);
        localStorage.setItem('timeLocal', (time*1000));
        this.refreshPage()
    })

    onStart=(e)=>{
        localStorage.setItem('resetPush',0)
        this.timer(e)
    }
    onPause=(e)=>{
        startWasClicked = 0
        localStorage.setItem('startWasClickedLocal', (0))
        localStorage.setItem('resetPush',0)
        window.location.reload(false);
    }
    onReset=(e)=>{
        startWasClicked = 1
        localStorage.setItem('startWasClickedLocal', (1))
       localStorage.setItem('resetPush',0)
        localStorage.setItem('timeLocal', (0));
        localStorage.setItem('MMLocal', (0));
        localStorage.setItem('HHLocal', (0));
        window.location.reload(false);
    }
    onResetresetPush=(e)=>{
        localStorage.setItem('resetPush',1)
        localStorage.setItem('timeLocal', (0));
        localStorage.setItem('MMLocal', (0));
        localStorage.setItem('HHLocal', (0));
        window.location.reload(false);
    }

    componentDidMount() {
        (time===60)?(time=0, this.refreshPage()):null;
        (MM===60)?(MM=0, this.refreshPage()):null;

            ((time === 0)&&(resetPush===0)) ? this.timer() : null;
        ((MM === 0)&&(resetPush===0)) ? this.timer() : null;

    }
onPauseDouble=(e)=>{
    if(wasClicked) {
        wasClicked = false;
        clearTimeout(timeout);
this.onPause(e)
        // dbl-click

        return;
    }

    wasClicked = true;
    timeout = setTimeout(() => {
        wasClicked = false;
    }, 300);
}
onStartStop=(e)=>{
        if(startWasClicked===1) {
            this.onResetresetPush(e)
            startWasClicked = 0
            localStorage.setItem('startWasClickedLocal', (0))
        } else {
            this.onStart(e)
           startWasClicked =1
            localStorage.setItem('startWasClickedLocal', (1))
        }

}


render() {
    return (
      <div className="App">

          <Count data={time} HHMM={HH} MMH={MM}/>
        <button onClick={this.onStartStop}>Start/Stop</button><button onClick={this.onPauseDouble}>Wait</button>
          <button onClick={this.onReset}>Reset</button>
      </div>
    );
  }
}

export default App;
