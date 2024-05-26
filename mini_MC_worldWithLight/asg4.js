// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
// jlei18, cse160, asg3

var VSHADER_SOURCE = `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  attribute vec3 a_Normal;
  varying vec2 v_UV;
  varying vec3 v_Normal;
  varying vec4 v_VertPos;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
    v_Normal = a_Normal;
    v_VertPos = u_ModelMatrix * a_Position;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
    precision mediump float;
    varying vec2 v_UV;
    varying vec3 v_Normal;
    uniform vec4 u_FragColor;
    uniform sampler2D u_Sampler0;
    uniform sampler2D u_Sampler1;
    uniform sampler2D u_Sampler2;
    uniform sampler2D u_Sampler3;
    uniform sampler2D u_Sampler4;
    uniform sampler2D u_Sampler5;
    uniform sampler2D u_Sampler6;
    uniform int u_whichTexture;
    uniform vec3 u_lightPos;
    uniform vec3 u_cameraPos;
    varying vec4 v_VertPos;
    uniform bool u_lightOn;
    uniform vec4 u_lightColor;
    
    void main() {
      if (u_whichTexture == -3){
        gl_FragColor = vec4( (v_Normal + 1.0)/2.0, 1.0   );
      }
    
      else if(u_whichTexture == -2){
        gl_FragColor = u_FragColor;
      }
      
      else if (u_whichTexture == -1){             //use UV debug color
        gl_FragColor = vec4(v_UV, 1.0, 1.0);
      }
      
      else if (u_whichTexture == 0){
        gl_FragColor = texture2D(u_Sampler0, v_UV);
      }
      
      else if (u_whichTexture == 1){
        gl_FragColor = texture2D(u_Sampler1, v_UV);
      }
      
      else if (u_whichTexture == 2){
        gl_FragColor = texture2D(u_Sampler2, v_UV);
      }      
      
      else if (u_whichTexture == 3){
        gl_FragColor = texture2D(u_Sampler3, v_UV);
      }  
      
      else if (u_whichTexture == 4){
        gl_FragColor = texture2D(u_Sampler4, v_UV);
      }  
      
     else if (u_whichTexture == 5){
        gl_FragColor = texture2D(u_Sampler5, v_UV);
      }  
            
     else if (u_whichTexture == 6){
        gl_FragColor = texture2D(u_Sampler6, v_UV);
      }  
      
      else if (u_whichTexture == -10){
        gl_FragColor = vec4(0.8, 0.85, 0.8, 10);
      }  
      
      else if (u_whichTexture == -20){
        gl_FragColor = vec4(0, 0.6, 0, 10);
      }  
    
      else{
        gl_FragColor = vec4(1, .2, .2, 1);
      }
      
      //vec3 lightVector = vec3(v_VertPos) - u_lightPos;
      vec3 lightVector = u_lightPos - vec3(v_VertPos);
      float r = length(lightVector);
       
       // N dot L
       vec3 L = normalize(lightVector);
       vec3 N = normalize(v_Normal);
       float nDotL = max(dot(N,L), 0.0);
       
       //Reflection
       vec3 R = reflect(-L,N);
       
       //eye
       vec3 E = normalize(u_cameraPos - vec3(v_VertPos));
       
       //specular
       float specular = pow(max(dot(E,R), 0.0), 64.0) * 0.8;
       
       vec3 diffuse = vec3(1.0, 1.0, 0.9) * vec3(gl_FragColor) * nDotL *0.7;
       vec3 ambient = vec3(gl_FragColor) * 0.2;
       
       if(u_lightOn){
            gl_FragColor = vec4((specular+diffuse+ambient), 1.0);
            gl_FragColor = gl_FragColor * u_lightColor;
            gl_FragColor.a = 1.0;
         }
         else{
            gl_FragColor = vec4((diffuse+ambient), 1.0);
         }
    }`

