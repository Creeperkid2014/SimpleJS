//Randomly just noticed 4 lines of empty code. One of them is now a comment.


const canvas = document.getElementById("canvas");
const webgl = canvas.getContext("webgl");

// Basic vertex shader: positions vertices as points
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_PointSize = 5.0; 
    gl_Position = vec4(a_position, 0, 1);
  }
`;

// Basic fragment shader: colors the points red
const fragmentShaderSource = `
  void main() {
    gl_FragColor = vec4(1, 0, 0, 1); // red
  }
`;

// Helper to compile shader
function compileShader(webgl, type, source) {
  const shader = webgl.createShader(type);
  webgl.shaderSource(shader, source);
  webgl.compileShader(shader);
  if (!webgl.getShaderParameter(shader, webgl.COMPILE_STATUS)) {
    console.error("Shader compile failed:", webgl.getShaderInfoLog(shader));
    webgl.deleteShader(shader);
    return null;
  }
  return shader;
}

// Helper to create program
function createProgram(webgl, vShader, fShader) {
  const program = webgl.createProgram();
  webgl.attachShader(program, vShader);
  webgl.attachShader(program, fShader);
  webgl.linkProgram(program);
  if (!webgl.getProgramParameter(program, webgl.LINK_STATUS)) {
    console.error("Program link failed:", webgl.getProgramInfoLog(program));
    webgl.deleteProgram(program);
    return null;
  }
  return program;
}

const gl = {

  glRenderContext: function(){
    return window.WebGLRenderingContext;
  },

  gameVersion: function(version) {
    //You can turn this into an automatical version checker.
    return version;
  },

  MakeShape: function(...vertices) {

    // Compile shaders & program once 
    // you might want to cache this for performance
    const vertexShader = compileShader(webgl, webgl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(webgl, webgl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(webgl, vertexShader, fragmentShader);
  
    webgl.useProgram(program);
  
    // Create buffer & upload vertices
    const positionBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer);
    // Convert vertices array to Float32Array
    const verticesArray = new Float32Array(vertices);
    webgl.bufferData(webgl.ARRAY_BUFFER, verticesArray, webgl.STATIC_DRAW);
  
    // Get attribute location & enable it
    const positionLocation = webgl.getAttribLocation(program, "a_position");
    webgl.enableVertexAttribArray(positionLocation);
    webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);
  
    // Clear canvas & draw points
    webgl.clearColor(0, 0, 0, 1); // black background
    webgl.clear(gl.COLOR_BUFFER_BIT);
  
    // Draw points: count = number of vertices / 2 (because 2 coords per vertex)
    webgl.drawArrays(webgl.POINTS, 0, vertices.length / 2);
  },

  Arr32F: function(array) {
    return new Float32Array(array);
  },

  Arry16F: function(array) {
    return new Float16Array(array);
  },

  Arr8Int: function(array) {
    return new Int8Array(array);
  },

  Arr16Int: function(array) {
    return new Int16Array(array);
  },

  Arr32Int: function(array) {
    return new Int32Array(array);
  },

  VShader: function(source) {
    return compileShader(webgl, webgl.VERTEX_SHADER, source);
  },

  FShader: function(source) {
    return compileShader(webgl, webgl.FRAGMENT_SHADER, source);
  },

  Program: function(vShader, fShader) {
    return createProgram(webgl, vShader, fShader);
  },

  ClearBufBit: function() {
    webgl.clear(gl.COLOR_BUFFER_BIT);
  },

};

function isGlAllowed() {
    try {
      return !!(window.WebGLRenderingContext && (
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      console.log("Error occured during webgl process! Here's all we know:" + e)
      return false;
    }
  }