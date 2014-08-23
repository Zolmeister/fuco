var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var canv = document.getElementById('canv')
canv.width = WIDTH
canv.height = HEIGHT
var ctx = canv.getContext('2d')
ctx.fillStyle = '#222'
ctx.fillRect(0, 0, WIDTH, HEIGHT)

var radius = 200

ctx.beginPath()
ctx.arc(500, 300, radius, 0, 2 * Math.PI, false)
ctx.fillStyle = '#fff'
ctx.fill()

ctx.beginPath()
ctx.moveTo(500, 100)
ctx.lineTo(500, 500)
ctx.strokeStyle = '#000'
ctx.stroke()

ctx.beginPath()
ctx.arc(500, 900, radius, 0, 2 * Math.PI, false)
ctx.fillStyle = '#fff'
ctx.fill()

ctx.beginPath()
ctx.moveTo(500, 700)
ctx.lineTo(500, 1100)
ctx.strokeStyle = '#000'
ctx.stroke()

ctx.beginPath()
ctx.moveTo(100, 600)
ctx.lineTo(900, 600)
ctx.strokeStyle = '#fff'
ctx.stroke()

function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
}
function angleBetween(point1, point2) {
  return Math.atan2( point2.x - point1.x, point2.y - point1.y )
}

function reflect(y) {
  if (y > 600) {
    return 600 - (y - 600)
  }
  return 600 + (600 - y)
}

ctx.lineJoin = ctx.lineCap = 'round'

var isDrawing, lastPoint
var isColor = true
canv.onmousedown = function(e) {
  isDrawing = true
  lastPoint = { x: e.clientX, y: e.clientY }
}

canv.onmousemove = function(e) {
  if (!isDrawing) return

  var currentPoint = { x: e.clientX, y: e.clientY }
  var dist = distanceBetween(lastPoint, currentPoint)
  var angle = angleBetween(lastPoint, currentPoint)

  for (var i = 0; i < dist; i+=5) {

    x = lastPoint.x + (Math.sin(angle) * i)
    y = lastPoint.y + (Math.cos(angle) * i)

    var radgrad = ctx.createRadialGradient(x,y,10,x,y,20)

    radgrad.addColorStop(0, '#000')
    radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5)')
    radgrad.addColorStop(1, 'rgba(0,0,0,0)')

    ctx.fillStyle = radgrad
    ctx.fillRect(x-20, y-20, 40, 40)

    y = reflect(y)

    radgrad = ctx.createRadialGradient(x,y,10,x,y,20)
if (isColor){
    radgrad.addColorStop(0, '#000')
    radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5)')
    radgrad.addColorStop(1, 'rgba(0,0,0,0)')
}
  else{radgrad.addColorStop(0, '#fff')
  radgrad.addColorStop(0.5, 'rgba(255,255,255,0.5)')
  radgrad.addColorStop(1, 'rgba(255,255,255,0)')}
    ctx.fillStyle = radgrad

    ctx.fillRect(x-20, y-20, 40, 40)
  }

  lastPoint = currentPoint

  ctx.beginPath()
  ctx.moveTo(500, 700)
  ctx.lineTo(500, 1100)
  ctx.strokeStyle = '#000'
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(500, 100)
  ctx.lineTo(500, 500)
  ctx.strokeStyle = '#000'
  ctx.stroke()

}

canv.onmouseup = function() {
  isDrawing = false
}
