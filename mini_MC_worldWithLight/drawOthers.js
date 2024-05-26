function drawOthers(){
    /*
    var pyr1 = new pyramid();
    pyr1.color = yellow;
    pyr1.textureNum = 4;
    pyr1.matrix.translate(10, -1, 10);
    pyr1.matrix.rotate(4, 1, 0, 0);
    pyr1.matrix.scale(2, 1, 1);
    pyr1.render();
*/
    var house1 = new Cube();
    house1.textureNum = 4;
    house1.matrix.translate(8, -1, 5);
    house1.matrix.rotate(0, 1, 0, 0);
    house1.matrix.scale(4, 10, 4);
    house1.renderfaster();


    var house2 = new Cube();
    house2.textureNum = 6;
    house2.matrix.translate(8, -1, -10);
    house2.matrix.rotate(0, 1, 0, 0);
    house2.matrix.scale(4, 7.5, 4);
    house2.renderfaster();

    var house3 = new Cube();
    house3.textureNum = 4;
    house3.matrix.translate(-12, -1, 5);
    house3.matrix.rotate(0, 1, 0, 0);
    house3.matrix.scale(4, 10, 4);
    house3.renderfaster();

    var house4 = new Cube();
    house4.textureNum = 6;
    house4.matrix.translate(-12, -1, -10);
    house4.matrix.rotate(0, 1, 0, 0);
    house4.matrix.scale(4, 7.5, 4);
    house4.renderfaster();

    /*
    var gate1 = new Cube();
    gate1.textureNum = 5;
    gate1.matrix.translate(1, -1, 2);
    gate1.matrix.rotate(0, 1, 0, 0);
    gate1.matrix.scale(3, 3, 3);
    gate1.renderfaster();

    var gate2 = new Cube();
    gate2.textureNum = 5;
    gate2.matrix.translate(-4.25, -1, 2);
    gate2.matrix.rotate(0, 1, 0, 0);
    gate2.matrix.scale(3, 3, 3);
    gate2.renderfaster();

    var gate3 = new Cube();
    gate3.textureNum = 5;
    gate3.matrix.translate(-4.25, 2, 2);
    gate3.matrix.rotate(0, 1, 0, 0);
    gate3.matrix.scale(8.25, 3, 3);
    gate3.renderfaster();

    var gate4 = new Cube();
    gate4.textureNum = 6;
    gate4.matrix.translate(-3, -1, 5.01);
    gate4.matrix.rotate(0, 1, 0, 0);
    gate4.matrix.scale(5, 3, 0.1);
    gate4.renderfaster();

    var c1 = new Cube();
    c1.textureNum = -1;
    c1.matrix.translate(-4.6, 1, -5);
    c1.matrix.rotate(0, 1, 0, 0);
    c1.matrix.scale(1, 1, 1);
    c1.renderfaster();

    var c2 = new Cube();
    c2.textureNum = -1;
    c2.matrix.translate(3.5, 1, -5);
    c2.matrix.rotate(0, 1, 0, 0);
    c2.matrix.scale(1, 1, 1);
    c2.renderfaster();

    var c3 = new Cube();
    c3.textureNum = 5;
    c3.matrix.translate(-4.2, 2.5, -5);
    c3.matrix.rotate(0, 1, 0, 0);
    c3.matrix.scale(0.6, 0.6, 0.6);
    c3.renderfaster();

    var c4 = new Cube();
    c4.textureNum = 5;
    c4.matrix.translate(3.5, 2.5, -5);
    c4.matrix.rotate(0, 1, 0, 0);
    c4.matrix.scale(0.6, 0.6, 0.6);
    c4.renderfaster();

    var c5 = new Cube();
    c5.textureNum = 6;
    c5.matrix.translate(-4.6, -1, -5);
    c5.matrix.rotate(0, 1, 0, 0);
    c5.matrix.scale(1, 1.5, 1);
    c5.renderfaster();

    var c6 = new Cube();
    c6.textureNum = 6;
    c6.matrix.translate(3.5, -1, -5);
    c6.matrix.rotate(0, 1, 0, 0);
    c6.matrix.scale(1, 1.5, 1);
    c6.renderfaster();

    var c7 = new Cube();
    c7.textureNum = 5;
    c7.matrix.translate(-7.4, 2.5, -5);
    c7.matrix.rotate(0, 1, 0, 0);
    c7.matrix.scale(0.6, 0.6, 0.6);
    c7.renderfaster();

    var c8 = new Cube();
    c8.textureNum = 5;
    c8.matrix.translate(6.5, 2.5, -5);
    c8.matrix.rotate(0, 1, 0, 0);
    c8.matrix.scale(0.6, 0.6, 0.6);
    c8.renderfaster();

    var house5 = new Cube();
    house5.textureNum = 6;
    house5.matrix.translate(40, -1, 15);
    house5.matrix.rotate(0, 1, 0, 0);
    house5.matrix.scale(4, 60, 4);
    house5.renderfaster();

    var house6 = new Cube();
    house6.textureNum = 6;
    house6.matrix.translate(-45, -1, 15);
    house6.matrix.rotate(0, 1, 0, 0);
    house6.matrix.scale(4, 60, 4);
    house6.renderfaster();

    /*

    var house7 = new Cube();
    house7.textureNum = 6;
    house7.matrix.translate(40, -1, -10);
    house7.matrix.rotate(0, 1, 0, 0);
    house7.matrix.scale(4, 60, 4);
    house7.renderfaster();

    var ice1 = new Cube();
    ice1.textureNum = 6;
    ice1.matrix.translate(1.5, -1, -5);
    ice1.matrix.rotate(0, 1, 0, 0);
    ice1.matrix.scale(1, 1.5, 1);
    ice1.renderfaster();

    var ice2 = new Cube();
    ice2.textureNum = 6;
    ice2.matrix.translate(1.5, -1, -5);
    ice2.matrix.rotate(0, 1, 0, 0);
    ice2.matrix.scale(1, 1.5, 1);
    ice2.renderfaster();

    var ice3 = new Cube();
    ice3.textureNum = 6;
    ice3.matrix.translate(1.5, -1, -5);
    ice3.matrix.rotate(0, 1, 0, 0);
    ice3.matrix.scale(1, 1.5, 1);
    ice3.renderfaster();
    */

}
