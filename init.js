var CWIDTH = Math.min(window.innerWidth, window.innerHeight)
var CHEIGHT = CWIDTH


var $crystals = document.getElementsByClassName('crystal')
var $crystalText = document.getElementsByClassName('crystal-text')[0]
var $crystalText2 = document.getElementsByClassName('crystal-text2')[0]
var $bird = document.getElementsByClassName('bird')

var $tweetBubble = document.getElementsByClassName('tweet-bubble')[0]
var $tweetButton = document.getElementsByClassName('tweet-button')[0]
var $tweetScore = document.getElementsByClassName('tweet-score')[0]

var $homeScreen = document.getElementsByClassName('home-screen')[0]
var $endScreen = document.getElementsByClassName('game-over-screen')[0]
var $endText = document.getElementsByClassName('game-over-text')[0]
var $score = document.getElementsByClassName('score')[0]
var $best = document.getElementsByClassName('best')[0]
var $logo = document.getElementsByClassName('logo')[0]

var $flourish = document.getElementsByClassName('flourish')[0]
var $play = document.getElementsByClassName('play')[0]
var $playAgain = document.getElementsByClassName('play-again')[0]

var $highScore = document.getElementsByClassName('high-score')[0]

var $paths = document.getElementsByTagName('path')

var i = $crystals.length
while (i--) {
  $crystals[i].style.width = CWIDTH / 30 + 'px'
  $crystals[i].style.height = CWIDTH / 30 + 'px'
}

$crystalText2.style.fontSize = $crystalText.style.fontSize = CWIDTH / 30 + 'px'

var i = $bird.length
while(i--) {
  $bird[i].style.width = CWIDTH / 20 + 'px'
  $bird[i].style.height = CWIDTH / 20 + 'px'
}


$tweetBubble.style.width = CWIDTH / 1.5 + 'px'
$tweetBubble.style.marginLeft = -CWIDTH / 3 - CWIDTH / 25 + 'px'
$tweetBubble.style.marginTop = CHEIGHT / 40 + 'px'
$tweetBubble.style.fontSize = CWIDTH / 25 + 'px'
$tweetBubble.style.padding = CWIDTH / 25 + 'px'

$tweetButton.style.marginTop = CHEIGHT / 30 + 'px'

$tweetScore.style.marginTop = CHEIGHT / 30 + 'px'
$tweetScore.style.fontSize = CHEIGHT / 60 + 'px'

$logo.style.marginTop = CHEIGHT / 2 - CHEIGHT / 3 + 'px'
$logo.style.width = CWIDTH / 2 + 'px'
$logo.style.height = CWIDTH / 4 + 'px'


$flourish.style.marginTop = -CHEIGHT / 20 + 'px'
$flourish.style.width = CWIDTH / 3 + 'px'
$flourish.style.height = CWIDTH / 5 + 'px'


$play.style.marginTop = CHEIGHT / 20 + 'px'
$play.style.width = CWIDTH / 4 + 'px'
$play.style.height = CWIDTH / 7 + 'px'
$play.style.fontSize = CWIDTH / 20 + 'px'

$play.addEventListener('click', start)
$play.addEventListener('touchstart', start)

$playAgain.addEventListener('click', start)
$playAgain.addEventListener('touchstart', start)

if (localStorage.highScore) {
  $highScore.innerHTML = 'best: ' + localStorage.highScore
  $highScore.style.fontSize = CWIDTH / 30 + 'px'
}

setTimeout(function () {
  $play.style.opacity = 1
  $bird[0].style.opacity = 1
})

