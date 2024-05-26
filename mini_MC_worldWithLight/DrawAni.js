// uniform color
let brownBody = [0.37, 0.25, 0.15, 3];
let brownLimb = [0.36, 0.24, 0.14, 2];
let brownFoot = [0.36, 0.25, 0.15, 5];
let brownToe = [0.42, 0.25, 0.15, 5];
let facial = [0,0,0,3];
let yellow = [1,0.6,0,1];

// global realted UI elements
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

function Drawing(){

    var lEar =  new Cube();
    lEar.color = brownBody;
    lEar.matrix.translate(-.15, .8, 0.25);
    lEar.matrix.rotate(-5, 1, 0.0, 0.0);
    lEar.matrix.scale(-0.18, 0.15, .05);
    lEar.drawCubeNormal();

    var lEar2 =  new Cube();
    lEar2.textureNum = -10;
    lEar2.color = facial;
    lEar2.matrix.translate(-.20, 0.835, 0.24);
    lEar2.matrix.rotate(-5, 1, 0.0, 0.0);
    lEar2.matrix.scale(-0.075, 0.075, .004);
    lEar2.drawCubeNormal();

    var rEar =  new Cube();
    rEar.color = brownBody;
    rEar.matrix.translate(.055, .8, 0.25);
    rEar.matrix.rotate(-5, 1, 0.0, 0.0);
    rEar.matrix.scale(0.18, 0.15, .05);
    rEar.drawCubeNormal();

    var rEar2 =  new Cube();
    rEar2.textureNum = -10;
    rEar2.color = facial;
    rEar2.matrix.translate(0.105, 0.835, 0.24);
    rEar2.matrix.rotate(-5, 1, 0.0, 0.0);
    rEar2.matrix.scale(0.075, 0.075, .004);
    rEar2.drawCubeNormal();

    var lEye = new Cube();
    lEye.color = facial;
    lEye.matrix.translate(-.28, .65, 0.13);
    lEye.matrix.rotate(-5, 1, 0.0, 0.0);
    lEye.matrix.scale(0.07, 0.04, .02);
    lEye.drawCubeNormal();

    var rEye = new Cube();
    rEye.color = facial;
    rEye.matrix.translate(.11, .65, 0.13);
    rEye.matrix.rotate(-5, 1, 0.0, 0.0);
    rEye.matrix.scale(0.07, 0.04, .02);
    rEye.drawCubeNormal();

    var mouth = new Cube();
    mouth.textureNum = -10;
    mouth.color = brownBody;
    mouth.matrix.translate(-.19, 0.5, 0.0);
    mouth.matrix.rotate(-5, 1, 0.0, 0.0);
    mouth.matrix.scale(0.28, 0.15, .2);
    mouth.drawCubeNormal();

    var mouth2 = new Cube();
    mouth2.textureNum = -10;
    mouth2.color = facial;
    mouth2.matrix.translate(-.15, 0.525, -0.015);
    mouth2.matrix.rotate(-5, 1, 0.0, 0.0);
    mouth2.matrix.scale(0.2, 0.075, .015);
    mouth2.drawCubeNormal();

    var mouth3 = new Cube();

    mouth3.color = facial;
    mouth3.matrix.translate(-0.10, 0.56, -0.03);
    mouth3.matrix.rotate(-5, 1, 0.0, 0.0);
    mouth3.matrix.scale(0.1, 0.075, .03);
    mouth3.drawCubeNormal();

    var head = new Cube();
    head.textureNum = 3;
    head.color = brownBody;
    head.matrix.translate(-.3, .45, 0.15);
    head.matrix.rotate(-5, 1, 0.0, 0.0);
    head.matrix.scale(0.5, .35, .4);
    head.drawCubeNormal();

    var body = new Cube();
    body.color = brownBody;
    body.textureNum = 3;
    if(g_normalOn) body.textureNum = -3;
    body.matrix.translate(-.45, .5, 0.0);
    body.matrix.rotate(-5, 1, 0.0, 0.0);
    body.matrix.scale(0.8, -1.2, .6);
    body.drawCubeNormal();

    var lHand = new Cube();
    lHand.textureNum = -1;
    lHand.color = brownFoot;
    lHand.matrix.translate(-.4, .4, 0.3);
    lHand.matrix.rotate(g_lHandAngle, 0.01, 0, 0);
    lHand.matrix.scale(0.2, -0.2, -0.6);
    lHand.drawCubeNormal();

    var rHand = new Cube();
    rHand.textureNum = -1;
    rHand.color = brownFoot;
    rHand.matrix.translate(.1, .4, 0.3);
    rHand.matrix.rotate(g_rHandAngle, 0.01, 0, 0);
    rHand.matrix.scale(0.2, -0.2, -0.6);
    rHand.drawCubeNormal();

    var lLeg = new Cube();
    lLeg.color = brownLimb;
    lLeg.textureNum = 3;
    lLeg.matrix.translate(-.1, -.6, 0.175);
    lLeg.matrix.rotate(-5, 1, 0.0, 0.0);
    lLeg.matrix.scale(-.3, -.2, .45);
    lLeg.matrix.rotate(-g_lLegAngle, 1, 0, 0);
    lLeg.drawCubeNormal();
    var lLegCoor = new Matrix4(lLeg.matrix);

    var lLeg2 = new Cube();
    lLeg2.textureNum = 3;
    lLeg2.color = brownFoot;
    lLeg2.matrix = lLegCoor;
    lLeg2.matrix.translate(0.1, 0.5, 0.15);
    lLeg2.matrix.rotate(-g_lFootAngle, 1, 0.0, 0.0);
    lLeg2.matrix.scale(.8, 1.2, .7);
    lLeg2.drawCubeNormal();
    var lLeg2Coor = new Matrix4(lLeg2.matrix);

    var lLeg3 = new Cube();
    lLeg3.color = brownToe;
    lLeg3.matrix = lLeg2Coor;
    lLeg3.matrix.translate(-0.05, 0.9, -0.09);
    lLeg3.matrix.scale(1.1, 0.15, 1.2);
    lLeg3.matrix.rotate( g_lToeAngle, 1.0, 0.0,0);
    lLeg3.drawCubeNormal();

    var rLeg = new Cube();
    rLeg.textureNum = 3;
    rLeg.color = brownLimb;
    rLeg.matrix.translate(0, -.6, 0.175);
    rLeg.matrix.rotate(-5, 1, 0, 0);
    //rLeg.matrix.setRotate(50, 1, 0, 0);
    //rLeg.matrix.setRotate(-5, 1, 0, 0);
    rLeg.matrix.scale(.3, -.2, .45);
    rLeg.matrix.rotate(g_rLegAngle, 1, 0, 0);
    rLeg.drawCubeNormal();
    var rLegCoor = new Matrix4(rLeg.matrix);

    var rLeg2 = new Cube();
    rLeg2.textureNum = 3;
    rLeg2.color = brownFoot;
    rLeg2.matrix = rLegCoor;
    rLeg2.matrix.translate(0.1, 0.5, 0.15);
    rLeg2.matrix.rotate(g_rFootAngle, 1, 0, 0);
    rLeg2.matrix.scale(0.8, 1.2, 0.7);
    rLeg2.drawCubeNormal();

    var rLeg2Coor = new Matrix4(rLeg2.matrix);

    var rLeg3 = new Cube();
    rLeg3.color = brownToe;
    rLeg3.matrix = rLeg2Coor;
    rLeg3.matrix.translate(-0.005, 0.9, -0.09);
    rLeg3.matrix.scale(1.1, 0.15, 1.2);
    rLeg3.matrix.rotate( g_rToeAngle, 1.0, 0.0,0);
    rLeg3.drawCubeNormal();

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


}
