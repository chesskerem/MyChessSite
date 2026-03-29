var board = null
var game = new Chess()
var $status = $('#status')

function onDragStart (source, piece, position, orientation) {
  if (game.game_over()) return false
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop (source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' 
  })

  if (move === null) return 'snapback'
  updateStatus()
}

function updateStatus () {
  var status = ''
  var moveColor = 'Beyaz'
  if (game.turn() === 'b') moveColor = 'Siyah'

  if (game.in_checkmate()) {
    status = 'Oyun bitti, ' + moveColor + ' mat oldu.'
  } else if (game.in_draw()) {
    status = 'Oyun bitti, berabere.'
  } else {
    status = 'Sıra: ' + moveColor
    if (game.in_check()) status += ' (Şah!)'
  }
  $status.html(status)
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop
}
board = ChessBoard('myBoard', config)
updateStatus()
