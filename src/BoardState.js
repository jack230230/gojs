// Generated by CoffeeScript 1.4.0

define(function(require) {
  var BoardState, _;
  _ = require('underscore');
  BoardState = (function() {
    /*
        board state:
            move_color (who made the move in the board state)
                @BLACK or @WHITE
            stones_added:
                {WHITE:[collection of coords], BLACK:[collection of coords]}
    
            stones_removed:
                {WHITE:[collection of coords], BLACK:[collection of coords]}
    */

    function BoardState(board_state, move_color) {
      this.board_state = board_state;
      this.move_color = move_color;
      return this;
    }

    BoardState.prototype.getBoardState = function() {
      return this.board_state;
    };

    BoardState.prototype.getWhoMoved = function() {
      return this.move_color;
    };

    BoardState.prototype.runlength = function(c_input, t_input, c_index) {
      var i, t;
      t = "";
      t += t_input + "$";
      i = 0;
      i = c_index + 1;
      while (i < t.length) {
        if (c_input !== t[i]) {
          return i - c_index;
        }
        i++;
      }
      return -1;
    };

    BoardState.prototype.rle_encode = function(t) {
      var c, i, l, n, n_final;
      n = "";
      i = 0;
      while (i < t.length) {
        c = t[i];
        l = this.runlength(c, t, i);
        if (l > 2) {
          switch (c) {
            case "0":
              n += "A";
              break;
            case "1":
              n += "B";
              break;
            case "2":
              n += "C";
          }
          n += l;
          i += l;
          continue;
        } else if (l === 2) {
          switch (c) {
            case "0":
              n += "d";
              break;
            case "1":
              n += "e";
              break;
            case "2":
              n += "f";
          }
          i += l;
          continue;
        } else if (l === 1) {
          switch (c) {
            case "0":
              n += "a";
              break;
            case "1":
              n += "b";
              break;
            case "2":
              n += "c";
          }
        }
        i++;
      }
      n = n.replace(/ab/gi, "g");
      n = n.replace(/ba/gi, "G");
      n = n.replace(/bc/gi, "h");
      n = n.replace(/cb/gi, "H");
      n = n.replace(/ca/gi, "i");
      n = n.replace(/ac/gi, "I");
      n_final = "";
      i = 0;
      while (i < n.length) {
        c = n[i];
        l = this.runlength(c, n, i);
        if (l > 2) {
          n_final += c;
          n_final += l;
          i += l;
          continue;
        }
        n_final += c;
        i += 1;
      }
      return n_final;
    };

    BoardState.prototype.getHash = function() {
      var final_rle, virtual_board_string;
      virtual_board_string = _.flatten(this.board_state).join("");
      final_rle = this.rle_encode(virtual_board_string) + this.move_color.toString();
      return final_rle;
    };

    return BoardState;

  })();
  return BoardState;
});
