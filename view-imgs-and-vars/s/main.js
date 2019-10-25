function eventPos(e) {
  if (e.type.match(/^touch/)) {
    e = e.originalEvent.changedTouches[0];
  }
  return {
    pageX: e.pageX,
    pageY: e.pageY
  };
}

var Map = function($map) {
  var $servImg = $('#server-images');
  var size = [14, 48, 25, 33]; // integers help define the size of the container element
  var tilesize = 2048;
  var scroll_delta = null;

  $map.css({
    position: 'absolute'
  });

  var position = [-(size[3] + 0.03) * tilesize, -(size[0] - 0.55) * tilesize];
  var centre = [-1, 0];

  var update = function() {
    $('#position')[0].innerHTML = `<b>position</b> = [${position}]`; // CONSOLE HELP
    $map.css({
      left: position[0],
      top: position[1]
    });

    var centre_last = centre;
    /* this doesn't work -- centre_last always looks like it has the same value as centre in the change console
      $('#centre_last')[0].innerHTML = `centre_last = centre = ${centre_last}`; // CONSOLE HELP
    */

    centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];
    $('#centre')[0].innerHTML = `<b>centre</b> = ${centre}`; // CONSOLE HELP

    // show last value and curr value
    tile_name = function(x, y) {
      x -= size[3];
      y -= size[0];

      return (y >= 0 ? (y + 1) + 's' : -y + 'n') + (x >= 0 ? (x + 1) + 'e' : -x + 'w');
    };

    if (centre[0] != centre_last[0] || centre[1] != centre_last[1]) {

      var $remove = $map.children();
      var $removeServerImgs = $servImg.children();
      if (showRemoveInfo) {
        console.group(`value of $remove:`)
        console.dir($remove)
        console.groupEnd(`value of $remove:`);
      } // CONSOLE HELP
 
      for (var y = -1; y <= +1; y++) {
        for (var x = -1; x <= +1; x++) {
          $('#name_prev')[0].innerHTML = `previous value of <b>name</b> = ${name}` // CONSOLE HELP
          var name = tile_name(centre[0] + x, centre[1] + y);
          $('#name')[0].innerHTML = `current value of <b>name</b> = ${name}` // CONSOLE HELP
          var tile = $map.find('.tile' + name);
          var serverTile = $servImg.find('.server-' + name);
          if (tile.length) {
            $remove = $remove.not(tile);
            if (showRemoveInfo) {
              console.group(`value of $remove in if (tile.length):`)
              console.dir($remove)
              console.groupEnd(`value of $remove in if (tile.length):`);
            } // CONSOLE HELP
          }
          else {
            $image = $('<img class="img-tile tile' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" style="top:' + ((centre[1] + y) * tilesize) + 'px;left:' + ((centre[0] + x) * tilesize) + 'px; z-index: -1; position: absolute;;" style="display:none" />');
            // $image = $('<img class="img-tile tile' + name + '" src="./../../imgs.xkcd.com/clickdrag/' + name + '.png" style="top:' + ((centre[1] + y) * tilesize) + 'px;left:' + ((centre[0] + x) * tilesize) + 'px; z-index: -1; position: absolute;;" style="display:none" />');
            
            // create new elem to be added to area showing "loaded" items
            var serverImageElem = '<img alt="img loading error"class="server-img-tile server-' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" />'

            // var serverImageElem = '<img alt="img loading error"class="server-img-tile server-' + name + '" src="./../../imgs.xkcd.com/clickdrag/' + name + '.png" />'
            // load it-ish
            $serverImage = $(serverImageElem);
            $image.load(function() {
              $(this).show()
            }).error(function() {
              $(this).remove();
              console.log("image " + name + " does not exist or did not load")
            });
            $map.append($image);
            // create lil div display of image
            var completeServerImgExample = '<div class="serv-img-container">' + '<span id="coords" style="z-index: 2;">name: ' + name + '<br>top: ' + ((centre[1] + y) * tilesize) + '<br> left: ' + ((centre[0] + x) * tilesize) + '</span>' + serverImageElem + '</div>';

            // append it to the container
            $servImg.append(completeServerImgExample);
          }
        }
        $remove.remove();
        $removeServerImgs.remove();
      }
    }
  }

  update();

  function drag(e) {
    if (scroll_delta) {
      $('#mousemove-ct')[0].innerHTML = Number($('#mousemove-ct')[0].innerHTML)+1
      var pos = eventPos(e);
      position[0] = Math.round(pos.pageX + scroll_delta[0])//, -(size[1] + size[3]) * tilesize, 0);

      position[1] = Math.round(pos.pageY + scroll_delta[1]) // , -(size[0] + size[2]) * tilesize, 0);
      update();
    }
  }

  $(document)
    .on('mousedown touchstart', function(e) {
      var pos = eventPos(e);
      scroll_delta = [position[0] - pos.pageX, position[1] - pos.pageY];
      $('#active-events')[0].innerHTML += '<br> mousedown'
      $('#scroll_delta')[0].innerHTML = ("<b>scroll_delta</b> = " + scroll_delta) // CONSOLE HELP

      $(document).on(e.type == 'mousedown' ? 'mousemove' : 'touchmove', drag);
      $('#active-events')[0].innerHTML += '<br> mousemove <span id="mousemove-ct"> </span>'
      e.preventDefault();
    });
  $(document)
    .on('mouseup touchend', function(e) {
      $(document).off('mousemove touchmove', drag)
      $('#active-events')[0].innerHTML = '';
      scroll_delta = null;
      $('#scroll_delta')[0].innerHTML = ("<b>scroll_delta</b> = " + scroll_delta) // CONSOLE HELP
    });
};

$(function() {
  var map = new Map($('.map'));
});

$('#toggle-console').click(() => {
  let consoleDisplay = $('#change-demos-wrapper')[0].style.display;
  (consoleDisplay == "flex") ? consoleDisplay = "none" : consoleDisplay = "flex";
  $('#change-demos-wrapper')[0].style.display = consoleDisplay;
})
$('#mapbtn').click(() => console.dir($('.map')));

let showRemoveInfo = false;
$('#removebtn').click(() => {
  (showRemoveInfo == true) ? showRemoveInfo = false : showRemoveInfo = true;
  if (showRemoveInfo) {
    console.group(`value of $remove:`)
    console.dir($('.map').children())
    console.groupEnd(`value of $remove:`);
  }
})