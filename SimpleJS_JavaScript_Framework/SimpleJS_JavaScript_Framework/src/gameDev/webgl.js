const canvas = document.getElementById("canvas");
const webgl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

if (!webgl) {
  console.error("WebGL not supported by this browser.");
}

// Basic default shaders (can be overridden)
const defaultVertexShaderSource = `
  attribute vec2 a_position;
  uniform float u_pointSize;
  void main() {
    gl_PointSize = u_pointSize;
    gl_Position = vec4(a_position, 0, 1);
  }
`;

const defaultFragmentShaderSource = `
  precision mediump float;
  uniform vec4 u_color;
  void main() {
    gl_FragColor = u_color;
  }
`;

// Compile shader helper
function compileShader(glContext, type, source) {
  const shader = glContext.createShader(type);
  glContext.shaderSource(shader, source);
  glContext.compileShader(shader);
  if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
    console.error("Shader compile failed:", glContext.getShaderInfoLog(shader));
    glContext.deleteShader(shader);
    return null;
  }
  return shader;
}

// Create and link program helper
function createProgram(glContext, vertexShader, fragmentShader) {
  const program = glContext.createProgram();
  glContext.attachShader(program, vertexShader);
  glContext.attachShader(program, fragmentShader);
  glContext.linkProgram(program);
  if (!glContext.getProgramParameter(program, glContext.LINK_STATUS)) {
    console.error("Program link failed:", glContext.getProgramInfoLog(program));
    glContext.deleteProgram(program);
    return null;
  }
  return program;
}

// Resize canvas for high DPI displays
function resizeCanvasToDisplaySize(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth * dpr | 0;
  const height = canvas.clientHeight * dpr | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    webgl.viewport(0, 0, width, height);
  }
}

// Cache compiled shaders and programs to improve performance
const shaderCache = new Map();
const programCache = new Map();

const gl = {
  webglContext: webgl,

  glRenderContext() {
    return window.WebGLRenderingContext;
  },

  gameVersion(version) {
    // Stub for future version checks
    return version;
  },

  // Creates and draws points from vertex coordinates with options
  MakeShape(vertices, options = {}) {
    resizeCanvasToDisplaySize(canvas);

    const {
      vertexShaderSource = defaultVertexShaderSource,
      fragmentShaderSource = defaultFragmentShaderSource,
      pointSize = 5.0,
      color = [1, 0, 0, 1], // default red RGBA
      clearColor = [0, 0, 0, 1], // default black bg
      primitiveType = webgl.POINTS,
    } = options;

    // Compile or reuse shaders
    let vertexShader = shaderCache.get(vertexShaderSource);
    if (!vertexShader) {
      vertexShader = compileShader(webgl, webgl.VERTEX_SHADER, vertexShaderSource);
      shaderCache.set(vertexShaderSource, vertexShader);
    }

    let fragmentShader = shaderCache.get(fragmentShaderSource);
    if (!fragmentShader) {
      fragmentShader = compileShader(webgl, webgl.FRAGMENT_SHADER, fragmentShaderSource);
      shaderCache.set(fragmentShaderSource, fragmentShader);
    }

    // Create or reuse program
    const programKey = vertexShaderSource + fragmentShaderSource;
    let program = programCache.get(programKey);
    if (!program) {
      program = createProgram(webgl, vertexShader, fragmentShader);
      programCache.set(programKey, program);
    }

    webgl.useProgram(program);

    // Setup buffer
    const positionBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer);
    const verticesArray = new Float32Array(vertices);
    webgl.bufferData(webgl.ARRAY_BUFFER, verticesArray, webgl.STATIC_DRAW);

    const positionLocation = webgl.getAttribLocation(program, "a_position");
    webgl.enableVertexAttribArray(positionLocation);
    webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);

    // Set uniforms if present
    const pointSizeLocation = webgl.getUniformLocation(program, "u_pointSize");
    if (pointSizeLocation) {
      webgl.uniform1f(pointSizeLocation, pointSize);
    }

    const colorLocation = webgl.getUniformLocation(program, "u_color");
    if (colorLocation) {
      webgl.uniform4fv(colorLocation, color);
    }

    // Clear canvas and draw
    webgl.clearColor(...clearColor);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    webgl.drawArrays(primitiveType, 0, vertices.length / 2);

    // Cleanup
    webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
    webgl.useProgram(null);
  },

  // Typed array helpers
  Arr32F(array) {
    return new Float32Array(array);
  },
  Arr16F(array) {
    return new Uint16Array(array); // Float16Array is not widely supported; using Uint16Array as fallback
  },
  Arr8Int(array) {
    return new Int8Array(array);
  },
  Arr16Int(array) {
    return new Int16Array(array);
  },
  Arr32Int(array) {
    return new Int32Array(array);
  },

  // Shader compile helpers
  VShader(source) {
    return compileShader(webgl, webgl.VERTEX_SHADER, source);
  },

  FShader(source) {
    return compileShader(webgl, webgl.FRAGMENT_SHADER, source);
  },

  Program(vShader, fShader) {
    return createProgram(webgl, vShader, fShader);
  },

  ClearBufBit() {
    webgl.clear(webgl.COLOR_BUFFER_BIT);
  },

  // Clear canvas with custom color
  clearCanvas(r = 0, g = 0, b = 0, a = 1) {
    webgl.clearColor(r, g, b, a);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
  },
};

// Check if WebGL is supported
function isGlAllowed() {
  try {
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    console.error("Error occurred during WebGL process:", e);
    return false;
  }
}
