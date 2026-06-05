function initGame() {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    let player = {
        x: 100,
        y: 100,
        size: 40
    };
    
    let playerSpeed = 320;
    let jumpHeight = 120;
    let gravity = 1500;
    let jetpackForce = 40;
    let jetpackUseTime = 3;
    let jetpackChargeTime = 0.67;



    let directionFacing = 1;
    let fuel = 1;
    let playerYVel = 0;
    let grounded = false;
    let groundHeight = 60;
    let XOffset = 0;
    let keys = {};
    let timeJumped = 0;
    let time;
    let lastTime = 0; let dt = 1/60;
    let fps = 60;

    document.addEventListener("keydown", e => keys[e.key] = true);
    document.addEventListener("keyup", e => keys[e.key] = false);
    


    update();
    
    function update() {
        time = Date.now() / 1000;
        if (lastTime != 0) dt = time - lastTime;
        if (dt > 0) fps = 1 / dt;
        
        playerMovement(dt);

        draw();
        requestAnimationFrame(update);
        lastTime = time;
    }






    function playerMovement(){

        if (keys["a"]){ player.x -= playerSpeed * dt; directionFacing = 0; }
        if (keys["d"]){ player.x += playerSpeed * dt; directionFacing = 1; }

        if (player.x - XOffset > canvas.width - 150) {
            XOffset = player.x - (canvas.width - 150);
        }
        if (player.x - XOffset < 150) {
            XOffset = player.x - 150;
        }


        playerYVel += gravity * dt;
        player.y += playerYVel * dt;
        if (player.y > canvas.height - groundHeight - player.size){
            player.y = canvas.height - groundHeight - player.size;
            playerYVel = 0;
        }
        if (player.y < 0){
            player.y = 0;
            playerYVel *= -0.34;
        }
        grounded = player.y >= canvas.height - groundHeight - player.size;
        if (grounded){
            fuel += dt / jetpackChargeTime;
            if (fuel > 1)
                fuel = 1
            playerYVel = 0;
        }
        
        if (keys[" "]){
            if (grounded){
                playerYVel = -Math.sqrt(2 * gravity * jumpHeight);
                timeJumped = time;
            }
            else if(fuel > 0 && time-timeJumped > 0.15){
                playerYVel -= jetpackForce;
                fuel -= dt / jetpackUseTime;
            }
        }
        
    }

    function draw() {
        drawBG();
        drawPlayer();
    }
    
    function drawBG(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#87ceeb";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ffdd33";
        ctx.beginPath();
        ctx.arc(canvas.width - 80 - XOffset / 10, 80, 40, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#3a8c3a";
        ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
    }
    
    function drawPlayer(){
        ctx.fillStyle = "#c26868";
        ctx.fillRect(player.x - XOffset, player.y, player.size, player.size);
        
        ctx.fillStyle = "#000000";
        ctx.fillRect(player.x - XOffset + (directionFacing == 0 ? player.size : -14), player.y + player.size / 6, 14, player.size * 2/3);
        
        let opacity = map2(fuel, 0, 1, 1, 0);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(player.x - XOffset + (directionFacing == 0 ? player.size + 30 : -30), map(fuel, 0, 1, player.y + player.size * 3/2, player.y - player.size / 4), 9, map(fuel, 0, 1, 0, player.size * 3/2));
    }



    function map2(v, s1, e1, s2, e2) {
        return ((v * v - s1 * s1) / (e1 * e1 - s1 * s1)) * (e2 - s2) + s2;
    }
    function map(v, s1, e1, s2, e2) {
        return ((v - s1) / (e1 - s1)) * (e2 - s2) + s2;
    }
}