/*
      //vec3 lightVector = vec3(v_VertPos) - u_lightPos;
      vec3 lightVector = u_lightPos - vec3(v_VertPos);
      float r = length(lightVector);

       // N dot 1
       vec3 L = normalize(lightVector);
       vec3 N = normalize(v_Normal);
       float nDotL = max(dot(N,L), 0.0);

       //Reflection
       vec3 R = reflect(-L,N);

       //eye
       vec3 E = normalize(u_cameraPos - vec3(v_VertPos));

       //specular
       float specular = pow(max(dot(E,R), 0.0), 64.0) * 0.8;

       vec3 diffuse = vec3(1.0, 1.0, 0.9) * vec3(gl_FragColor) * nDotL *0.7;
       vec3 ambient = vec3(gl_FragColor) * 0.2;

       if(u_lightOn){
        if(u_whichTexture == -2){
            gl_FragColor = vec4(specular+diffuse+ambient, 1.0) * u_lightColor;
          }

        else if (u_whichTexture == 3){
            gl_FragColor = vec4(specular+diffuse+ambient, 1.0)* u_lightColor;
          }

        else{
            gl_FragColor = vec4((diffuse+ambient), 1.0);
          }
        }
    }`
 */

// global var
let canvas;
let gl;
let a_Position;
let a_UV;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;
let u_GlobalRotateMatrix;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;
let u_Sampler4;
let u_Sampler5;
let u_Sampler6;
let u_whichTexture;
let u_lightPos;
let u_cameraPos;
let u_lightOn;
let u_lightColor;

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

  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if(a_UV < 0){
    console.log('Failed to get the storage location of a_UV');
    return;
  }

  a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
  if(a_Normal < 0){
    console.log('Failed to get the storage location of a_Normal');
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
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if(!u_GlobalRotateMatrix){
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if(!u_ViewMatrix){
    console.log('Failed to get the storage location of u_ViewMatrix');
    return;
  }

  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if(!u_ProjectionMatrix){
    console.log('Failed to get the storage location of u_ProjectionMatrix');
    return;
  }

  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if(!u_Sampler0){
    console.log('Failed to get the storage location of u_Sampler0');
    return;
  }

  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
  if(!u_Sampler1){
    console.log('Failed to get the storage location of u_Sampler1');
    return;
  }
  u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
  if(!u_Sampler2){
    console.log('Failed to get the storage location of u_Sampler2');
    return;
  }
  u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
  if(!u_Sampler3){
    console.log('Failed to get the storage location of u_Sampler3');
    return;
  }
  u_Sampler4 = gl.getUniformLocation(gl.program, 'u_Sampler4');
  if(!u_Sampler4){
    console.log('Failed to get the storage location of u_Sampler4');
    return;
  }
  u_Sampler5 = gl.getUniformLocation(gl.program, 'u_Sampler5');
  if(!u_Sampler5){
    console.log('Failed to get the storage location of u_Sampler5');
    return;
  }
  u_Sampler6 = gl.getUniformLocation(gl.program, 'u_Sampler6');
  if(!u_Sampler6){
    console.log('Failed to get the storage location of u_Sampler6');
    return;
  }

  u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
  if(!u_whichTexture){
    console.log('Failed to get the storage location of u_whichTexture');
    return;
  }

  u_lightPos = gl.getUniformLocation(gl.program, 'u_lightPos');
  if(!u_lightPos){
    console.log('Failed to get the storage location of u_lightPos');
    return;
  }

  u_lightOn = gl.getUniformLocation(gl.program, 'u_lightOn');
  if(!u_lightOn){
    console.log('Failed to get the storage location of u_lightOn');
    return;
  }

  u_cameraPos = gl.getUniformLocation(gl.program, 'u_cameraPos');
  if(!u_cameraPos){
    console.log('Failed to get the storage location of u_cameraPos');
    return;
  }

  u_lightColor = gl.getUniformLocation(gl.program, 'u_lightColor');
  if (!u_lightColor) {
    console.log('Failed to get the storage location of u_lightColor');
    return;
  }

  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

// global realted UI elements
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_globalAngle = 0;
let g_yellowAngle = 0;
var g_camera;
let g_normalOn = false;
let g_lightPos = [0,1,-2];
let g_lightOn = false;
let g_lightColor = [1,1,1,2];

function addActionsForHtmlUI(){
  // Button Events
  document.getElementById('normalOff').onclick = function(){ g_normalOn = false;  };
  document.getElementById('normalOn').onclick = function(){ g_normalOn = true;  };

  document.getElementById('lightOff').onclick = function(){ g_lightOn = false;  };
  document.getElementById('lightOn').onclick = function(){ g_lightOn = true;  };

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

  document.getElementById('lookFront').onclick = function(){ g_camera.lookFarAway(); };
  document.getElementById('reset').onclick = function(){ g_camera.reset(); };

  //document.getElementById('lookBack').onclick = function(){ g_camera.lookBack(); };

  // Slider Events
  document.getElementById('lHandSlide').addEventListener('mousemove', function() { g_lHandAngle = this.value; renderAllShapes(); });
  document.getElementById('rHandSlide').addEventListener('mousemove', function() { g_rHandAngle = this.value; renderAllShapes(); });

  document.getElementById('lLegSlide').addEventListener('mousemove', function() { g_lLegAngle = this.value; renderAllShapes(); });
  document.getElementById('lFootSlide').addEventListener('mousemove', function() { g_lFootAngle = this.value; renderAllShapes(); });
  document.getElementById('lToeSlide').addEventListener('mousemove', function() { g_lToeAngle = this.value; renderAllShapes(); });
  document.getElementById('rLegSlide').addEventListener('mousemove', function() { g_rLegAngle = this.value; renderAllShapes(); });
  document.getElementById('rFootSlide').addEventListener('mousemove', function() { g_rFootAngle = this.value; renderAllShapes(); });
  document.getElementById('rToeSlide').addEventListener('mousemove', function() { g_rToeAngle = this.value; renderAllShapes(); });

  document.getElementById('lightSlideX').addEventListener('mousemove', function(ev) { if(ev.buttons ==1) {g_lightPos[0] = this.value/100; renderAllShapes(); }});
  document.getElementById('lightSlideY').addEventListener('mousemove', function(ev) { if(ev.buttons ==1) {g_lightPos[1] = this.value/100; renderAllShapes(); }});
  document.getElementById('lightSlideZ').addEventListener('mousemove', function(ev) { if(ev.buttons ==1) {g_lightPos[2] = this.value/100; renderAllShapes(); }});

  document.getElementById('lightColorRed').addEventListener('mousemove', function(ev) { if(ev.buttons ==1) {g_lightColor[0] = this.value/255; renderAllShapes(); }});
  document.getElementById('lightColorGreen').addEventListener('mousemove', function(ev) { if(ev.buttons ==1) {g_lightColor[1] = this.value/255; renderAllShapes(); }});
  document.getElementById('lightColorBlue').addEventListener('mousemove', function(ev) { if(ev.buttons ==1) {g_lightColor[2] = this.value/255; renderAllShapes(); }});

  document.getElementById('angleSlide').addEventListener('mousemove', function() { g_globalAngle = this.value; renderAllShapes(); });
}

function initTextures(){
  var image = new Image();
  if (!image){
    console.log('Failed to create the image object');
    return false;
  }
  image.onload = function(){ sendImageToTEXTURE0(image);};
  image.src = 'tex/sky.jpg';

  //add more texture loading
  return true;
}

function sendImageToTEXTURE0(image){
  let texture = gl.createTexture();
  if(!texture){
    console.log('Failed to create the texture object')
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  gl.activeTexture(gl.TEXTURE0);

  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  gl.uniform1i(u_Sampler0, 0);
  //console.log('finished loadTexture');
}

function main() {

  setupWebGL();

  connectVariablesToGLSL();

  addActionsForHtmlUI();

  // Specify the color for clearing <canvas>

  g_camera = new Camera();

  document.onkeydown = keydown;
  canvas.onmousemove =  function(ev) { if(ev.buttons == 1) {onMove(ev)}};
  initTextures();
  initTextures2();

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  requestAnimationFrame(tick);

  renderAllShapes();
}

function keydown(ev){

  if(ev.keyCode == 39){ //right arrow
    g_camera.moveLeft();
  }
  else if(ev.keyCode == 37){ //left arrow
    g_camera.moveRight();
  }

  else if(ev.keyCode == 87){
    g_camera.moveForward();
  }
  else if(ev.keyCode == 83){
    g_camera.moveBackwards();
  }
  else if(ev.keyCode == 65){
    g_camera.moveLeft();
  }
  else if(ev.keyCode == 68){
    g_camera.moveRight();
  }
  else if(ev.keyCode == 81){
    g_camera.panLeft();
  }
  else if(ev.keyCode == 69){
    g_camera.panRight();
  }

  renderAllShapes();
}

var g_shapesList = [];

function renderAllShapes(){
  //g_camera = new Camera();
  var startTime = performance.now();

  var viewMat = new Matrix4();
  viewMat.setLookAt(g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2],
      g_camera.at.elements[0],  g_camera.at.elements[1],  g_camera.at.elements[2],
      g_camera.up.elements[0],  g_camera.up.elements[1],  g_camera.up.elements[2],
  );
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

  var globalRotmat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotmat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.uniform3f(u_lightPos, g_lightPos[0], g_lightPos[1],  g_lightPos[2]);
  gl.uniform3f(u_cameraPos, g_camera.eye.elements[0], g_camera.eye.elements[1],g_camera.eye.elements[2]);
  //gl.uniform3f(u_cameraPos, g_camera.eye.x, g_camera.eye.y, g_camera.eye.z);
  gl.uniform1i(u_lightOn, g_lightOn);
  gl.uniform4f(u_lightColor, g_lightColor[0], g_lightColor[1], g_lightColor[2], g_lightColor[4]);

  var light = new Cube();
  light.textureNum = -2;
  light.color = [2,2,0,1];
  light.color = g_lightColor;
  light.matrix.translate(g_lightPos[0],g_lightPos[1],g_lightPos[2]);
  light.matrix.scale(-.1,-.1,-.1);
  light.matrix.translate(-.5,-.5,1.5);
  light.drawCubeNormal();

  var floor = new Cube();
  floor.color = [1.0, 0.0, 0.0, 1.0];
  floor.textureNum = 1;
  //if (g_normalOn) floor.textureNum = -3;
  floor.matrix.translate(0,-1,0);
  floor.matrix.scale(30,0,30);
  floor.matrix.translate(-.5,0,-0.5);
  floor.drawCubeNormal();

  var sky = new Cube();
  sky.color = [1.0, 0.0, 0.0, 1.0];
  sky.textureNum = 0;
  if (g_normalOn) sky.textureNum = -3;
  sky.matrix.scale(-30,-30,-30);
  sky.matrix.translate(-.5,-.5,-0.5);
  sky.drawCubeNormal();

  var sp = new Sphere();
  sp.textureNum = -2;
  if (g_normalOn) sp.textureNum = -3;
  //sp.matrix.translate(-3,.5,.5);
  sp.matrix.translate(-3,.5,0);
  sp.render();
  //console.log(sp.textureNum);

  Drawing();
  //drawMap();
  //drawOthers();

  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) + " fps: " +
      Math.floor(10000/duration/10), "numdot");
}

