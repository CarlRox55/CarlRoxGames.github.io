function initGame() {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    let player = {
        x: 100,
        y: 100,
        size: 40,
        speed: 4
    };

    let keys = {};

    document.addEventListener("keydown", e => keys[e.key] = true);
    document.addEventListener("keyup", e => keys[e.key] = false);

    function update() {
        if (keys["w"]) player.y -= player.speed;
        if (keys["s"]) player.y += player.speed;
        if (keys["a"]) player.x -= player.speed;
        if (keys["d"]) player.x += player.speed;

        draw();
        requestAnimationFrame(update);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#64ffda";
        ctx.fillRect(player.x, player.y, player.size, player.size);
    }

    update();
}