function update()
{
    var delta = clock.getDelta(); // seconds.
    var moveDistance = 50 * delta; // 200 pixels per second
    var rotateAngle = Math.PI / 2 * delta * 2;   // pi/2 radians (90 degrees) per second

    if (keyboard.pressed("left"))
        player1.turnLeft(rotateAngle);
    if (keyboard.pressed("d"))
        player1.turnRight(-rotateAngle);
    if (keyboard.pressed("up"))
        player1.accelerate(moveDistance);
    if (keyboard.pressed("down"))
        player1.decelerate(moveDistance);

    player1.move();
    setInterval(function(){
        if (player2.position.x > WIDTH / 2) {
            player2.direction = -Math.PI;
        } else if (player2.position.x < -WIDTH / 2) {
            player2.direction = 0;
        }
        player2.accelerate(moveDistance);
    });

    // automatic move
    player2.move();
    
    controls.update();
}