var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime;

function tick(){
  g_seconds = performance.now() / 1000.0 - g_startTime;
  //console.log(performance.now());

  updateAnimationAngles();

  renderAllShapes();

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

    g_lightPos[0] = 2.3*Math.cos(g_seconds);
}

function click(ev) {
  //extract the event click and return it in WebGl coordinates
  let [x, y] = convertCoordinatesEventToGL(ev);

  let point;

  g_shapesList.push(point);

  //renderAllShapes();
}

// I learned the "MouseEvent.movementX" concept from a public resource "mozilla" and try to use it,
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX
function onMove(ev) {
  let angle1 = g_camera.angle;
  let angle2 = 3;
  if(ev.movementX>0){
    g_camera.angle = angle2;
    g_camera.panRight();
  }

  else if(ev.movementX<0){
    g_camera.angle = angle2;
    g_camera.panLeft();
  }

/*
  else if(ev.movementY>0){
    g_camera.angle = angle2;
    g_camera.panUp();
  }

  else if(ev.movementY<0){
    g_camera.angle = angle2;
    g_camera.panDown();
  }
*/

  g_camera.angle = angle1;
}

function sendTextToHTML(text, htmlID){
  var htmlElm = document.getElementById(htmlID);
  if(!htmlElm){
    console.log ("Failed to get " + htmlID + " from HTML");
    return;
  }

  htmlElm.innerHTML = text;
}