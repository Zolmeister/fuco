var endGameTexts = shuffle([
  'Good one! Now see if you can beat it!',
  'You Rock! Let\'s do it again!',
  'Great job! But can you beat it?',
  'You\'re unstoppable! Keep it up!',
  'Amazing! I bet you can\'t beat it though...'
])
var endGameIndex = 0

var RATIO = window.devicePixelRatio || 1
var WIDTH = window.innerWidth * RATIO
var HEIGHT = window.innerHeight * RATIO
var SCALE = HEIGHT
var PI = Math.PI
var TAO = PI * 2
var WIDTH2 = ~~(WIDTH / 2)
var HEIGHT2 = ~~(HEIGHT / 2)
var RADIUS = ~~(SCALE / 5.6)
var $white = new Color(249, 249, 249)
var $bgColor = new Color(158, 158, 158)

var crystals = parseInt(localStorage.crystals || '0', 10)
var crystalImg = new Image()
crystalImg.src = 'images/crystal.svg'
var crystal = {
  x: WIDTH2 - SCALE / 20 - SCALE / 40,
  y: -HEIGHT2 + SCALE / 20 + SCALE / 40,
  size: SCALE / 20
}


var canv = document.getElementById('canv')
canv.width = WIDTH
canv.height = HEIGHT
var ctx = canv.getContext('2d')
ctx.lineJoin = ctx.lineCap = 'round'
ctx.translate(WIDTH2, HEIGHT2)


var completionBaseline = 0

var palletSize = SCALE / 20
var palletBoxSize = palletSize + SCALE / 60
var palletMargin = SCALE / 60
var pallet = []

var intervals = []
var completion = 0
var isDrawing = false
var lastPoint = null
var selectedPallet = null
var time = 60
var levelIndex = 0
var isPlaying = false
var hasUsedCrystal = false
