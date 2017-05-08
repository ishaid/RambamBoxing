
// *ken* click events
$('#g').click(function () { addAttack($ken, $balrog, 'ken-punch', 150) })
$('#h').click(function () { addAttack($ken, $balrog, 'ken-kick', 500) })
$('#w').click(function () { addJump($ken, 'ken-jump', 500) })
$('#a').on('mousedown mouseup', function(e) {
   if (e.type == 'mousedown') {
     doWalk($ken, 'ken-walk', 500, '-')
   }
});
$('#d').on('mousedown mouseup', function(e) {
   if (e.type == 'mousedown') {
     doWalk($ken, 'ken-walk', 500, '+')
   }
});

// *balrog* click events
$('#p').click(function () { addAttack($balrog,  $ken, 'balrog-punch', 150) })
$('#o').click(function () { addAttack($balrog,  $ken, 'balrog-kick', 500) })
$('#up').click(function () { addJump($balrog, 'balrog-jump', 500) })
$('#left').on('mousedown mouseup', function(e) {
   if (e.type == 'mousedown') {
     doWalk($balrog, 'balrog-walk', 500, '-')
   }
});
$('#right').on('mousedown mouseup', function(e) {
   if (e.type == 'mousedown') {
     doWalk($balrog, 'balrog-walk', 500, '+')
   }
});


// on keydown events
$(document).on('keydown keyup', function(e) {
    if (e.type == 'keyup') {

        // g = ken-punch
        if (e.keyCode == 71
            && !$ken.hasClass('ken-punch')
        ) {
            addAttack('.ken', '.balrog', 'ken-punch', 150)
        }

        // p = balrog-punch
        if (e.keyCode == 80
            && !$balrog.hasClass('balrog-punch')
        ) {
            addAttack('.balrog', '.ken', 'balrog-punch', 150)
        }


        // h = ken-kick
        if (e.keyCode == 72
            && !$ken.hasClass('ken-kick')
        ) {
            addAttack('.ken', '.balrog', 'ken-kick', 500)
        }

        // h = balrog-kick
        if (e.keyCode == 79
            && !$balrog.hasClass('balrog-kick')
        ) {
            addAttack('.balrog', '.ken', 'balrog-kick', 500)
        }

        // w = ken-jump
        if (e.keyCode == 87
            && !$ken.hasClass('ken-jump')
            && !$ken.hasClass('ken-kick')
        ) {
            addJump('.ken', 'ken-jump', 500)
        }

        // up = balrog-jump
        if (e.keyCode == 38
            && !$balrog.hasClass('balrog-jump')
            && !$balrog.hasClass('balrog-kick')
        ) {
            addJump('.balrog', 'balrog-jump', 500)
        }

    }
});

$(document).on('keydown keyup', function(e) {
    if (e.type == 'keydown') {

      // ← flip
      if (e.keyCode == 65) $ken.addClass('flip');
      // → unflip
      if (e.keyCode == 68) $ken.removeClass('flip');

      // ←← →→ walking
      if (e.keyCode == 65) { doWalk($ken, 'ken-walk', 500, '-') }
      if (e.keyCode == 68) { doWalk($ken, 'ken-walk', 500, '+') }

      // ← flip
      if (e.keyCode == 37) $balrog.addClass('flip');
      // → unflip
      if (e.keyCode == 39) $balrog.removeClass('flip');

      // ←← →→ walking
      if (e.keyCode == 37) { doWalk($balrog, 'balrog-walk', 500, '-') }
      if (e.keyCode == 39) { doWalk($balrog, 'balrog-walk', 500, '+') }
    }
});
