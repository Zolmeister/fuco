canv.addEventListener('mousedown', function (e) {
  drawStart({x: e.clientX, y: e.clientY})
  e.stopPropagation()
  e.preventDefault()
})

canv.addEventListener('touchstart', function (e) {
  drawStart({x: e.touches[0].clientX, y: e.touches[0].clientY})
  e.stopPropagation()
  e.preventDefault()
})

canv.addEventListener('mousemove', function (e) {
  draw({x: e.clientX, y: e.clientY})
  e.stopPropagation()
  e.preventDefault()
})

canv.addEventListener('touchmove', function (e) {
  draw({x: e.touches[0].clientX, y: e.touches[0].clientY})
  e.stopPropagation()
  e.preventDefault()
})

canv.addEventListener('mouseup', function (e) {
  e.stopPropagation()
  e.preventDefault()
  drawEnd()
})

canv.addEventListener('touchend', function (e) {
  e.stopPropagation()
  e.preventDefault()
  drawEnd()
})
