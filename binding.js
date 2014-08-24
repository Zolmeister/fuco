canv.addEventListener('mousedown', function (e) {
  if (!isPlaying) return
  drawStart({x: e.clientX * RATIO, y: e.clientY * RATIO})
  e.stopPropagation()
  e.preventDefault()
})

canv.addEventListener('touchstart', function (e) {
  if (!isPlaying) return
  drawStart({x: e.touches[0].clientX * RATIO, y: e.touches[0].clientY * RATIO})
  e.stopPropagation()
  e.preventDefault()
})

canv.addEventListener('mousemove', function (e) {
  if (!isPlaying) return
  draw({x: e.clientX * RATIO, y: e.clientY * RATIO})
  e.stopPropagation()
  e.preventDefault()
})

canv.addEventListener('touchmove', function (e) {
  if (!isPlaying) return
  draw({x: e.touches[0].clientX * RATIO, y: e.touches[0].clientY * RATIO})
  e.stopPropagation()
  e.preventDefault()
})

canv.addEventListener('mouseup', function (e) {
  if (!isPlaying) return
  e.stopPropagation()
  e.preventDefault()
  drawEnd()
})

canv.addEventListener('touchend', function (e) {
  if (!isPlaying) return
  e.stopPropagation()
  e.preventDefault()
  drawEnd()
})

window.addEventListener('keydown', function (e) {
  if (e.which >= 49 && e.which < 59) {
    var index = e.which - 49
    if (pallet[index]) {
      selectedPallet = pallet[index]
      paintPallet()
    }
  }
})
