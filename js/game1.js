function initGame() {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    let player = {
        x: 100,
        y: 100,
        size: 40
    };
    
    let playerSpeed = 12;

    
    let playerYVel = 0;
    let grounded = false;
    let jumpHeight = 120;
    let gravity = 0.67;
    let groundHeight = 60;
    let XOffset = 0;
    let keys = {};

    document.addEventListener("keydown", e => keys[e.key] = true);
    document.addEventListener("keyup", e => keys[e.key] = false);
    


    update();

    
    function update() {
        playerMovement();

        draw();
        requestAnimationFrame(update);
    }






    function playerMovement(){

        if (keys["a"]) player.x -= playerSpeed;
        

        if (player.x - XOffset > canvas.width - 150) {
            XOffset = player.x - (canvas.width - 150);
        }
        if (player.x - XOffset < 150) {
            XOffset = player.x - 150;
        }

        if (keys["d"]) player.x += playerSpeed;

        playerYVel += gravity;
        player.y += playerYVel;
        if (player.y > canvas.height - groundHeight - player.size){
            player.y = canvas.height - groundHeight - player.size;
            playerYVel = 0;
        }
        grounded = player.y >= canvas.height - groundHeight - player.size;
        
        if (keys[" "] && grounded){
            playerYVel = -Math.sqrt(2 * gravity * jumpHeight);
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
        ctx.fillStyle = "#535a58";
        ctx.fillRect(player.x - XOffset, player.y, player.size, player.size);
    }
}
