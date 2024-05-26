
// pyramid.js (c) 2012 matsuda


class pyramid{
    constructor(){
        this.type = 'pyramid';
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
    }

    render(){

        var rgba = this.color;

        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // Front
        drawTriangle3D([0,0,0 ,  1,0,0,  0.5,1,0.5]);
        //
        gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);

        //back of cube
        drawTriangle3D([0,0,1, 1,0,1,  0.5,1,0.5]);

        gl.uniform4f(u_FragColor, rgba[0]*.8, rgba[1]*.8, rgba[2]*.7, rgba[3]);
        //bottom of cube
        drawTriangle3D([0,0,0, 0,0,1,  1,0,0]);
        drawTriangle3D([1,0,0, 1,0,1,  0,0,1]);

        //gl.uniform4f(u_FragColor, rgba[0]*.6, rgba[1]*.6, rgba[2]*.6, rgba[3]);
        //left side
        drawTriangle3D([0,0,0 ,  0,0,1,  0.5,1,0.5]);

        //gl.uniform4f(u_FragColor, rgba[0]*.6, rgba[1]*.6, rgba[2]*.6, rgba[3]);
        //right side
        drawTriangle3D([1,0,0 ,  1,0,1,  0.5,1,0.5]);

        //gl.uniform4f(u_FragColor, rgba[0]*.5, rgba[1]*.5, rgba[2]*.5, rgba[3]);
    }
}


