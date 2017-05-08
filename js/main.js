
function Timer (element, time, level) {
  var time = time
  var element = document.getElementById(element)
  console.log(time);
  this.start = function () {if (time > 0) {setInterval( function () {
    time--
    if (time % 60 > 10 && Math.floor(time/60) < 10) { element.innerHTML = "0" + Math.floor(time/60) + " : " + (time % 60) } else if (time % 60 < 10 && Math.floor(time/60) < 10) { element.innerHTML = "0" + Math.floor(time/60) + " : 0" + (time % 60) } else { element.innerHTML = Math.floor(time/60) + " : " + (time % 60) }
    if (time % 20 == 0) { popQuestion(1, ((time/20) % 2), (time/20)) }
  }, 1000)}}
  this.getTime = function () {
      return time
  }
}

var questions = []
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "sheet.csv",
        dataType: "text",
        success: function (data) {
          questions = csvToArray(data)
          questions[0] = questions.slice(1,11)
          questions[1] = questions.slice(11,21)
          questions[2] = questions.slice(21,31)
          //console.log("qLevel1: "+qLevel1+" qLevel2: "+qLevel2+" qLevel3: "+qLevel3)
        }
     });
});


function popQuestion (level, player, question) {
  var team;
  if (player == 1) { team = 'red' } else { team = 'blue' }
  var org = [1,2,3]
  org = shuffle(org)
  $("#dialog").dialog({
    modal: false,
    autoOpen: false,
    dialogClass: "no-close",
    position: { my:"top", at:"top+110", of:".stage" },
    title: questions[level-1][question-1][0],
    open: function () { ($('.ui-dialog-titlebar').addClass(team)) },
    close: function () { ($('.ui-dialog-titlebar').removeClass(team)) },
    buttons: [
      {
        text: questions[level-1][question-1][org[0]],
        click: function () { if (org[0] == 1) { $( this ).dialog( "close" ) } else { console.log("WRONG!!") } }
      },
      {
        text: questions[level-1][question-1][org[1]],
        click: function () { if (org[1] == 1) { $( this ).dialog( "close" ) } else { console.log("WRONG!!") } }
      },
      {
        text: questions[level-1][question-1][org[2]],
        click: function () { if (org[2] == 1) { $( this ).dialog( "close" ) } else { console.log("WRONG!!") } }
      },
    ]
  });
  $("#dialog").dialog("open")
}

function csvToArray (csv) {
    rows  = csv.split("\n");
    return rows.map(function (row) {
    	return row.split(",");
    });
};

function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array
}

// moves
addAttack = function (c1, c2, move, length) {
  char1 = $(c1); char2 = $(c2);
  char1.addClass(move)
  if (isColision(char1, char2)) {
    c2 = c2.replace('.', '#') + '-health'; char2 = $(c2);
    char2.find('.bar').width(function(i, w) { return w - 20 })
    console.log(char2.find('.bar').width());

    console.log("bang!")
  }
  setTimeout(function() { char1.removeClass(move) }, length)
}

addJump = function (c, move, length) {
    char = $(c);
    char.addClass(move);
    setTimeout(function() { char.addClass(move) }, length);
    setTimeout(function() { char.removeClass(move + ' down'); }, (length*2));
};

doWalk = function (c, move, length, dir) {
  char = $(c);
  char.addClass(move).css({ marginLeft: dir + '=10px' });
  setTimeout(function() { char.removeClass(move) }, length)
}

var isColision = function (c1, c2) { // char1 is hitting
  char1 = $(c1); char2 = $(c2);
  offset1 = char1.offset(); offset2 = char2.offset();
  distance = offset1.left - offset2.left; distance = Math.abs(distance)

    return (distance <= 75 && offset1.left < offset2.left  && char1.hasClass('flip') != true ||
     distance <= 75 && offset1.left > offset2.left && char1.hasClass('flip') == true) ? true : false;
};
