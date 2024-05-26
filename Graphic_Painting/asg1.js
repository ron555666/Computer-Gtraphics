// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
// jlei18, cse160, asg1

var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform float u_Size;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = u_Size;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  // uniform変数
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';


// global var
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

// don't move it for the rest of the quarter
function setupWebGL(){
    // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

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

  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
}

const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

// global realted UI elements
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_selectedSeg = 10;

function addActionsForHtmlUI(){
  // Button Events
  
  document.getElementById('red').onclick = function(){ g_selectedColor = [1.0, 0.0, 0.0, 1.0];  };
  document.getElementById('green').onclick = function(){ g_selectedColor = [0.0, 1.0, 0.0, 1.0];  };
  document.getElementById('blue').onclick = function(){ g_selectedColor = [0.0, 1.0, 1.0, 1.0];  };
  document.getElementById('white').onclick = function(){ g_selectedColor = [1.0, 1.0, 1.0, 1.0];  };

  document.getElementById('clearButton').onclick = function(){ g_shapesList = []; renderAllShapes(); };

  document.getElementById('pointButton').onclick = function(){ g_selectedType = POINT };
  document.getElementById('triButton').onclick = function(){ g_selectedType = TRIANGLE };
  document.getElementById('circleButton').onclick = function(){ g_selectedType = CIRCLE };

  document.getElementById('picButton').onclick = function(){ addPic(); };

  // Slider Events
  document.getElementById('redSlide').addEventListener('mouseup', function() { g_selectedColor[0] = this
    .value/100;} );
  document.getElementById('greenSlide').addEventListener('mouseup', function() { g_selectedColor[1] = this
    .value/100;} );
  document.getElementById('blueSlide').addEventListener('mouseup', function() { g_selectedColor[2] = this
    .value/100;} );

  document.getElementById('sizeSlide').addEventListener('mouseup', function() { g_selectedSize = this
    .value;} );
  document.getElementById('segmentCount').addEventListener('mouseup', function() { g_selectedSeg = this
    .value;} );

}


function main() {

  setupWebGL();

  connectVariablesToGLSL();

  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown =  click;
  canvas.onmousemove =  function(ev) { if(ev.buttons == 1) {click(ev)}};
  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

}

/*
var g_points = [];  // The array for the position of a mouse press
var g_colors = [];  // The array to store the color of a point
var g_sizes = [];
*/



var g_shapesList = [];


function click(ev) {

  //extract the event click and return it in WebGl coordinates
//[x, y] = convertCoordinatesEventToGL(ev);
  let [x, y] = convertCoordinatesEventToGL(ev);

  let point;
  if (g_selectedType == POINT){
    point = new Point();
  }
  else if( g_selectedType == TRIANGLE){
    point = new Triangle();
  }
  else{
    point = new Circle();
  }

  // Store the coordinates to g_points array
  //g_points.push([x, y]);
  //g_colors.push(g_selectedColor);
  //g_colors.push(g_selectedColor.slice());
  //g_sizes.push(g_selectedSize);

  point.position = [x, y];
  point.color = g_selectedColor.slice();
  point.size = g_selectedSize;
  if(Circle){
    point.segments = g_selectedSeg;
  }

  g_shapesList.push(point);

  renderAllShapes();

}

function convertCoordinatesEventToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return ([x, y]);
}
 
function renderAllShapes(){

  var startTime = performance.now();

    // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_shapesList.length;

  for(var i = 0; i < len; i++) {
    g_shapesList[i].render();

  }

  var duration = performance.now() - startTime;
  sendTextToHTML("numdot: " + len + " ms: " + Math.floor(duration) + " fps: " +
     Math.floor(10000/duration/10), "numdot");
}

function sendTextToHTML(text, htmlID){
  var htmlElm = document.getElementById(htmlID);
  if(!htmlElm){
    console.log ("Failed to get " + htmlID + " from HTML");
    return;
  }

  htmlElm.innerHTML = text;
}


