import React, { Component } from 'react';
import $ from 'jquery'
import ServerCalls from '../ServerCalls'
import './css/NumberPrediction.css'
import ReturnButton from '../image/ai1.jpg'
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var canvasComponent;
class NumberPrediction extends Component {

  state={
    drawing: false,
  }

  componentDidMount() {
    canvasComponent = document.getElementById('canvas').getContext("2d");
  }

  componentWillUnmount(){
    clickX = [];
    clickY = [];
    clickDrag = [];

  }

  initDraw = (e) =>{
    this.setState({
      drawing: true,
    })
    var mouseX = e.pageX - canvasComponent.canvas.offsetLeft;
    var mouseY = e.pageY - canvasComponent.canvas.offsetTop;
    this.addClick(e.pageX - canvasComponent.canvas.offsetLeft, e.pageY - canvasComponent.canvas.offsetTop);
    this.redraw();
  }

  draw = (e) =>{
    // console.dir(canvasComponent)
    if(this.state.drawing){
      this.addClick(e.pageX - canvasComponent.canvas.offsetLeft, e.pageY - canvasComponent.canvas.offsetTop, true);
      this.redraw();
    }
  }

  killDrawingEvt = (e) =>{
    this.setState({
      drawing: false,
    })
  }

  addClick = (x, y, dragging) =>
  {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }

  redraw = () =>{
    canvasComponent.clearRect(0, 0, canvasComponent.canvas.width, canvasComponent.canvas.height); // Clears the canvas

    canvasComponent.strokeStyle = "#000000";
    canvasComponent.lineJoin = "round";
    canvasComponent.lineWidth = 10;

    for(var i=0; i < clickX.length; i++) {
      canvasComponent.beginPath();
      if(clickDrag[i] && i){
        canvasComponent.moveTo(clickX[i-1], clickY[i-1]);
       }else{
         canvasComponent.moveTo(clickX[i]-1, clickY[i]);
       }
       canvasComponent.lineTo(clickX[i], clickY[i]);
       canvasComponent.closePath();
       canvasComponent.stroke();
     }
  }

  clearCanvas = () =>{
    clickX = [];
    clickY = [];
    clickDrag = [];
    this.redraw()
  }

  predictNumber = () =>{
    console.log("Predict")
    var objectBody = {
      xPositions : clickX,
      yPositions : clickY,
      canvasWidth : canvasComponent.canvas.width,
      canvasHeight : canvasComponent.canvas.height,
    }
    ServerCalls.predictNumber(objectBody, this.predictionResponse);
  }

  predictionResponse = (response) =>{
    console.log(response)
  }

  redirect = (path) =>{
    this.props.history.push('/' + path);
  }

  render() {
    return(

      <div>
        <div className="introduction">
          <div>
            <div className="home" onClick={() => this.redirect("")}>Home</div>
          </div>
          <h1 className="title">
            Recognition of numbers
          </h1>
          <div className="description">
            <p>This project shows the use of a CNN (Convolutional Neural Network) for recognizing digits.</p>
            <p>In order to try it out, simply write a number between 0-9 and hit the predict-button</p>
          </div>
        </div>
        <div id='canvas-container'>
          <canvas id="canvas" width="300" height="300" onMouseMove={this.draw}
                  onMouseDown={this.initDraw} onMouseUp={this.killDrawingEvt}>
          </canvas>
        </div>
        <div id='button-container'>
          <div id='clear-canvas' className='number-prediction-button' onClick={this.clearCanvas}><a>Clear</a></div>
          <div id='predict' className='number-prediction-button' onClick={this.predictNumber}><a>Predict</a></div>
        </div>
      </div>


    );
  }

}

export default NumberPrediction;
