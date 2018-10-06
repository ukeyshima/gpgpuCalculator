import React from "react";
import CreateCanvas from "./createCanvas.jsx";
import "./style.scss";
import ReactDOM from "react-dom";

class Result extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p
        {...this.props}
        style={{
          height: window.innerHeight * 0.2,
          width: window.innerWidth,
          margin: 0,
          padding: 0,
          fontSize: 100,
          backgroundColor: "rgb(41,41,49)",
          color: "#fff",
          textAlign: "right",
          fontFamily:"MS Sans Serif"
        }}
      >
        {this.props.result}
      </p>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ""
    };
  }
  updateState(result) {
    this.setState({
      result: result
    });
  }
  handleResize(w,h){
    this.refs.createCanvas.handleResize(w,h*0.8);
  }
  render() {
    return (
      <div {...this.props}>
        <Result result={this.state.result} />
        <CreateCanvas
        ref="createCanvas"
          style={{
            width: this.props.style.width,
            height: this.props.style.height * 0.8
          }}
          updatestate={this.updateState.bind(this)}
          resultstyle={{
            width: window.innerWidth,
            height: window.innerHeight * 0.2
          }}
        />
      </div>
    );
  }
}

class GpgpuCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  componentDidMount() {
    document.body.style.overflow="hidden";
    this.tempHandleResize = this.handleResize.bind(this);
    window.addEventListener("resize", this.tempHandleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.tempHandleResize);
  }
  handleResize(e) {
    const width = e.target.innerWidth;
    const height = e.target.innerHeight;
    this.refs.calculator.handleResize(width, height);
    this.setState({
      width: width,
      height: height
    });
  }
  render() {
    return (
      <React.Fragment>
      <Calculator
      ref="calculator"
        style={{
          width: this.state.width,
          height: this.state.height
        }}
      />
      <p 
      id="title"
      style={{
        position:"absolute",
        bottom:"20px",
        left:"20px",
        fontSize:"100px",
        margin:0
      }}>
      {location.hash.split("/")[1]}
      </p>
    </React.Fragment>
    );
  }
}

ReactDOM.render(<GpgpuCalculator />, document.getElementById("root"));
