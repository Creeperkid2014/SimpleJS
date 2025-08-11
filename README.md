# SimpleJS

An upcoming lightweight simple JavaScript framework designed to simplify JavaScript.  
We are determined to make JavaScript as easy as possible for developers. It'll also save a lot of time.

## Example

`document.getElementById("myDiv");` is simplified to `doc.getId("myDiv");` in SimpleJS.

## WebGL Module

SimpleJS also includes a powerful yet easy-to-use WebGL helper module for rendering shapes and managing WebGL resources with minimal code.

### Features

- Render points with customizable size and color  
- Automatically handles canvas resizing for crisp graphics on all screens  
- Easy shader compilation and program creation  
- Utility functions for typed arrays and clearing the canvas  
- Built-in WebGL support detection  

### Basic Usage Example

```js
gl.MakeShape(
  [0, 0, 0.5, 0.5, -0.5, -0.5], // vertices as [x1, y1, x2, y2, x3, y3]
  {
    pointSize: 10,
    color: [0, 1, 0, 1],           // green points
    clearColor: [0, 0, 0, 1],      // black background
  }
);
```

---

## Developers

1. TheRealHaydynn  
2. AgentArk5  
3. SpaceNachos  

## Links

**Discord:** [https://discord.gg/wMxWYtfJzr](https://discord.gg/wMxWYtfJzr)

## Server Help

To run `server.js`, first navigate to its directory by running:  
```bash
cd /server```


Then start the server with:  
```bash
node server.js
```

This will start a **test HTTPS server** primarily used to test the WebSocket client (`main.js`). Use it responsibly and avoid malicious activities.

---

## Required Packages

If not already installed, use these commands:

- **Node.js** (make sure it's installed on your system)
- WebSocket package:  
```bash
npm install ws
```
## Install via NPM
install:```npm install simplejs_javascript_framework```

Import and use your package in your JavaScript code:

In your project’s .js file, import your package:

```const simplejs = require('simplejs-lite');```

If it uses ES Modules:

```import simplejs from 'simplejs-lite';```











