var newGame = {
  map:     [['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'],
            ['wall','dot','dot', 'dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','wall'],
            ['wall','dot','wall','wall', 'wall', 'wall', 'dot', 'dot', 'dot', 'wall', 'dot', 'dot', 'dot', 'dot','dot','dot', 'dot', 'wall', 'dot', 'dot', 'dot', 'wall', 'wall', 'wall', 'wall', 'dot', 'wall'],
            ['wall','dot','wall', 'dot','dot', 'dot','dot','dot','dot','wall','dot', 'dot','dot', 'dot','dot','dot', 'dot','wall', 'dot','dot','dot','dot','dot','dot', 'wall','dot', 'wall'],
            ['wall','dot','wall', 'dot','wall','wall','wall','wall','dot','wall', 'dot','wall', 'wall','path','wall','wall', 'dot','wall','dot','wall','wall','wall','wall', 'dot','wall', 'dot','wall'],
            ['wall','dot','wall', 'dot','dot', 'dot','dot','dot','dot','wall', 'dot','wall',  'path','path','path','wall', 'dot', 'wall','dot','dot','dot','dot','dot', 'dot','wall',  'dot','wall'],
            ['wall','dot','dot', 'dot','wall','wall','wall','wall','dot','wall', 'dot','wall', 'path','path','path','wall', 'dot','wall','dot','wall','wall','wall','wall', 'dot','dot', 'dot','wall'],
            ['wall','dot','dot', 'dot','dot', 'wall', 'dot', 'dot', 'dot', 'wall', 'dot', 'wall','wall', 'wall','wall','wall', 'dot','wall', 'dot', 'dot', 'dot', 'wall', 'dot', 'dot', 'dot','dot', 'wall'],
            ['wall','dot','wall', 'wall','dot','wall','dot','dot','dot','wall','dot','dot','dot','dot','dot','dot', 'dot','wall','dot','dot','dot','wall','dot','wall','wall','dot','wall'],
            ['wall','dot','wall', 'wall', 'dot', 'dot', 'dot', 'dot', 'dot', 'wall', 'dot', 'dot', 'dot', 'dot','dot','dot', 'dot', 'wall', 'dot', 'dot', 'dot', 'dot', 'dot', 'wall', 'wall', 'dot', 'wall'],
            ['wall','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','dot','wall'],
            ['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall']
          ],
  score: 0,
  dotCount: 0,
  renderBoard: function () {
    //read, style, and append to DOM based on string contents of hard-coded matrix
      $('.map-height-support').empty();
      var blockClass;
      var blockHtml;
      newGame.dotCount = 0;
      newGame.map.forEach(function(row) {
          row.forEach(function (tile) {
            if (tile === 'path') {
              blockClass = 'tile interior-block';
              blockHtml = '<div class="'+blockClass+'"></div>';
              $('.map-height-support').append(blockHtml);
            }
            else if (tile === 'wall') {
              blockClass = 'tile exterior-block';
              blockHtml = '<div class="'+blockClass+'"></div>';
              $('.map-height-support').append(blockHtml);
            }
            else if (tile === 'pac-man'){
              blockClass = 'tile current-position';
              blockHtml = '<div class="'+blockClass+'"></div>';
              $('.map-height-support').append(blockHtml);
              pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
              currentPosition = $('.current-position');
              currentPosition.append(pacManHtml);
              $('.pac-man').css({'transform' : 'rotate('+newGame.direction+'deg)'});
            }
            else if (tile === 'ghost') {
              blockClass = 'tile ghost-position';
              blockHtml = '<div class="'+blockClass+'"></div>';
              $('.map-height-support').append(blockHtml);
              var ghostHtml = '<img src="img/red-ghost.png" class="ghost">';
              $('.ghost-position').append(ghostHtml);
            }
            else if (tile === 'dot') {
              blockHtml = '<div class="tile interior-block"><div class="dot"></div></div>';
              $('.map-height-support').append(blockHtml);
              newGame.dotCount += 1;
            }
          });
      });
  },
  updateScore: function () {
    $('.score').html("Score: " + newGame.score);
  },
  checkWin: function() {
    if (newGame.dotCount === 0) {
      alert("YOU WIN!");
      $('.map-height-support').empty();
    }
  },
  findGhost: function(target) {
    for( var i = 0; i < this.map.length; i += 1) {
      for (var j = 0; j <this.map[1].length; j += 1) {
        if (this.map[i][j] === target) {
          return [i, j];
        }
      }
    }
    return undefined;
  },
  move: function(string) {
    var pacManHtml;
    var pacManPosition = newGame.findGhost('pac-man');

      switch(string) {
        case 'left':
        if (  newGame.map[pacManPosition[0]][pacManPosition[1]-1] === 'wall') {
          return;
        } else if(newGame.map[pacManPosition[0]][pacManPosition[1]-1] === 'dot'){
        ion.sound.play('water-drop');
        newGame.dotCount -= 1;
        newGame.score += 10;
        newGame.updateScore();
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[pacManPosition[0]][pacManPosition[1]] = 'path'; //assign former position to interior-block
        pacManPosition[1] -= 1; //decrement current position
        newGame.map[pacManPosition[0]][pacManPosition[1]] = 'pac-man'; //assign class to new position
        newGame.renderBoard();//renderBoard
        pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
        currentPosition = $('.current-position');
        currentPosition.append(pacManHtml);
        newGame.direction = '90';
        $('.pac-man').css({'transform' : 'rotate(90deg)'});
        }
        else if(newGame.map[pacManPosition[0]][pacManPosition[1]-1] === 'path') {
          $('.pac-man').remove(); //remove pacman from current div
          newGame.map[pacManPosition[0]][pacManPosition[1]] = 'path'; //assign former position to interior-block
          pacManPosition[1] -= 1; //decrement current position
          newGame.map[pacManPosition[0]][pacManPosition[1]] = 'pac-man';
          newGame.renderBoard();
          pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
          currentPosition = $('.current-position');
          currentPosition.append(pacManHtml);
          newGame.direction = '90';
          $('.pac-man').css({'transform' : 'rotate(90deg)'});
        }
        break;

        case 'right':
        if (  newGame.map[pacManPosition[0]][pacManPosition[1]+1] === 'wall') {
          return;
        } else if(newGame.map[pacManPosition[0]][pacManPosition[1]+1] === 'dot'){
        ion.sound.play('water-drop');
        newGame.dotCount -= 1;
        newGame.score += 10;
        newGame.updateScore();
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[pacManPosition[0]][pacManPosition[1]] = 'path'; //assign former position to interior-block
        pacManPosition[1] += 1; //decrement current position
        newGame.map[pacManPosition[0]][pacManPosition[1]] = 'pac-man';
        newGame.renderBoard();
        pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
        currentPosition = $('.current-position');
        currentPosition.append(pacManHtml);
        newGame.direction = '270';
        $('.pac-man').css({'transform' : 'rotate(270deg)'});
        }
        else if(newGame.map[pacManPosition[0]][pacManPosition[1]+1] === 'path') {
          $('.pac-man').remove(); //remove pacman from current div
          newGame.map[pacManPosition[0]][pacManPosition[1]] = 'path'; //assign former position to interior-block
          pacManPosition[1]+= 1; //decrement current position
          newGame.map[pacManPosition[0]][pacManPosition[1]] = 'pac-man';
          newGame.renderBoard();
          pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
          currentPosition = $('.current-position');
          currentPosition.append(pacManHtml);}
          newGame.direction = '270';
          $('.pac-man').css({'transform' : 'rotate(270deg)'});
        break;

        case 'up':
        if (  newGame.map[pacManPosition[0] - 1][pacManPosition[1]] === 'wall') {
          return;
        } else if(newGame.map[pacManPosition[0] - 1][pacManPosition[1]] === 'dot'){
        ion.sound.play('water-drop');
        newGame.dotCount -= 1;
        newGame.score += 10;
        newGame.updateScore();
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[pacManPosition[0]][pacManPosition[1]] = 'path'; //assign former position to interior-block
        pacManPosition[0] -= 1; //decrement current position
        newGame.map[pacManPosition[0]][pacManPosition[1]] = 'pac-man';
        newGame.renderBoard();
        pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
        currentPosition = $('.current-position');
        currentPosition.append(pacManHtml);
        newGame.direction = '180';
        $('.pac-man').css({'transform' : 'rotate(180deg)'});
        }
        else if(newGame.map[pacManPosition[0] - 1][pacManPosition[1]] === 'path') {
          $('.pac-man').remove(); //remove pacman from current div
          newGame.map[pacManPosition[0]][pacManPosition[1]] = 'path'; //assign former position to interior-block
          pacManPosition[0]-= 1; //decrement current position
          newGame.map[pacManPosition[0]][pacManPosition[1]] = 'pac-man';
          newGame.renderBoard();
          pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
          currentPosition = $('.current-position');
          currentPosition.append(pacManHtml);
          newGame.direction = '180';
          $('.pac-man').css({'transform' : 'rotate(180deg)'});
        }
        break;

        case 'down':
        if (  newGame.map[pacManPosition[0] + 1][pacManPosition[1]] === 'wall') {
          return;
        } else if(newGame.map[pacManPosition[0] + 1][pacManPosition[1]] === 'dot'){
        ion.sound.play('water-drop');
        newGame.dotCount -= 1;
        newGame.score += 10;
        newGame.updateScore();
        $('.pac-man').remove(); //remove pacman from current div
        newGame.map[pacManPosition[0]][pacManPosition[1]] = 'path'; //assign former position to interior-block
        pacManPosition[0] += 1; //decrement current position
        newGame.map[pacManPosition[0]][pacManPosition[1]] = 'pac-man';
        newGame.renderBoard();
        pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
        currentPosition = $('.current-position');
        currentPosition.append(pacManHtml);
        newGame.direction = '0';
        }
        else if(newGame.map[pacManPosition[0] + 1][pacManPosition[1]] === 'path') {
          $('.pac-man').remove(); //remove pacman from current div
          newGame.map[pacManPosition[0]][pacManPosition[1]] = 'path'; //assign former position to interior-block
          pacManPosition[0] += 1; //decrement current position
          newGame.map[pacManPosition[0]][pacManPosition[1]] = 'pac-man';
          newGame.renderBoard();
          pacManHtml = '<img src="img/beagle-tower.png" class="pac-man">';
          currentPosition = $('.current-position');
          currentPosition.append(pacManHtml);
          newGame.direction = '0';
        break;
      }
      }
      newGame.checkWin();
  }
};

