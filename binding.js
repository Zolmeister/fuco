canv.addEventListener('mousedown', function (e) {
  drawStart({x: e.clientX * RATIO, y: e.clientY * RATIO})
  e.stopPropagation()
  e.preventDefault()
})

canv.addEventListener('touchstart', function (e) {
  drawStart({x: e.touches[0].clientX * RATIO, y: e.touches[0].clientY * RATIO})
  e.stopPropagation()
  e.preventDefault()
})

canv.addEventListener('mousemove', function (e) {
  draw({x: e.clientX * RATIO, y: e.clientY * RATIO})
  e.stopPropagation()
  e.preventDefault()
})

canv.addEventListener('touchmove', function (e) {
  draw({x: e.touches[0].clientX * RATIO, y: e.touches[0].clientY * RATIO})
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
