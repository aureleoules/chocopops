var bulletTime1 = 0;
let bulletTime2 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.5 < clock.getElapsedTime())
    {
        console.log("shoot");
        player1.shoot();
        bulletTime1 = clock.getElapsedTime();
    }

    if (bulletTime2 + 1 < clock.getElapsedTime()) {
        const oldDirection = player2.direction;
        player2.direction = Math.random() * 2 * Math.PI;
        player2.shoot();
        player2.direction = oldDirection;
        bulletTime2 = clock.getElapsedTime();
    }

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

    for (var i = 0; i < player2.bullets.length; i++)
    {
        player2.bullets[i].position.x += moveDistance * Math.cos(player2.bullets[i].angle);
        player2.bullets[i].position.y += moveDistance * Math.sin(player2.bullets[i].angle);
    }
}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
            continue;
        }

        if (Math.abs(player1.bullets[i].position.x - player2.graphic.position.x) < 10 &&
            Math.abs(player1.bullets[i].position.y - player2.graphic.position.y) < 10)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
            player2.dead();
            continue;
        }
    }

    for (var i = 0; i < player2.bullets.length; i++)
    {
        if (Math.abs(player2.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player2.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player2.bullets[i]);
            player2.bullets.splice(i, 1);
            i--;
            continue;
        }

        if (Math.abs(player2.bullets[i].position.x - player1.graphic.position.x) < 10 &&
            Math.abs(player2.bullets[i].position.y - player1.graphic.position.y) < 10)
        {
            scene.remove(player2.bullets[i]);
            player2.bullets.splice(i, 1);
            i--;
            player1.life--;
            continue;
        }
    }

}

function player_collision()
{
    //collision between player and walls
    var x = player1.graphic.position.x + WIDTH / 2;
    var y = player1.graphic.position.y + HEIGHT / 2;

    if ( x > WIDTH )
        player1.graphic.position.x -= x - WIDTH;
    if ( y < 0 )
        player1.graphic.position.y -= y;
    if ( y > HEIGHT )
        player1.graphic.position.y -= y - HEIGHT;
    if ( x < 0 )
        player1.graphic.position.x -= x;
}

// falling timeout
var fallingTime = 0;
function player_falling()
{
    var nb_tile = 10;
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.graphic.position.x || 0;
    var y = player1.graphic.position.y || 0;
    var length = noGround.length;
    var element = null;

    for (var i = 0; i < length; i++) {
        element = noGround[i];
        if(!element) continue;

        var tileX = (element[0]) || 0;
        var tileY = (element[1]) || 0;
        var mtileX = (element[0] + sizeOfTileX) || 0;
        var mtileY = (element[1] + sizeOfTileY) || 0;

        if ((x > tileX)
            && (x < mtileX - 10)
            && (y > tileY) 
            && (y < mtileY - 10))
        {
            if (fallingTime + 1 < clock.getElapsedTime())
            {
                player1.life--;
                fallingTime = clock.getElapsedTime();
            }
        }
    }
}
