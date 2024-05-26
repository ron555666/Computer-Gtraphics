// ColoredPoint.js (c) 2012 matsuda
// Blocky Animal
// jlei18, cse160, asg2

var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  void main() {
    gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
  }`

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';


// global var
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_GlobalRotateMatrix;

// don't move it for the rest of the quarter
function setupWebGL(){
    // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.enable(gl.DEPTH_TEST);
}

function  connectVariablesToGLSL(){
 // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if(!u_ModelMatrix){
    console.log('Failed to get the stroage location of u_ModelMatrix');
    return;
  }


  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if(!u_GlobalRotateMatrix){
    console.log('Failed to get the stroage location of u_GlobalRotateMatrix');
    return;
  }

  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);

}

const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

// uniform color
let brownBody = [0.37, 0.25, 0.15, 3];
let brownLimb = [0.36, 0.24, 0.14, 2];
let brownFoot = [0.36, 0.25, 0.15, 5];
let brownToe = [0.42, 0.25, 0.15, 5];
let facial = [0,0,0,3];
let yellow = [1,0.6,0,1];

// global realted UI elements
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_globalAngle = 15;
let g_lLegAngle = 5;
let g_lFootAngle = 0;
let g_lLegAnimation = false;
let g_lFootAnimation = false;
let g_rLegAngle = -5;
let g_rFootAngle = 0;
let g_rLegAnimation = false;
let g_rFootAnimation = false;
let g_fullAnimation = false;
let g_lHandAngle = -30;
let g_rHandAngle = -30;
let g_lToeAngle = 0;
let g_rToeAngle = 0;
let g_lToeAnimation = false;
let g_rToeAnimation = false;
let g_lHandAnimation = false;
let g_rHandAnimation = false;


function addActionsForHtmlUI(){
  // Button Events
  document.getElementById('lHandMoveOff').onclick = function(){ g_lHandAnimation = false;  };
  document.getElementById('lHandMoveOn').onclick = function(){ g_lHandAnimation = true;  };

  document.getElementById('rHandMoveOff').onclick = function(){ g_rHandAnimation = false;  };
  document.getElementById('rHandMoveOn').onclick = function(){ g_rHandAnimation = true;  };

  document.getElementById('lLegMoveOff').onclick = function(){ g_lLegAnimation = false;  };
  document.getElementById('lLegMoveOn').onclick = function(){ g_lLegAnimation = true;  };
  document.getElementById('lFootMoveOff').onclick = function(){ g_lFootAnimation = false;  };
  document.getElementById('lFootMoveOn').onclick = function(){ g_lFootAnimation = true;  };

  document.getElementById('fullMoveOn').onclick = function(){ g_fullAnimation = true;  }
  document.getElementById('fullMoveOff').onclick = function(){ g_fullAnimation = false;  }

  
  document.getElementById('rLegMoveOff').onclick = function(){ g_rLegAnimation = false;  };
  document.getElementById('rLegMoveOn').onclick = function(){ g_rLegAnimation = true;  };
  document.getElementById('rFootMoveOff').onclick = function(){ g_rFootAnimation = false;  };
  document.getElementById('rFootMoveOn').onclick = function(){ g_rFootAnimation = true;  };

  document.getElementById('lToeMoveOff').onclick = function(){ g_lToeAnimation = false;  };
  document.getElementById('lToeMoveOn').onclick = function(){ g_lToeAnimation = true;  };

  document.getElementById('rToeMoveOff').onclick = function(){ g_rToeAnimation = false;  };
  document.getElementById('rToeMoveOn').onclick = function(){ g_rToeAnimation = true;  };

  // Slider Events
  document.getElementById('lHandSlide').addEventListener('mousemove', function() { g_lHandAngle = this.value; renderAllShapes(); });
  document.getElementById('rHandSlide').addEventListener('mousemove', function() { g_rHandAngle = this.value; renderAllShapes(); });

  document.getElementById('lLegSlide').addEventListener('mousemove', function() { g_lLegAngle = this.value; renderAllShapes(); });
  document.getElementById('lFootSlide').addEventListener('mousemove', function() { g_lFootAngle = this.value; renderAllShapes(); });
  document.getElementById('lToeSlide').addEventListener('mousemove', function() { g_lToeAngle = this.value; renderAllShapes(); });
  document.getElementById('rLegSlide').addEventListener('mousemove', function() { g_rLegAngle = this.value; renderAllShapes(); });
  document.getElementById('rFootSlide').addEventListener('mousemove', function() { g_rFootAngle = this.value; renderAllShapes(); });
  document.getElementById('rToeSlide').addEventListener('mousemove', function() { g_rToeAngle = this.value; renderAllShapes(); });
  //document.getElementById('angleSlide').addEventListener('mouseup', function() { g_globalAngle = this.value; renderAllShapes(); });

  //document.getElementById('lHandSlide').addEventListener('mousemove', function() { g_lHandAngle = this.value; renderAllShapes(); });
  //document.getElementById('rHandSlide').addEventListener('mousemove', function() { g_rHandAngle = this.value; renderAllShapes(); });
  document.getElementById('angleSlide').addEventListener('mousemove', function() { g_globalAngle = this.value; renderAllShapes(); });

}

function main() {

  setupWebGL();

  connectVariablesToGLSL();

  addActionsForHtmlUI();

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>

  requestAnimationFrame(tick);

  renderScene();

}

var g_shapesList = [];

function renderScene(){
  var startTime = performance.now();

  var globalRotmat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotmat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var lEar =  new Cube();
  lEar.color = brownBody;
  lEar.matrix.translate(-.15, .8, 0.25);
  lEar.matrix.rotate(-5, 1, 0.0, 0.0);
  lEar.matrix.scale(-0.18, 0.15, .05);
  lEar.drawCube();

  var lEar2 =  new Cube();
  lEar2.color = facial;
  lEar2.matrix.translate(-.20, 0.835, 0.24);
  lEar2.matrix.rotate(-5, 1, 0.0, 0.0);
  lEar2.matrix.scale(-0.075, 0.075, .004);
  lEar2.drawCube();

  var rEar =  new Cube();
  rEar.color = brownBody;
  rEar.matrix.translate(.055, .8, 0.25);
  rEar.matrix.rotate(-5, 1, 0.0, 0.0);
  rEar.matrix.scale(0.18, 0.15, .05);
  rEar.drawCube();

  var rEar2 =  new Cube();
  rEar2.color = facial;
  rEar2.matrix.translate(0.105, 0.835, 0.24);
  rEar2.matrix.rotate(-5, 1, 0.0, 0.0);
  rEar2.matrix.scale(0.075, 0.075, .004);
  rEar2.drawCube();

  var lEye = new Cube();
  lEye.color = facial;
  lEye.matrix.translate(-.28, .65, 0.13);
  lEye.matrix.rotate(-5, 1, 0.0, 0.0);
  lEye.matrix.scale(0.07, 0.04, .02);
  lEye.drawCube();

  var rEye = new Cube();
  rEye.color = facial;
  rEye.matrix.translate(.11, .65, 0.13);
  rEye.matrix.rotate(-5, 1, 0.0, 0.0);
  rEye.matrix.scale(0.07, 0.04, .02);
  rEye.drawCube();

  var mouth = new Cube();
  mouth.color = brownBody;
  mouth.matrix.translate(-.19, 0.5, 0.0);
  mouth.matrix.rotate(-5, 1, 0.0, 0.0);
  mouth.matrix.scale(0.28, 0.15, .2);
  mouth.drawCube();

  var mouth2 = new Cube();
  mouth2.color = facial;
  mouth2.matrix.translate(-.15, 0.525, -0.015);
  mouth2.matrix.rotate(-5, 1, 0.0, 0.0);
  mouth2.matrix.scale(0.2, 0.075, .015);
  mouth2.drawCube();

  var mouth3 = new Cube();
  mouth3.color = facial;
  mouth3.matrix.translate(-0.10, 0.56, -0.03);
  mouth3.matrix.rotate(-5, 1, 0.0, 0.0);
  mouth3.matrix.scale(0.1, 0.075, .03);
  mouth3.drawCube();

  var head = new Cube();
  head.color = brownBody;
  head.matrix.translate(-.3, .45, 0.15);
  head.matrix.rotate(-5, 1, 0.0, 0.0);
  head.matrix.scale(0.5, .35, .4);
  head.drawCube();

  var body = new Cube();
  body.color = brownBody;
  body.matrix.translate(-.45, .5, 0.0);
  body.matrix.rotate(-5, 1, 0.0, 0.0);
  body.matrix.scale(0.8, -1.2, .6);
  body.drawCube();

  var lHand = new Cube();
  lHand.color = brownFoot;
  lHand.matrix.translate(-.4, .4, 0.3);
  lHand.matrix.rotate(g_lHandAngle, 0.01, 0, 0);
  lHand.matrix.scale(0.2, -0.2, -0.6);
  lHand.drawCube();

  var rHand = new Cube();
  rHand.color = brownFoot;
  rHand.matrix.translate(.1, .4, 0.3);
  rHand.matrix.rotate(g_rHandAngle, 0.01, 0, 0);
  rHand.matrix.scale(0.2, -0.2, -0.6);
  rHand.drawCube();

  var lLeg = new Cube();
  lLeg.color = brownLimb;
  lLeg.matrix.translate(-.1, -.6, 0.175);
  lLeg.matrix.rotate(-5, 1, 0.0, 0.0);
  lLeg.matrix.scale(-.3, -.2, .45);
  lLeg.matrix.rotate(-g_lLegAngle, 1, 0, 0);
  lLeg.drawCube();
  var lLegCoor = new Matrix4(lLeg.matrix);

  var lLeg2 = new Cube();
  lLeg2.color = brownFoot;
  lLeg2.matrix = lLegCoor;
  lLeg2.matrix.translate(0.1, 0.5, 0.15);
  lLeg2.matrix.rotate(-g_lFootAngle, 1, 0.0, 0.0);
  lLeg2.matrix.scale(.8, 1.2, .7);
  lLeg2.drawCube();
  var lLeg2Coor = new Matrix4(lLeg2.matrix);

  var lLeg3 = new Cube();
  lLeg3.color = brownToe;
  lLeg3.matrix = lLeg2Coor;
  lLeg3.matrix.translate(-0.05, 0.9, -0.09);
  lLeg3.matrix.scale(1.1, 0.15, 1.2);
  lLeg3.matrix.rotate( g_lToeAngle, 1.0, 0.0,0);
  lLeg3.drawCube();

  var rLeg = new Cube();
  rLeg.color = brownLimb;
  rLeg.matrix.translate(0, -.6, 0.175);
  rLeg.matrix.rotate(-5, 1, 0, 0);
  //rLeg.matrix.setRotate(50, 1, 0, 0);
  //rLeg.matrix.setRotate(-5, 1, 0, 0);
  rLeg.matrix.scale(.3, -.2, .45);
  rLeg.matrix.rotate(g_rLegAngle, 1, 0, 0);
  rLeg.drawCube();
  var rLegCoor = new Matrix4(rLeg.matrix);

  var rLeg2 = new Cube();
  rLeg2.color = brownFoot;
  rLeg2.matrix = rLegCoor;
  rLeg2.matrix.translate(0.1, 0.5, 0.15);
  rLeg2.matrix.rotate(g_rFootAngle, 1, 0, 0);
  rLeg2.matrix.scale(0.8, 1.2, 0.7);
  rLeg2.drawCube();

  var rLeg2Coor = new Matrix4(rLeg2.matrix);

  var rLeg3 = new Cube();
  rLeg3.color = brownToe;
  rLeg3.matrix = rLeg2Coor;
  rLeg3.matrix.translate(-0.005, 0.9, -0.09);
  rLeg3.matrix.scale(1.1, 0.15, 1.2);
  rLeg3.matrix.rotate( g_rToeAngle, 1.0, 0.0,0);
  rLeg3.drawCube();

  var shoulder = new pyramid();
  var bodyCoor = new Matrix4(body.matrix);
  shoulder.color = yellow;
  shoulder.matrix.translate(-0.42, 0.5, 0.3);
  shoulder.matrix.rotate(-5, 1, 0, 0);
  shoulder.matrix.scale(0.1, .1, .1);
  shoulder.render();

  var shoulder2 = new pyramid();
  var bodyCoor = new Matrix4(body.matrix);
  shoulder2.color = yellow;
  shoulder2.matrix.translate(0.22, 0.5, 0.3);
  shoulder2.matrix.rotate(-5, 1, 0, 0);
  shoulder2.matrix.scale(0.1, .1, .1);
  shoulder2.render();

  var duration = performance.now() - startTime;
  //console.log(duration);
  sendTextToHTML(" ms: " + Math.floor(duration) + " fps: " +
     Math.floor(10000/duration/10), "numdot");
}

var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime;

function tick(){
  g_seconds = performance.now() / 1000.0 - g_startTime;
  //console.log(performance.now());

  updateAnimationAngles();

  renderScene();

  requestAnimationFrame(tick);
}

function updateAnimationAngles(){

  if (g_lHandAnimation){
    g_lHandAngle = ( 10 * Math.sin(g_seconds) );
  }

  if (g_rHandAnimation) {
    g_rHandAngle = ( 10 * Math.sin(g_seconds) );
  }

  if (g_lLegAnimation){
    g_lLegAngle = (12.5 * Math.sin(g_seconds));
  }

  if (g_lFootAnimation){
    g_lFootAngle = (12.5 * Math.sin(g_seconds));
  }

  if (g_lToeAnimation){
    g_lToeAngle = (6.5 * Math.sin(g_seconds) );
  }

  if (g_rLegAnimation){
    g_rLegAngle = (12.5 * Math.sin(g_seconds));
  }

  if (g_rFootAnimation){
    g_rFootAngle = (12.5 * Math.sin(g_seconds));
  }

  if (g_rToeAnimation) {
    g_rToeAngle = (6.5 * Math.sin(g_seconds));
  }

  if (g_fullAnimation){
    g_lHandAngle = ( -10 * Math.sin(g_seconds) );
    g_rHandAngle = ( 10 * Math.sin(g_seconds) );
    g_lLegAngle = (12.5 * Math.sin(g_seconds));
    g_lFootAngle = (12.5 * Math.sin(g_seconds));
    g_lToeAngle = (6.5 * Math.sin(g_seconds) );

    g_rLegAngle = (12.5 * Math.sin(g_seconds));
    g_rFootAngle = (12.5 * Math.sin(g_seconds));
    g_rToeAngle = (6.5 * Math.sin(g_seconds));
  }

}

function sendTextToHTML(text, htmlID){
  var htmlElm = document.getElementById(htmlID);
  if(!htmlElm){
    console.log ("Failed to get " + htmlID + " from HTML");
    return;
  }

  htmlElm.innerHTML = text;
}