function addPic() {
  //console.log("qwer");
    let triangle1 = new Triangle();
    triangle1.size = 300;
    triangle1.type = 'Triangle';
    triangle1.position = [-0.885, -0.93];
    triangle1.color = [0.1, 0, 0, 1];
    g_shapesList[0] = triangle1;

    let t2 = new Triangle();
    t2.size = 360;
    t2.type = 'Triangle';
    t2.position = [-0.98, -0.98];
    t2.color = [0.5, 0, 0, 1];
    g_shapesList[1] = t2;


    let t3 = new Triangle();
    t3.size = 340;
    t3.type = 'Triangle';
    t3.position = [-0.95, -0.95];
    t3.color = [0.65, 0, 0, 1];
    g_shapesList[2] = t3;

    let t4 = new Triangle();
    t4.size = 320;
    t4.type = 'Triangle';
    t4.position = [-0.92, -0.92];
    t4.color = [0.8, 0, 0, 1];
    g_shapesList[3] = t4;

    let t5 = new Triangle();
    t5.size = 300;
    t5.type = 'Triangle';
    t5.position = [-0.89, -0.89];
    t5.color = [1, 0, 0, 1];
    g_shapesList[4] = t5;

    let t6 = new Triangle();
    t6.size = 280;
    t6.type = 'Triangle';
    t6.position = [-0.87, -0.87];
    t6.color = [1, 1, 0, 1];
    g_shapesList[5] = t6;

    let t7 = new Triangle();
    t7.size = 260;
    t7.type = 'Triangle';
    t7.position = [-0.85, -0.85];
    t7.color = [1, 0.8, 0, 1];
    g_shapesList[6] = t7;

    let t8 = new Triangle();
    t8.size = 240;
    t8.type = 'Triangle';
    t8.position = [-0.83, -0.83];
    t8.color = [1, 0.6, 0, 1];
    g_shapesList[7] = t8;

    let t9 = new Triangle();
    t9.size = 220;
    t9.type = 'Triangle';
    t9.position = [-0.81, -0.81];
    t9.color = [1, 0.4, 0, 1];
    g_shapesList[8] = t9;

    let t10 = new Triangle();
    t10.size = 200;
    t10.type = 'Triangle';
    t10.position = [-0.79, -0.79];
    t10.color = [1, 0.2, 0, 1];
    g_shapesList[9] = t10;

    let t11 = new Triangle();
    t11.size = 180;
    t11.type = 'Triangle';
    t11.position = [-0.77, -0.77];
    t11.color = [1, 0, 0, 1];
    g_shapesList[10] = t11;

    let t12 = new Triangle();
    t12.size = 160;
    t12.type = 'Triangle';
    t12.position = [-0.75, -0.75];
    t12.color = [1, 0, 1, 1];
    g_shapesList[11] = t12;

    let t13 = new Triangle();
    t13.size = 140;
    t13.type = 'Triangle';
    t13.position = [-0.73, -0.73];
    t13.color = [1, 0, 0.8, 1];
    g_shapesList[12] = t13;

    let t14 = new Triangle();
    t14.size = 120;
    t14.type = 'Triangle';
    t14.position = [-0.71, -0.71];
    t14.color = [1, 0, 0.6, 1];
    g_shapesList[13] = t14;

    let t15 = new Triangle();
    t15.size = 100;
    t15.type = 'Triangle';
    t15.position = [-0.69, -0.69];
    t15.color = [1, 0, 0.4, 1];
    g_shapesList[14] = t15;

    let t16 = new Triangle();
    t16.size = 80;
    t16.type = 'Triangle';
    t16.position = [-0.67, -0.67];
    t16.color = [1, 0, 0.2, 1];
    g_shapesList[15] = t16;

    let t17 = new Triangle();
    t17.size = 60;
    t17.type = 'Triangle';
    t17.position = [-0.65, -0.65];
    t17.color = [0, 1, 1, 1];
    g_shapesList[16] = t17;

    let t18 = new Triangle();
    t18.size = 40;
    t18.type = 'Triangle';
    t18.position = [-0.63, -0.63];
    t18.color = [0, 1, 0.5, 1];
    g_shapesList[17] = t18;

    let t19 = new Triangle();
    t19.size = 20;
    t19.type = 'Triangle';
    t19.position = [-0.61, -0.61];
    t19.color = [0, 1, 0.2, 1];
    g_shapesList[18] = t19;

    let t20 = new Triangle();
    t20.size = 10;
    t20.type = 'Triangle';
    t20.position = [-0.59, -0.59];
    t20.color = [0, 0, 0.9, 1];
    g_shapesList[19] = t20;

    renderAllShapes();

  }






