class Camera{
    constructor() {
        this.fov = 60.00;
        this.eye = new Vector3([0,0,-10]);
        this.at = new Vector3([0,0,100]);
        this.up = new Vector3([0,1,0]);
        this.speed = 0.5;
        this.angle = 10;

        /*this.viewMat = new Matrix4();
        this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
            this.at.elements[0], this.at.elements[1], this.at.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]);
*/

        this.projMat = new Matrix4();
        this.projMat.setPerspective(50, 1*canvas.width/canvas.height, 0.1, 1000);
        gl.uniformMatrix4fv(u_ProjectionMatrix, false, this.projMat.elements);
    }

    moveForward(){
        var f;
        f= new Vector3();
        f = f.set(this.at);
        f = f.sub(this.eye);
        f = f.normalize();
        f = f.mul(this.speed);
        this.eye = this.eye.add(f);
        this.at = this.at.add(f);
    }
    moveBackwards(){
        var b;
        b= new Vector3();
        b = b.set(this.eye);
        b = b.sub(this.at);
        b = b.normalize();
        b = b.mul(this.speed);
        this.eye = this.eye.add(b);
        this.at = this.at.add(b);
    }

    moveLeft(){
        var f;
        f = new Vector3();
        f = f.set(this.at);
        f = f.sub(this.eye);
        var s;
        s = new Vector3();
        s = Vector3.cross(this.up, f);
        s.normalize();
        s = s.mul(this.speed);
        this.eye = this.eye.add(s);
        this.at = this.at.add(s);
    }

    moveRight(){
        var f;
        f = new Vector3();
        f = f.set(this.at);
        f = f.sub(this.eye);
        var s;
        s = new Vector3();
        s = Vector3.cross(f,this.up);
        s.normalize();
        s = s.mul(this.speed);
        this.eye = this.eye.add(s);
        this.at = this.at.add(s);
    }

    panLeft(){
        var f;
        f = new Vector3();
        f = f.set(this.at);
        f = f.sub(this.eye);

        var rM;
        rM = new Matrix4();
        rM = rM.setRotate(this.angle, this.up.elements[0], this.up.elements[1], this.up.elements[2]);

        var f_prime = new Matrix4();
        f_prime = rM.multiplyVector3(f);
        var eye2 = new Vector3();
        eye2 = eye2.set(this.eye);
        this.at = eye2.add(f_prime);
    }

    panRight(){
        var f;
        f = new Vector3();
        f = f.set(this.at);
        f = f.sub(this.eye);

        var rM;
        rM = new Matrix4();
        rM = rM.setRotate(-(this.angle), this.up.elements[0], this.up.elements[1], this.up.elements[2]);

        var f_prime = new Matrix4();
        f_prime = rM.multiplyVector3(f);
        var eye2 = new Vector3();
        eye2 = eye2.set(this.eye);
        this.at = eye2.add(f_prime);
    }

    lookFarAway(){
        this.eye = new Vector3([0,1,-15]);
        this.at = new Vector3([0,0,100]);
        this.up = new Vector3([0,1,0]);
    }

    reset(){
        this.eye = new Vector3([0,0,-10]);
        this.at = new Vector3([0,0,100]);
        this.up = new Vector3([0,1,0]);
    }

    lookBack(){
        this.eye = new Vector3([0,2,37]);
        this.at = new Vector3([0,0,-100]);
        this.up = new Vector3([0,1,0]);
    }

/*
    panUp(){
        var f;
        f = new Vector3();
        f = f.set(this.at);
        f = f.sub(this.eye);

        var rM;
        rM = new Matrix4();
        rM = rM.setRotate(this.angle, this.at.elements[0], this.at.elements[1], this.at.elements[2]);

        var f_prime = new Matrix4();
        f_prime = rM.multiplyVector3(f);
        var eye2 = new Vector3();
        eye2 = eye2.set(this.eye);
        this.at = eye2.add(f_prime);
    }

    panDown(){
        var f;
        f = new Vector3();
        f = f.set(this.at);
        f = f.sub(this.eye);

        var rM;
        rM = new Matrix4();
        rM = rM.setRotate(this.angle, this.at.elements[0], this.at.elements[1], this.at.elements[2]);

        var f_prime = new Matrix4();
        f_prime = rM.multiplyVector3(f);
        var eye2 = new Vector3();
        eye2 = eye2.set(this.eye);
        this.at = eye2.add(f_prime);
    }
*/

}

