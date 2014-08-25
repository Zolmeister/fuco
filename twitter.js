window.twttr = (function (d,s,id) {
  var t, js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
  js.src="https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
  return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
}(document, "script", "twitter-wjs"));


twttr.ready(function (twttr) {
  twttr.events.bind('tweet', function (intentEvent) {
    if (!intentEvent) return

    var lastTweet = localStorage.lastTweet || '0'
    if (!notTweetedToday(lastTweet)) return
    // grant crystal
    grantCrystals()
  })
})
