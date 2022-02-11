(function(){
    self.Board = function(width,height){
        this.width = width;
        this.height= height;
        this.playing = false;
        this.game_over = false;
        this.bars =[];
        this.ball = null;
    }
    
    self.Board.prototype = {
        get elements(){             //este metodo retorna las barras y pelotas dentro del tablero
            var elements = this.bars;
            elements.push(this.ball);
            return elements;
        }
    }

})();

(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype ={
        draw: function(){
            for (var i = this.board.elements.length - 1; i >= 0 ;i--) {
                var el = this.board.elements[i];

                draw(this.ctx, el);
                
            }
        }
    }

    function draw(ctx, element){
        if(element !== null && element.hasOwnProperty("kind")){
            switch(element.kind){    //dibuja el elemento deacuerdoa su tipo
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                    break;
            
            }
        }
 
    }
})();

(function(){
    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this); //acedo al elemento bars de la clase board y le agrego esta clase como eleento
        this.kind = "rectangle"; //que tipo de figura se debe dibuar
    }

    self.Bar.prototype = {
        down: function(){

        },
        up: function(){

        }

    }
})();

window.addEventListener("load",main);

function main(){
    var board = new Board(800,600);
    var bar_1 = new Bar(20,100,40,100,board);
    var bar_2 = new Bar(740,100,40,100,board);
    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas,board);

    board_view.draw();
}