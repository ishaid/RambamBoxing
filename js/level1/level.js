
var $ken = $('.ken'),
    $balrog = $('.balrog')


var qArray = []
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "sheet.csv",
        dataType: "text",
        success: function (data) {
          qArray = csvToArray(data)
          qLevel1 = qArray.slice(1,11)
          qLevel2 = qArray.slice(11,21)
          qLevel3 = qArray.slice(21,31)
          //console.log("qLevel1: "+qLevel1+" qLevel2: "+qLevel2+" qLevel3: "+qLevel3)
        }
     });
});

// function popQuestion (question, to) {
//   var org = [1,2,3]
//   org = shuffle(org)
//   $("#dialog").dialog({
//     modal: false,
//     autoOpen: false,
//     dialogClass: "no-close",
//     position: { my:"top", at:"top+110", of:".stage" },
//     title: question[0],
//     open: function () { ($('.ui-dialog-titlebar').addClass(to)) },
//     close: function () { ($('.ui-dialog-titlebar').removeClass(to)) },
//     buttons: [
//       {
//         text: question[org[0]],
//         click: function () { if (org[0] == 1) { $( this ).dialog( "close" ) } else { console.log("WRONG!!") } }
//       },
//       {
//         text: question[org[1]],
//         click: function () { if (org[1] == 1) { $( this ).dialog( "close" ) } else { console.log("WRONG!!") } }
//       },
//       {
//         text: question[org[2]],
//         click: function () { if (org[2] == 1) { $( this ).dialog( "close" ) } else { console.log("WRONG!!") } }
//       },
//     ]
//   });
//   $("#dialog").dialog("open")
// }

$("#start-dialog").dialog({
  modal: true,
  dialogClass: "no-close",
  position: { my:"center", at:"center", of:".stage" },
  open: function () { $ken.hide(); $balrog.hide();  },
  close: function () { $ken.show();    $ken.position( {my:"center", at:"left+100 top+376", of:".stage"});
                       $balrog.show(); $balrog.position( {my:"center", at:"left+600 top+376", of:".stage"}); },
  buttons: [ { text:'ok', click: function () {$(this).dialog("close"); timer.start();} }],
})