// This is hard coded because it crashes android if you calculate it
var pathLengths = [114.63752746582031, 135.55255126953125, 115.6463851928711, 147.36000061035156, 3442.748291015625, 1806.394775390625, 8450.58984375, 8450.58984375]
window.addEventListener('load', function () {
  var isFirstTime = !localStorage.hasVisited
  if (isFirstTime) {
    crystals = 2
    localStorage.crystals = crystals
  }
  localStorage.hasVisited = true

  var lastTweet = localStorage.lastTweet || '0'

  if (!isFirstTime && notTweetedToday(lastTweet)) {
    $crystalText.style.display = 'inline-block'
    $crystalText2.style.display = 'inline-block'
  }

  var i = $paths.length
  while(i--) {
    // This line will crash android browser clients
    // pathLengths[i] = $paths[i].getTotalLength()
    simulatePathDrawing($paths[i], i)
  }

  document.body.style.visibility = 'visible'
})

//DEBUG
// start()
// hideHome()
// showEnd(10)

function grantCrystals() {
  localStorage.lastTweet = Date.now()
  $crystalText.style.display = 'none'
  $crystalText2.style.display = 'none'
  crystals += 3
  localStorage.crystals = crystals
  $tweetBubble.style.display = 'block'
  $tweetBubble.offsetTop
  $tweetBubble.style.opacity = 1
  setTimeout(function () {
    $tweetBubble.style.opacity = 0
    setTimeout(function () {
      $tweetBubble.style.display = 'none'
    }, 500)
  }, 3000)
}

function notTweetedToday(timeStr) {
  var time = parseInt(timeStr, 10)
  var hr18 = 6.48e7
  var now = Date.now()
  if (now - time > hr18) {
    return true
  }

  return false
}

function hideHome() {
  $homeScreen.style.display = 'none'
}

function randomEndText() {
  var res = endGameTexts[endGameIndex]
  endGameIndex++
  endGameIndex %= endGameTexts.length
  return res
}

function showEnd(score, newHigh) {
  score = score || 0
  $score.innerHTML = (newHigh ? 'New High Score: ' : 'Score: ') + score
  $score.style.fontSize = CWIDTH / 20 + 'px'

  $best.style.fontSize = CWIDTH / 30 + 'px'

  $tweetScore.href = 'https://twitter.com/intent/tweet?url=http%3A%2F%2Ffuco.zolmeister.com&amp;text=I%20got%20' + score + '%20points%20in%20FUCO,%20YEAH!!!&amp;hashtags=fuco'

  if (!newHigh) {
    $best.innerHTML = 'Best: ' + localStorage.highScore || 0
  }

  $endScreen.style.display = 'block'

  $endText.innerHTML = score < 100 ? 'Are you even trying?' : randomEndText()
  $endText.style.fontSize = CWIDTH / 20 + 'px'
  $endText.style.marginTop = CHEIGHT / 2 - CHEIGHT / 6 + 'px'

  $playAgain.style.marginTop = CHEIGHT / 20 + 'px'
  $playAgain.style.width = CWIDTH / 2 + 'px'
  $playAgain.style.height = CWIDTH / 7 + 'px'
  $playAgain.style.fontSize = CWIDTH / 20 + 'px'

  $bird[1].style.opacity = 1

  setTimeout(function () {
    $playAgain.style.opacity = 1

    $bird[1].style.opacity = 1
  },100)
}

function hideEnd() {
  $endScreen.style.display = 'none'
}

function start() {
  hideHome()
  hideEnd()
  showGame()
  newGame()
}

function showGame() {
  canv.style.visibility = 'visible'
}

function hideGame() {
  canv.style.visibility = 'hidden'
}

function simulatePathDrawing(path, i) {
  //var path = document.querySelector('.squiggle-animated path');
  var length = pathLengths[i]
  // Clear any previous transition
  path.style.transition = path.style.WebkitTransition = 'none';
  // Set up the starting positions
  path.style.strokeDasharray = length + ' ' + length
  path.style.strokeDashoffset = length
  // Trigger a layout so styles are calculated & the browser
  // picks up the starting position before animating
  path.getBoundingClientRect()
  // Define our transition
  path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 1.25s ease-in-out'
  // Go!
  path.style.strokeDashoffset = '0'
  path.style.strokeWidth = '2px'
}
