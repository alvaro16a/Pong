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
        play: function () {
            if(this.board.playing){
                this.clean();
                this.draw();
                this.board.ball.move();
            }
        }
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
        this.speed_y = 4;
        this.speed_x = 1;
        this.board = board;
        this.direction = 1;

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
        this.speed = 15;


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
var bar_1 = new Bar(20, 100, 40, 100, board);
var bar_2 = new Bar(740, 100, 40, 100, board);
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

    console.log(ev.key);
    //console.log("" + bar_2);

});

board_view.draw();
//self.addEventListener("load",main);
window.requestAnimationFrame(controller);

function controller() {
    board_view.play();
    window.requestAnimationFrame(controller);
}