$(document).ready(function () {
  var pacMan = new PacMan(); //create new pac-man
  var ghost = new Ghost(); //create new ghost
  loadSounds();
  $('.game-over-screen').hide();

  $('#start-level').click(function () {
    $('.start-game-cover').hide();
    ion.sound.play("pac-man-hip-hop-intro");
    newGame.renderBoard(); // renderBoard to show new characters

    var intervalId = setInterval(move, 60);
    var previous = ghost.previousGhostPosition1;

    function move () {
      if(newGame.findGhost('pac-man') === undefined) {
        clearInterval(intervalId);
      }
      previous = ghost.ghostMove(previous);
    }

  });

  $(document).keydown(movePacMan);
});

function movePacMan(ev) {
  var acceptableKeys = [ 37, 65, 38, 87, 39, 68, 40, 83 ];

  if (!acceptableKeys.includes(ev.keyCode)) {
    return;
  }

  // prevent arrow key scrolling
  ev.preventDefault();

  // 4. move board in object based on keypresses (up, down, left, right)
  // move if correct keys were pressed
  switch (ev.keyCode) {
    case 37:  // left arrow
    case 65:  // a
      newGame.move('left');
      break;
    case 38:  // up arrow
    case 87:  // w
      newGame.move('up');
      break;
    case 39:  // right arrow
    case 68:  // d
      newGame.move('right');
      break;
    case 40:  // down arrow
    case 83:  // s
      newGame.move('down');
      break;
  }
}

function loadSounds() {
    ion.sound({
      sounds: [{name: 'pac-man-hip-hop-intro'}, {name: 'water-drop'} ],
      path: 'lib/ion.sound/ion.sound-3.0.7/sounds/',
      preload: true,
      volume: 1.0,
    });
  }