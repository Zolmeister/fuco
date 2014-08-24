'use strict'

var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var SCALE = HEIGHT
var PI = Math.PI
var WIDTH2 = ~~(WIDTH / 2)
var HEIGHT2 = ~~(HEIGHT / 2)
var RADIUS = ~~(SCALE / 5.6)
var $white = new Color(249, 249, 249)
var $bgColor = new Color(158, 158, 158)

var canv = document.getElementById('canv')
canv.width = WIDTH
canv.height = HEIGHT
var ctx = canv.getContext('2d')
var levels = [
  [ // 1
    {
      color: new Color(0, 255, 0),
      path: function (ctx) {
        ctx.arc(0, -RADIUS * 1.5, RADIUS, 0, 2 * Math.PI, false)
      }
    }
  ],
  [ // 2
    {
      color: new Color(0, 255, 0),
      path: function (ctx) {
        ctx.arc(0, -RADIUS * 1.5, RADIUS, PI / 2, PI + PI / 2, false)
      }
    },
    {
      color: new Color(0, 0, 255),
      path: function (ctx) {
        ctx.arc(0, -RADIUS * 1.5, RADIUS, PI + PI / 2, 2 * PI + PI / 2, false)
      }
    }
  ]
]

var isDrawing, lastPoint
var isColor = true
var levelIndex = 0
var completion = 0
var completionBaseline = 0

var palletSize = SCALE / 20
var palletBoxSize = palletSize + SCALE / 60
var palletMargin = SCALE / 60
var selectedPallet = null
var pallet = []

ctx.lineJoin = ctx.lineCap = 'round'
ctx.translate(WIDTH2, HEIGHT2)

setPallet()
repaint()

// completion of 85%+ should trigger next level
setInterval(function () {
  completion = getCompletion() / completionBaseline
  paintCompletion()
  if (completion >= 0.85) {
    levelIndex++
    repaint()
    alert('win!')
  }
}, 500)

function paintBg() {
  ctx.fillStyle = $bgColor
  ctx.fillRect(-WIDTH2, -HEIGHT2, WIDTH, HEIGHT)
}

// this clears user edits!
function repaint() {
  paintBg()
  paintLevel()
  selectedPallet = null
  setPallet()
  paintPallet()
  completionBaseline = getCompletion(true)
  paintCompletion()
  isDrawing = false
}

function paintCompletion() {
  var fontSize = SCALE / 30
  var padding = SCALE / 60
  var x = -WIDTH2 + padding
  var y = -HEIGHT2 + fontSize + padding
  var percent = ~~(Math.max(0, completion - 0.02) * 100) + '%'

  ctx.fillStyle = $bgColor
  ctx.fillRect(x, y - fontSize, fontSize * percent.length, fontSize)

  ctx.textAlign = 'left'
  ctx.fillStyle = '#222'
  ctx.font = 'bold ' + fontSize + 'px "Open Sans"'

  ctx.fillText(percent, x, y)
}

function isOnCompletionText(point) {
  var fontSize = SCALE / 30
  var padding = SCALE / 60
  var x = -WIDTH2 + padding + fontSize * 4
  var y = -HEIGHT2 + fontSize + padding + fontSize

  return point.x < x && point.y < y
}

function getCompletion(invert) {
  var imgData = ctx.getImageData(WIDTH2 - RADIUS, 0, RADIUS * 2, HEIGHT2)
  var pixels = imgData.data
  var white = 0

  var l = pixels.length
  var i = l
  while (i >= 4) {
    var r = pixels[i-3]
    var g = pixels[i-2]
    var b = pixels[i-1]


    // Get all whites
    if (!invert) {
      if (r > 240 && g > 240 && b > 240) {
        white += 1
      }
    } else {
      // all non-whites
      if (r < 240 || g < 240 || b < 240) {
        // all non-grays
        if (r !== 158 && g !== 158 && b !== 158) {
          white += 1
        }
      }
    }


    i -= ~~(l / 1000)
  }
  return white
}


function paintLevel() {
  var level = levels[levelIndex]

  ctx.beginPath()
  ctx.arc(0, -RADIUS * 1.5, RADIUS, 0, 2 * Math.PI, false)
  ctx.fillStyle = $white
  ctx.fill()

  ctx.beginPath()
  ctx.arc(0, RADIUS * 1.5, RADIUS, 0, 2 * Math.PI, false)
  ctx.fillStyle = $white
  ctx.fill()

  var i = level.length
  while (i--) {
    var poly = level[i]
    ctx.fillStyle = poly.color
    ctx.beginPath()
    var x = 0
    var y = -RADIUS * 1.5
    ctx.moveTo(x, y)
    poly.path(ctx, x, y)
    ctx.fill()
  }

  if (levelIndex === 0) {
    ctx.fillStyle = '#000'
    ctx.font = SCALE / 16 + 'px "Open Sans"'
    ctx.textAlign = 'center'
    ctx.fillText('Color Me!', 0, RADIUS * 1.5)
  }
}



