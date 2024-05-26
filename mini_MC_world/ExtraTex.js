function initTextures2(){
  var image1 = new Image();
  if (!image1){
    console.log('Failed to create the grass object');
    return false;
  }
  image1.onload = function(){ sendImageToTEXTURE1(image1);};
  image1.src = 'tex/ground.jpg';

  var image2 = new Image();
  if (!image2){
    console.log('Failed to create the wall object');
    return false;
  }
  image2.onload = function(){ sendImageToTEXTURE2(image2);};
  image2.src = 'tex/iceWall.jpg';

  var image3 = new Image();
  if (!image3){
    console.log('Failed to create the wall object');
    return false;
  }
  image3.onload = function(){ sendImageToTEXTURE3(image3);};
  image3.src = 'tex/polarBear1.jpg';

  var image4 = new Image();
  if (!image4){
    console.log('Failed to create the image4 object');
    return false;
  }

  image4.onload = function(){ sendImageToTEXTURE4(image4);};
  image4.src = 'tex/purple.jpg';

  var image5 = new Image();
  if (!image5){
    console.log('Failed to create the image5 object');
    return false;
  }

  image5.onload = function(){ sendImageToTEXTURE5(image5);};
  image5.src = 'tex/dark.jpg';

  var image6 = new Image();
  if (!image6){
    console.log('Failed to create the image6 object');
    return false;
  }

  image6.onload = function(){ sendImageToTEXTURE6(image6);};
  image6.src = 'tex/ice.jpg';

  return true;

}


//-------------------------------------------------------------------------------------------
function sendImageToTEXTURE1(image1){
  let texture = gl.createTexture();
  if(!texture){
    console.log('Failed to create the texture object')
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image1);
  gl.uniform1i(u_Sampler1, 1);
  //console.log('finished loadTexture');
}

function sendImageToTEXTURE2(image2){
  let texture = gl.createTexture();
  if(!texture){
    console.log('Failed to create the texture object')
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image2);
  gl.uniform1i(u_Sampler2, 2);
  //console.log('finished loadTexture');
}

function sendImageToTEXTURE3(image3){
  let texture = gl.createTexture();
  if(!texture){
    console.log('Failed to create the texture object')
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE3);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image3);
  gl.uniform1i(u_Sampler3, 3);
  //console.log('finished loadTexture');
}

function sendImageToTEXTURE4(image4){
  let texture = gl.createTexture();
  if(!texture){
    console.log('Failed to create the texture object')
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE4);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image4);
  gl.uniform1i(u_Sampler4, 4);
  //console.log('finished loadTexture');
}

function sendImageToTEXTURE5(image5){
  let texture = gl.createTexture();
  if(!texture){
    console.log('Failed to create the texture object')
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE5);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image5);
  gl.uniform1i(u_Sampler5, 5);
  //console.log('finished loadTexture');
}

function sendImageToTEXTURE6(image6){
  let texture = gl.createTexture();
  if(!texture){
    console.log('Failed to create the texture object')
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE6);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image6);
  gl.uniform1i(u_Sampler6, 6);


}