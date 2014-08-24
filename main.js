var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var SCALE = HEIGHT
WIDTH2 = ~~(WIDTH / 2)
HEIGHT2 = ~~(HEIGHT / 2)
var RADIUS = SCALE / 5.6
var $white = new Color(249, 249, 249)
var $bgColor = new Color(158, 158, 158)

var canv = document.getElementById('canv')
canv.width = WIDTH
canv.height = HEIGHT

var isDrawing, lastPoint
var isColor = true

var ctx = canv.getContext('2d')
ctx.lineJoin = ctx.lineCap = 'round'
ctx.translate(WIDTH2, HEIGHT2)

function paintBg() {
  ctx.fillStyle = $bgColor
  ctx.fillRect(-WIDTH2, -HEIGHT2, WIDTH, HEIGHT)
}
paintBg()

var levelIndex = 0
var levels = [
  [
    {
      color: new Color(0, 255, 0),
      path: function (ctx) {
        ctx.arc(0, -RADIUS * 1.5, RADIUS, 0, 2 * Math.PI, false)
      }
    }
  ]
]

var brush = levels[0][0].color
var completion = 0

paintLevel()
var completionBaseline = getCompletion(true)


function repaint() {
  paintBg()
  paintLevel()
  paintPallet()
  paintCompletion()
  isDrawing = false
}

repaint()

// completion of 85%+ should trigger next level

setInterval(function () {
  completion = getCompletion() / completionBaseline
  paintCompletion()
  if (completion >= 0.85) {
    repaint()
    alert('win!')
  }
}, 500)


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


function paintPallet() {
  var level = levels[levelIndex]
  var pallet = []

  // _.pick level, 'color'
  var i = level.length
  while (i--) {
    var poly = level[i]
    pallet.push(poly.color)
  }
  i = pallet.length

  // _.uniq pallet
  var used = {}
  while (i--) {
    var color = pallet[i]
    if (used[color]) {
      pallet.splice(i, 1)
    }
    used[color] = true
  }

  i = pallet.length
  while(i--) {
    var size = SCALE / 20

    if (pallet[i].equals(brush)) {
      ctx.fillStyle = $white
      size += SCALE / 60
      ctx.fillRect(-size/2, -size/2, size, size)
      size -= SCALE / 60
    }

    ctx.fillStyle = pallet[i]
    ctx.lineWidth = 10
    roundRect(ctx, 0, 0, size, size, 5, true, false)
  }
}

function drawStart(point) {
  isDrawing = true
  lastPoint = point
}

function drawEnd() {
  isDrawing = false
}

function getRegion() {
  var level = levels[levelIndex]
  var i = level.length
  while(i--) {
    var poly = level[i]
    if (poly.color.equals(brush)) {
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

    x = lastPoint.x + (Math.sin(angle) * i) - WIDTH2
    y = lastPoint.y + (Math.cos(angle) * i) - HEIGHT2

    // Don't color the area with the pallet
    if (y < SCALE / 20 + 5 && y > -SCALE / 20 - 5) continue

    // Don't color the area with the percent
    if (isOnCompletionText({x: x, y: y})) continue

    var radgrad = ctx.createRadialGradient(x,y,brushSize/4,x,y,brushSize/2)

    radgrad.addColorStop(0, brush)
    radgrad.addColorStop(0.5, brush.alpha(0.5))
    radgrad.addColorStop(1, brush.alpha(0))

    ctx.fillStyle = radgrad
    ctx.fillRect(x-brushSize/2, y-brushSize/2, brushSize, brushSize)

    y = -y

    // Don't color the area with the percent
    if (isOnCompletionText({x: x, y: y})) continue

    radgrad = ctx.createRadialGradient(x,y,brushSize/4,x,y,brushSize/2)
    radgrad.addColorStop(0, brush)
    radgrad.addColorStop(0.5, brush.alpha(0.5))
    radgrad.addColorStop(1, brush.alpha(0))
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