function setPallet() {
  var colors = []
  var level = levels[levelIndex]

  // _.pick level, 'color'
  var i = level.length
  while (i--) {
    var poly = level[i]
    colors.push(poly.color)
  }
  i = colors.length

  // _.uniq colors
  var used = {}
  while (i--) {
    var color = colors[i]
    if (used[color]) {
      colors.splice(i, 1)
    }
    used[color] = true
  }

  i = colors.length

  // clear pallet
  pallet = []
  var y = 0
  var halfColors = ~~(colors.length / 2)
  var x = -palletBoxSize * halfColors - palletMargin * halfColors
  if (colors.length % 2 === 0) {
    x += palletBoxSize / 2 + palletMargin / 2
  }

  while(i--) {
    var color = colors[i]
    var pal = {
      color: color,
      x: x,
      y: y
    }

    pallet.push(pal)

    x += palletBoxSize + palletMargin
  }

  if (!selectedPallet) {
    selectedPallet = pallet[0]
  }

}

function paintPallet() {
  var i = pallet.length
  var boxSize = palletBoxSize
  var size = palletSize

  ctx.fillStyle = $bgColor
  ctx.fillRect(-WIDTH2, -boxSize / 2 - 1, WIDTH, boxSize + 2)
  while(i--) {
    if (pallet[i] === selectedPallet) {
      ctx.fillStyle = $white
      ctx.fillRect(pallet[i].x-boxSize/2, -boxSize/2, boxSize, boxSize)
    }

    ctx.fillStyle = pallet[i].color
    ctx.lineWidth = 10
    roundRect(ctx, pallet[i].x, 0, size, size, 5, true, false)
  }
}

function selectPallet(point) {
  var i = pallet.length
  while(i--) {
    var boxPoint = {x: pallet[i].x + WIDTH2, y: pallet[i].y + HEIGHT2}
    if (distanceBetween(boxPoint, point) < palletBoxSize / 2 ) {
      selectedPallet = pallet[i]
      paintPallet()
      break
    }
  }
}

function drawStart(point) {
  isDrawing = true
  lastPoint = point

  selectPallet(point)
}

function drawEnd() {
  isDrawing = false
}

function getRegion() {
  var level = levels[levelIndex]
  var i = level.length
  while(i--) {
    var poly = level[i]
    if (poly.color.equals(selectedPallet.color)) {
      return poly
    }
  }

  throw new Error('Poly not found')
}

function draw(point) {
  if (!isDrawing) return

  var currentPoint = point
  var dist = distanceBetween(lastPoint, currentPoint)
  var angle = angleBetween(lastPoint, currentPoint)
  var region = getRegion()

  var brushSize = SCALE / 24

  for (var i = 0; i < dist; i+=5) {

    var x = lastPoint.x + (Math.sin(angle) * i) - WIDTH2
    var y = lastPoint.y + (Math.cos(angle) * i) - HEIGHT2

    // Don't color the area with the pallet
    if (y < SCALE / 20 + 5 && y > -SCALE / 20 - 5) continue

    // Don't color the area with the percent
    if (isOnCompletionText({x: x, y: y})) continue

    var radgrad = ctx.createRadialGradient(x,y,brushSize/4,x,y,brushSize/2)

    radgrad.addColorStop(0, selectedPallet.color)
    radgrad.addColorStop(0.5, selectedPallet.color.alpha(0.5))
    radgrad.addColorStop(1, selectedPallet.color.alpha(0))

    ctx.fillStyle = radgrad
    ctx.fillRect(x-brushSize/2, y-brushSize/2, brushSize, brushSize)

    y = -y

    // Don't color the area with the percent
    if (isOnCompletionText({x: x, y: y})) continue

    radgrad = ctx.createRadialGradient(x,y,brushSize/4,x,y,brushSize/2)
    radgrad.addColorStop(0, selectedPallet.color)
    radgrad.addColorStop(0.5, selectedPallet.color.alpha(0.5))
    radgrad.addColorStop(1, selectedPallet.color.alpha(0))
    ctx.fillStyle = radgrad
    ctx.fillRect(x-brushSize/2, y-brushSize/2, brushSize, brushSize)

    if (y < 0) {
      // erase inside selected brush clip region
      ctx.save()
      ctx.beginPath()
      region.path(ctx)
      ctx.clip()

      radgrad = ctx.createRadialGradient(x,y,brushSize/4,x,y,brushSize/2)
      radgrad.addColorStop(0, $white)
      radgrad.addColorStop(0.9, $white.alpha(1))
      radgrad.addColorStop(1, $white.alpha(0))
      ctx.fillStyle = radgrad
      ctx.fillRect(x-brushSize/2, y-brushSize/2, brushSize, brushSize)
      ctx.fillRect(x-brushSize/2, y-brushSize/2, brushSize, brushSize)

      ctx.restore()
    }

  }
  lastPoint = currentPoint

}
