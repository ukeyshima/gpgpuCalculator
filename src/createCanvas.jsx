import React from "react";
import PropTypes from "prop-types";
import vert from "./vertexShader.glsl";
import frag from "./fragmentShader.glsl";
const render = (canvas, gl, prg, uniLocation, vPosition) => {
  gl.useProgram(prg);
  gl.bindBuffer(gl.ARRAY_BUFFER, vPosition);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform2fv(uniLocation[0], [canvas.width, canvas.height]);
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  gl.flush();
};
const webGLStart = (canvas, gl, vs, fs, uniLocation) => {
  const create_shader = (text, type) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, text);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader;
    } else {
      alert(gl.getShaderInfoLog(shader));
      console.log(gl.getShaderInfoLog(shader));
    }
  };
  const create_program = (vs, fs) => {
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.useProgram(program);
      return program;
    } else {
      return null;
    }
  };
  const create_vbo = data => {
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_COPY);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
  };
  const create_ibo = data => {
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Int16Array(data),
      gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return ibo;
  };
  const prg = create_program(
    create_shader(vs, gl.VERTEX_SHADER),
    create_shader(fs, gl.FRAGMENT_SHADER)
  );

  uniLocation[0] = gl.getUniformLocation(prg, "resolution");
  uniLocation[1] = gl.getUniformLocation(prg, "mouse");
  uniLocation[2] = gl.getUniformLocation(prg, "click");
  uniLocation[3] = gl.getUniformLocation(prg, "usegpu");

  const position = [
    -1.0,
    1.0,
    0.0,
    1.0,
    1.0,
    0.0,
    -1.0,
    -1.0,
    0.0,
    1.0,
    -1.0,
    0.0
  ];
  const index = [0, 2, 1, 1, 2, 3];
  const vPosition = create_vbo(position);
  const vIndex = create_ibo(index);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vIndex);
  render(canvas, gl, prg, uniLocation, vPosition);
  return { prg: prg, vPosition: vPosition };
};

const calculate = (gl, script) => {
  const create_shader = (text, type) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, text);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader;
    } else {
      alert(gl.getShaderInfoLog(shader));
      console.log(gl.getShaderInfoLog(shader));
    }
  };
  const create_program = (vs, fs) => {
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.transformFeedbackVaryings(program, ["result"], gl.SEPARATE_ATTRIBS);
    gl.linkProgram(program);
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.useProgram(program);
      return program;
    } else {
      return null;
    }
  };
  const vs = `#version 300 es \n out float result; void main(void){result=${script};}`;
  const fs = `#version 300 es \n void main(void){}`;
  const prg = create_program(
    create_shader(vs, gl.VERTEX_SHADER),
    create_shader(fs, gl.FRAGMENT_SHADER)
  );
  const vTransformFeedback = gl.createBuffer();
  const transformFeedback = gl.createTransformFeedback();
  gl.bindBuffer(gl.ARRAY_BUFFER, vTransformFeedback);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    Float32Array.BYTES_PER_ELEMENT,
    gl.DYNAMIC_COPY
  );
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback);
  gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, vTransformFeedback);
  gl.beginTransformFeedback(gl.POINTS);
  gl.drawArrays(gl.POINTS, 0, 1);
  gl.endTransformFeedback();
  const arrBuffer = new Float32Array(1);
  gl.getBufferSubData(gl.TRANSFORM_FEEDBACK_BUFFER, 0, arrBuffer);
  return arrBuffer[0];
};
const calculate2 = script => {
  return eval(script);
};

