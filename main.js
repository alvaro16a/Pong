(function () {
    self.Board = function (width, height) {
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements() {             //este metodo retorna las barras y pelotas dentro del tablero
            var elements = this.bars;
            //elements.push(this.ball);
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

        clean: function(){
            this.ctx.clearRect(0,0,board.width,board.height);
        },
        draw: function () {
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];

                draw(this.ctx, el);

            }
        },
        play: function(){
            this.clean();
            this.draw();
        }
    }

    function draw(ctx, element) {
        switch (element.kind) {    //dibuja el elemento deacuerdoa su tipo
            case "rectangle":
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;

        }
    }
})();

//(function(){})();

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
            
            if(this.y < board.height-this.height){
                this.y += this.speed;
            }  
        },
        up: function () {
            if(this.y > 0){
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
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas, board);

document.addEventListener("keydown", function (ev) {
    ev.preventDefault();
    if (ev.key == "ArrowUp") {
        bar_2.up();
    } else if (ev.key == "ArrowDown") {
        bar_2.down();
    } else if (ev.key == "w") {
        bar_1.up();
    } else if (ev.key == "s") {
        bar_1.down();
    }

    //console.log("" + bar_1);
    //console.log("" + bar_2);

});

//self.addEventListener("load",main);
window.requestAnimationFrame(controller);

function controller() {
    board_view.play();
    window.requestAnimationFrame(controller);
}