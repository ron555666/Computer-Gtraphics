/*
// Cube.js (c) 2012 matsuda
*/

class Cube{
  constructor(){
    this.type = 'cube';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.textureNum = -1;
    this.cubeVert32 = new Float32Array([
      0,0,0, 1,1,0, 1,0,0,
      0,0,0, 0,1,0, 1,1,0,
      0,1,0, 0,1,1, 1,1,1,
      0,1,0, 1,1,1, 1,1,0,
      1,1,0, 1,1,1, 1,0,0,
      1,0,0, 1,1,1, 1,0,1,
      0,1,0, 0,1,1, 0,0,0,
      0,0,0, 0,1,1, 0,0,1,
      0,0,0, 0,0,1, 1,0,1,
      0,0,0, 1,0,1, 1,0,0,
      0,0,1, 1,1,1, 1,0,1,
      0,0,1, 0,1,1, 1,1,1
    ]);
    this.cubeVerts = [
      0,0,0, 1,1,0, 1,0,0,
      0,0,0, 0,1,0, 1,1,0,
      0,1,0, 0,1,1, 1,1,1,
      0,1,0, 1,1,1, 1,1,0,
      1,1,0, 1,1,1, 1,0,0,
      1,0,0, 1,1,1, 1,0,1,
      0,1,0, 0,1,1, 0,0,0,
      0,0,0, 0,1,1, 0,0,1,
      0,0,0, 0,0,1, 1,0,1,
      0,0,0, 1,0,1, 1,0,0,
      0,0,1, 1,1,1, 1,0,1,
      0,0,1, 0,1,1, 1,1,1
    ];
    this.cubeUVverts = new Float32Array([
      0,0 ,1,1, 1,0,
      0,0 ,0,1, 1,1,
      0,0 ,0,1, 1,1,
      0,0 ,1,1, 1,0,
      0,1 ,1,1, 0,0,
      0,0 ,1,1, 1,0,
      0,1 ,1,1, 0,0,
      0,0 ,1,1, 1,0,
      0,0 ,0,1, 1,1,
      0,0 ,1,1, 1,0,
      0,0 ,1,1, 1,0,
      0,0 ,0,1, 1,1
    ]);
  }

  drawCube(){
    var rgba = this.color;

    gl.uniform1i(u_whichTexture, this.textureNum);

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    // Front of cube
    drawTriangle3DUV([0,0,0 ,  1,1,0,  1,0,0], [0,0 ,1,1, 1,0]);
    drawTriangle3DUV([0,0,0 ,  0,1,0,  1,1,0], [0,0 ,0,1, 1,1]);

    gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);

    // top of cube
    drawTriangle3DUV([0,1,0, 0,1,1,  1,1,1], [0,0 ,0,1, 1,1]);
    drawTriangle3DUV([0,1,0, 1,1,1,  1,1,0], [0,0 ,1,1, 1,0]);

    gl.uniform4f(u_FragColor, rgba[0]*.8, rgba[1]*.8, rgba[2]*.8, rgba[3]);
    //bottom of cube
    drawTriangle3DUV([0,0,0, 0,0,1,  1,0,1], [0,0 ,0,1, 1,1]);
    drawTriangle3DUV([0,0,0, 1,0,1,  1,0,0], [0,0 ,1,1, 1,0]);

    gl.uniform4f(u_FragColor, rgba[0]*.5, rgba[1]*.5, rgba[2]*.5, rgba[3]);
    //back of cube
    drawTriangle3DUV([0,0,1 ,  1,1,1,  1,0,1], [0,0 ,1,1, 1,0]);
    drawTriangle3DUV([0,0,1 ,  0,1,1,  1,1,1], [0,0 ,0,1, 1,1]);

    gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);
    //left side
    drawTriangle3DUV([0,1,0 ,  0,1,1,  0,0,0], [0,1 ,1,1, 0,0]);
    drawTriangle3DUV([0,0,0 ,  0,1,1,  0,0,1], [0,0 ,1,1, 1,0]);

    gl.uniform4f(u_FragColor, rgba[0]*.8, rgba[1]*.8, rgba[2]*.8, rgba[3]);
    //right side
    drawTriangle3DUV([1,1,0,   1,1,1,  1,0,0], [0,1 ,1,1, 0,0]);
    drawTriangle3DUV([1,0,0 ,  1,1,1,  1,0,1], [0,0 ,1,1, 1,0]);
  }

  renderfast(){
    var rgba = this.color;

    gl.uniform1i(u_whichTexture, this.textureNum);

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    var allverts = [];
    var allUVs = [];

    //Front of cube
    allverts = allverts.concat([0,0,0, 1,1,0, 1,0,0]);
    allverts = allverts.concat([0,0,0, 0,1,0, 1,1,0]);
    allUVs = allUVs.concat([0,0 ,1,1, 1,0]);
    allUVs = allUVs.concat([0,0 ,0,1, 1,1]);

    //top
    allverts = allverts.concat([0,1,0, 0,1,1, 1,1,1]);
    allverts = allverts.concat([0,1,0, 1,1,1, 1,1,0]);
    allUVs = allUVs.concat([0,0 ,0,1, 1,1]);
    allUVs = allUVs.concat([0,0 ,1,1, 1,0]);

    //right
    allverts = allverts.concat([1,1,0, 1,1,1, 1,0,0]);
    allverts = allverts.concat([1,0,0, 1,1,1, 1,0,1]);
    allUVs = allUVs.concat([0,1 ,1,1, 0,0]);
    allUVs = allUVs.concat([0,0 ,1,1, 1,0]);

    //left
    allverts = allverts.concat([0,1,0, 0,1,1, 0,0,0]);
    allverts = allverts.concat([0,0,0, 0,1,1, 0,0,1]);
    allUVs = allUVs.concat([0,1 ,1,1, 0,0]);
    allUVs = allUVs.concat([0,0 ,1,1, 1,0]);

    //bot
    allverts = allverts.concat([0,0,0, 0,0,1, 1,0,1]);
    allverts = allverts.concat([0,0,0, 1,0,1, 1,0,0]);
    allUVs = allUVs.concat([0,0 ,0,1, 1,1]);
    allUVs = allUVs.concat([0,0 ,1,1, 1,0]);

    //back
    allverts = allverts.concat([0,0,1, 1,1,1, 1,0,1]);
    allverts = allverts.concat([0,0,1, 0,1,1, 1,1,1]);
    allUVs = allUVs.concat([0,0 ,1,1, 1,0]);
    allUVs = allUVs.concat([0,0 ,0,1, 1,1]);

    drawTriangle3DUV(allverts, allUVs);
    drawTriangle3D(allverts);
  }

  renderfaster(){

    var rgba = this.color;

    gl.uniform1i(u_whichTexture, this.textureNum);

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    if(g_vertexBuffer == null){
      initTriangle3D();
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.cubeVerts), gl.DYNAMIC_DRAW);

    //gl.drawArrays(gl.TRIANGLES,0,36);

    drawTriangle3DUV(this.cubeVerts, this.cubeUVverts);
    drawTriangle3D(this.cubeVerts);
  }


}