const createFormula = (
  canvas,
  gl,
  uniLocation,
  e,
  script,
  usegpu,
  keyBuffer,
  result,
  prg,
  vPosition
) => {
  gl.uniform2fv(uniLocation[1], [e.clientX, e.clientY - result.height]);
  gl.uniform1i(uniLocation[2], true);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform2fv(uniLocation[0], [canvas.width, canvas.height]);
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  gl.flush();
  let keyNumber =
    Math.floor(
      (canvas.height - (e.clientY - result.height)) / (canvas.height / 5.0)
    ) *
      4.0 +
    Math.floor(e.clientX / (canvas.width / 4.0));
  let operator = "undifined";
  switch (keyNumber) {
    case 0:
      keyNumber = "0";
      break;
    case 1:
      keyNumber = "0";
      break;
    case 2:
      operator = ".";
      break;
    case 3:
      operator = "=";
      break;
    case 4:
      keyNumber = "1";
      break;
    case 5:
      keyNumber = "2";
      break;
    case 6:
      keyNumber = "3";
      break;
    case 7:
      operator = "+";
      break;
    case 8:
      keyNumber = "4";
      break;
    case 9:
      keyNumber = "5";
      break;
    case 10:
      keyNumber = "6";
      break;
    case 11:
      operator = "-";
      break;
    case 12:
      keyNumber = "7";
      break;
    case 13:
      keyNumber = "8";
      break;
    case 14:
      keyNumber = "9";
      break;
    case 15:
      operator = "*";
      break;
    case 16:
      keyBuffer = new Array();
      script = "";
      break;
    case 17:
      usegpu = !usegpu;
      gl.uniform1i(uniLocation[3], usegpu);
      render(canvas, gl, prg, uniLocation, vPosition);
      gl.flush();
      break;
    case 18:
      break;
    case 19:
      operator = "/";
      break;
      defalut: break;
  }
  if (keyNumber != 16 && keyNumber != 17 && keyNumber != 18) {
    if (keyBuffer.length > 0) {
      if (keyBuffer[keyBuffer.length - 1].type == "number") {
        if (operator == "undifined") {
          keyBuffer.push({ type: "number", key: keyNumber });
          if (script == "0") {
            script = keyNumber;
          } else {
            script += keyNumber;
          }
        } else {
          keyBuffer.push({ type: "operator", key: operator });
          if (operator == ".") {
            if (
              Math.max(
                script.lastIndexOf("+"),
                script.lastIndexOf("-"),
                script.lastIndexOf("*"),
                script.lastIndexOf("/")
              ) != -1
            ) {
              if (
                script
                  .slice(
                    Math.max(
                      script.lastIndexOf("+"),
                      script.lastIndexOf("-"),
                      script.lastIndexOf("*"),
                      script.lastIndexOf("/")
                    )
                  )
                  .indexOf(".") == -1
              ) {
                script += operator;
              }
            } else {
              if (script.indexOf(".") == -1) {
                script += operator;
              }
            }
          } else if (operator == "=") {
            if (
              Math.max(
                script.lastIndexOf("+"),
                script.lastIndexOf("-"),
                script.lastIndexOf("*"),
                script.lastIndexOf("/")
              ) != -1
            ) {
              if (
                script
                  .slice(
                    Math.max(
                      script.lastIndexOf("+"),
                      script.lastIndexOf("-"),
                      script.lastIndexOf("*"),
                      script.lastIndexOf("/")
                    )
                  )
                  .indexOf(".") == -1
              ) {
                script += ".0";
              }
            } else {
              if (script.indexOf(".") == -1) {
                script += ".0";
              }
            }

            let result = usegpu
              ? "" + calculate(gl, script)
              : "" + calculate2(script);
            keyBuffer = new Array();
            keyBuffer.push({ type: "number", key: result });
            script = result;
          } else {
            if (
              Math.max(
                script.lastIndexOf("+"),
                script.lastIndexOf("-"),
                script.lastIndexOf("*"),
                script.lastIndexOf("/")
              ) != -1
            ) {
              if (
                script
                  .slice(
                    Math.max(
                      script.lastIndexOf("+"),
                      script.lastIndexOf("-"),
                      script.lastIndexOf("*"),
                      script.lastIndexOf("/")
                    )
                  )
                  .indexOf(".") == -1
              ) {
                script += ".0" + operator;
              } else {
                script += operator;
              }
            } else {
              if (script.indexOf(".") == -1) {
                script += ".0" + operator;
              } else {
                script += operator;
              }
            }
          }
        }
      } else {
        if (operator == "undifined") {
          keyBuffer.push({ type: "number", key: keyNumber });
          script += keyNumber;
        }
      }
    } else if (operator == ".") {
      script = "0.";
    } else if (operator != "undifined") {
      //console.log("error!");
    } else {
      keyBuffer.push({ type: "number", key: keyNumber });
      script += keyNumber;
    }
  }
  let script2 = script;
  if (
    Math.max(
      script.lastIndexOf("+"),
      script.lastIndexOf("-"),
      script.lastIndexOf("*"),
      script.lastIndexOf("/")
    ) != -1
  ) {
    if (
      script
        .slice(
          Math.max(
            script.lastIndexOf("+"),
            script.lastIndexOf("-"),
            script.lastIndexOf("*"),
            script.lastIndexOf("/")
          )
        )
        .indexOf(".") == -1 &&
      script.slice(
        Math.max(
          script.lastIndexOf("+"),
          script.lastIndexOf("-"),
          script.lastIndexOf("*"),
          script.lastIndexOf("/")
        )
      ) != "+" &&
      script.slice(
        Math.max(
          script.lastIndexOf("+"),
          script.lastIndexOf("-"),
          script.lastIndexOf("*"),
          script.lastIndexOf("/")
        )
      ) != "-" &&
      script.slice(
        Math.max(
          script.lastIndexOf("+"),
          script.lastIndexOf("-"),
          script.lastIndexOf("*"),
          script.lastIndexOf("/")
        )
      ) != "*" &&
      script.slice(
        Math.max(
          script.lastIndexOf("+"),
          script.lastIndexOf("-"),
          script.lastIndexOf("*"),
          script.lastIndexOf("/")
        )
      ) != "/"
    ) {
      script2 += ".0";
    }
  } else {
    if (script.indexOf(".") == -1 && script != "") {
      script2 += ".0";
    }
  }
  return {
    script: script,
    result: script2,
    usegpu: usegpu,
    keyBuffer: keyBuffer
  };
};
const formulaEnd = (gl, prg, uniLocation) => {
  gl.useProgram(prg);
  gl.uniform1i(uniLocation[2], false);
};
class CreateCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.uniLocation = [];
    this.calculaterPrg = null;
    this.calculaterVbo = null;
    this.state = {
      usegpu: false,
      script: "",
      keyBuffer: []
    };
  }
  componentDidMount() {
    this.canvas.width = this.props.style.width;
    this.canvas.height = this.props.style.height;
    this.gl = this.canvas.getContext("webgl2");
    const obj = webGLStart(
      this.canvas,
      this.gl,
      vert(),
      frag(),
      this.uniLocation
    );    
    this.calculaterPrg = obj.prg;
    this.calculaterVbo = obj.vPosition;
  }
  handleResize(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
    this.gl.viewport(0, 0, w, h);
    render(
      this.canvas,
      this.gl,
      this.calculaterPrg,
      this.uniLocation,
      this.calculaterVbo
    );
  }
  onMousedown(e) {
    const formula = createFormula(
      this.canvas,
      this.gl,
      this.uniLocation,
      e.nativeEvent,
      this.state.script,
      this.state.usegpu,
      this.state.keyBuffer,
      this.props.resultstyle,
      this.calculaterPrg,
      this.calculaterVbo
    );
    this.props.updatestate(formula.result);
    this.setState({
      usegpu: formula.usegpu,
      script: formula.script,
      result: formula.result,
      keyBuffer: formula.keyBuffer
    });
  }
  onMouseup(e) {
    formulaEnd(this.gl, this.calculaterPrg, this.uniLocation);
    render(
      this.canvas,
      this.gl,
      this.calculaterPrg,
      this.uniLocation,
      this.calculaterVbo
    );
  }
  render() {
    return (
      <canvas
        style={this.props.style}
        ref={e => {
          this.canvas = e;
        }}
        onMouseDown={this.onMousedown.bind(this)}
        onMouseUp={this.onMouseup.bind(this)}
      />
    );
  }
}
CreateCanvas.propTypes = {
  updatestate: PropTypes.func.isRequired
};
export default CreateCanvas;
