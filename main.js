(function () {
    self.Board = function (width, height) {
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
        this.playing = false;

    }

    self.Board.prototype = {
        get elements() {             //este metodo retorna las barras y pelotas dentro del tablero
            var elements = this.bars.map(function (bar) { return bar; });
            elements.push(this.ball);
            return elements;
        }
    }

})();

(function () {
    self.BoardView = function (canvas, board) {
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype = {

        clean: function () {
            this.ctx.clearRect(0, 0, board.width, board.height);
        },
        draw: function () {
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];

                draw(this.ctx, el);

            }
        },

        check_collisions: function(){
            for (var i = this.board.bars.length -1; i >= 0; i--) {                
                var bar=this.board.bars[i];
                if(hit(bar, this.board.ball)){
                    this.board.ball.collision(bar);
                }
            }
        },
        play: function () {
            if(this.board.playing){
                this.clean();
                this.draw();
                this.check_collisions();
                this.board.ball.move();
            }
        }
    }

    function hit(a,b){
        //Esta funcion revisa si hubo colision con b
        var hit = false;
        //Colisiones horizontales
        if(b.x + b.width >= a.x && b.x < a.x +a.width){
            //colision Vertical
            if(b.y +b.height >= a.y && b.y < a.y + a.height)
                hit = true;
        }

        //Colision de a con b
        if(b.x <= a.x && b.x + b.width >= a.x +a.width){
            if(b.y <= a.y && b.y +b.height >= a.y + a.height)
            hit = true;
        }

        //Colision de b con a
        if(a.x <= b.x && a.x + a.width >= b.x +b.width){
            if(a.y <= b.y && a.y +a.height >= b.y + b.height)
            hit = true;
        }
        return hit;
    }

    function draw(ctx, element) {
        switch (element.kind) {    //dibuja el elemento deacuerdoa su tipo
            case "rectangle":
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;

            case "circle":
                ctx.beginPath();
                ctx.arc(element.x, element.y, element.radius, 0, 7);
                ctx.fill();
                ctx.closePath();
                break;
        }
    }
})();

(function () {
    self.ball = function (x, y, radius, board) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 5;
        this.board = board;
        this.direction = 1;
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI /12;
        this.speed=10;

        board.ball = this;
        this.kind = "circle";
    }
    self.ball.prototype = {
        move: function () {
            this.x += (this.speed_x * this.direction);

            if (this.y >= board.height - this.radius) {
                this.speed_y = this.speed_y * -1
            }else if (this.y <= 0) {
                this.speed_y = this.speed_y * -1
            }
            this.y += (this.speed_y);
        },

        get width(){
            return this.radius*2;
        },
        get height(){
            return this.radius*2;
        },

        collision: function(bar){
            //Reacciona ante la colision con una barra
            var relative_intersect_y = (bar.y + (bar.height /2))-this.y;

            var normalized_intersect_y = relative_intersect_y /(bar.height/2);

            this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

            this.speed_y = this.speed * -Math.sin(this.bounce_angle);
            this.speed_x = this.speed * Math.cos(this.bounce_angle);

            if(this.x > (this.board.width / 2)) this.direction=-1;
            else this.direction=1;
        }
    }
})();

(function () {
    self.Bar = function (x, y, width, height, board) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this); //acedo al elemento bars de la clase board y le agrego esta clase como eleento
        this.kind = "rectangle"; //que tipo de figura se debe dibuar
        this.speed = 25;


    }

    self.Bar.prototype = {
        down: function () {

            if (this.y < board.height - this.height) {
                this.y += this.speed;
            }
        },
        up: function () {
            if (this.y > 0) {
                this.y -= this.speed;
            }
        },
        toString: function () {
            return "x:" + this.x + " y:" + this.y;
        }

    }
})();

var board = new Board(800, 450);
var bar_1 = new Bar(20, 100, 40, 150, board);
var bar_2 = new Bar(740, 100, 40, 150, board);
var ball = new ball(400, 225, 15, board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas, board);

document.addEventListener("keydown", function (ev) {
    
    if (ev.key == "ArrowUp") {
        ev.preventDefault();
        bar_2.up();
    } else if (ev.key == "ArrowDown") {
        ev.preventDefault();
        bar_2.down();
    } else if (ev.key == "w") {
        ev.preventDefault();
        bar_1.up();
    } else if (ev.key == "s") {
        ev.preventDefault();
        bar_1.down();
    } else if (ev.key == " "){
        ev.preventDefault();
        board.playing = !board.playing;
    }

    //console.log(ev.key);
    //console.log("" + bar_2);

});

board_view.draw();
//self.addEventListener("load",main);
window.requestAnimationFrame(controller);

function controller() {
    board_view.play();
    window.requestAnimationFrame(controller);
}