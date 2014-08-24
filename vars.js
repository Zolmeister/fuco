var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var SCALE = HEIGHT
var PI = Math.PI
var TAO = PI * 2
var WIDTH2 = ~~(WIDTH / 2)
var HEIGHT2 = ~~(HEIGHT / 2)
var RADIUS = ~~(SCALE / 5.6)
var $white = new Color(249, 249, 249)
var $bgColor = new Color(158, 158, 158)

var canv = document.getElementById('canv')
canv.width = WIDTH
canv.height = HEIGHT
var ctx = canv.getContext('2d')

var isDrawing, lastPoint
var isColor = true
var completion = 0
var completionBaseline = 0

var palletSize = SCALE / 20
var palletBoxSize = palletSize + SCALE / 60
var palletMargin = SCALE / 60
var selectedPallet = null
var pallet = []
