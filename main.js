'use strict'

function newGame() {
  var i = intervals.length
  clearIntervals()
  levelIndex = 0
  completion = 0
  isDrawing = false
  lastPoint = null
  selectedPallet = null
  time = 2 //60
  isPlaying = true

  setPallet()
  repaint()

  // completion of 80%+ should trigger next level
  intervals.push(setInterval(function () {
    completion = getCompletion() / completionBaseline
    paintCompletion()
    if (completion >= 0.80) {
      if (levelIndex + 1 < levels.length)
        levelIndex++
      repaint()
      //alert('win!')
    }
  }, 500))

  intervals.push(setInterval(function () {
    time--
    paintTime()

    if (time <= 0) {
      isPlaying = false
      clearIntervals()
      saveScore()
    }
  }, 1000))

}

function saveScore() {
  var curScore = localStorage.highScore || 0
  var score = levelIndex * 100 + completion * 100 | 0
  if (parseInt(curScore) < score) {
    localStorage.highScore = score
    return true
  }
  return false
}

function clearIntervals() {
  var i = intervals.length
  while(i--) {
    window.clearInterval(intervals[i])
  }
  intervals = []
}

function paintBg() {
  ctx.fillStyle = $bgColor
  ctx.fillRect(-WIDTH2, -HEIGHT2, WIDTH, HEIGHT)
}

function paintTime() {
  var fontSize = SCALE / 30
  var padding = SCALE / 60
  var seconds = time + 's'
  var x = WIDTH2 - padding - fontSize * 2
  var y = -HEIGHT2 + fontSize + padding


  ctx.fillStyle = $bgColor
  ctx.fillRect(x, y - fontSize, fontSize * 3, fontSize + 2)

  ctx.textAlign = 'left'
  ctx.fillStyle = '#222'
  ctx.font = 'bold ' + fontSize + 'px "Open Sans", sans'

  ctx.fillText(seconds, x, y)
}

function isOnTimeText(point) {
  var fontSize = SCALE / 30
  var padding = SCALE / 60
  var x = WIDTH2 - padding - fontSize * 3
  var y = -HEIGHT2 + fontSize + padding + fontSize

  return point.x > x && point.y < y
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
  paintTime()
  isDrawing = false
}

function paintCompletion() {
  var fontSize = SCALE / 30
  var padding = SCALE / 60
  var x = -WIDTH2 + padding
  var y = -HEIGHT2 + fontSize + padding
  var percent = ~~(Math.max(0, completion - 0.02) * 100) + '%'

  ctx.fillStyle = $bgColor
  ctx.fillRect(x, y - fontSize, fontSize * 2, fontSize + 2)

  ctx.textAlign = 'left'
  ctx.fillStyle = '#222'
  ctx.font = 'bold ' + fontSize + 'px "Open Sans", sans'

  ctx.fillText(percent, x, y)
}

function isOnCompletionText(point) {
  var fontSize = SCALE / 30
  var padding = SCALE / 60
  var x = -WIDTH2 + padding + fontSize * 3
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
  ctx.arc(0, -RADIUS * 1.5, RADIUS, 0, 2 * PI, false)
  ctx.fillStyle = $white
  ctx.fill()

  ctx.beginPath()
  ctx.arc(0, RADIUS * 1.5, RADIUS, 0, 2 * PI, false)
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
    ctx.font = SCALE / 25 + 'px "Open Sans", sans'
    ctx.textAlign = 'center'
    ctx.fillText('Color Me!', 0, RADIUS * 1.5 + SCALE / 25 / 3)
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
    roundRect(ctx, pallet[i].x, 0, size, size, SCALE/150, true, false)
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

  var brushSize = SCALE / 24|0

  for (var i = 0; i < dist; i+=5) {

    var x = (lastPoint.x + (Math.sin(angle) * i) - WIDTH2)|0
    var y = (lastPoint.y + (Math.cos(angle) * i) - HEIGHT2)|0

    // Don't color the area with the pallet
    if (y < SCALE / 20 + 5 && y > -SCALE / 20 - 5) continue

    // Don't color the area with the percent
    if (isOnCompletionText({x: x, y: y})) continue
    if (isOnTimeText({x: x, y: y})) continue

    var radgrad = ctx.createRadialGradient(x,y,brushSize/4|0,x,y,brushSize/2|0)

    radgrad.addColorStop(0, selectedPallet.color)
    radgrad.addColorStop(0.5, selectedPallet.color.alpha(0.5))
    radgrad.addColorStop(1, selectedPallet.color.alpha(0))

    ctx.fillStyle = radgrad
    ctx.fillRect(x-brushSize/2|0, y-brushSize/2|0, brushSize, brushSize)

    if (y < 0) {
      y += RADIUS * 1.5 * 2|0
    } else {
      y -= RADIUS * 1.5 * 2|0
    }

    // Don't color the area with the percent
    if (isOnCompletionText({x: x, y: y})) continue
    if (isOnTimeText({x: x, y: y})) continue

    radgrad = ctx.createRadialGradient(x,y,brushSize/4|0,x,y,brushSize/2|0)
    radgrad.addColorStop(0, selectedPallet.color)
    radgrad.addColorStop(0.5, selectedPallet.color.alpha(0.5))
    radgrad.addColorStop(1, selectedPallet.color.alpha(0))
    ctx.fillStyle = radgrad
    ctx.fillRect(x-brushSize/2|0, y-brushSize/2|0, brushSize, brushSize)

    if (y < 0) {
      // erase inside selected brush clip region
      ctx.save()
      ctx.beginPath()
      region.path(ctx)
      ctx.clip()

      radgrad = ctx.createRadialGradient(x,y,brushSize/4|0,x,y,brushSize/2|0)
      radgrad.addColorStop(0, $white)
      radgrad.addColorStop(0.9, $white.alpha(1))
      radgrad.addColorStop(1, $white.alpha(0))
      ctx.fillStyle = radgrad
      ctx.fillRect(x-brushSize/2|0, y-brushSize/2|0, brushSize, brushSize)
      ctx.fillRect(x-brushSize/2|0, y-brushSize/2|0, brushSize, brushSize)

      ctx.restore()
    }

  }
  lastPoint = currentPoint

}
