(function() {

  //------------------------------
  // Constants
  //------------------------------

  var RE_LOCALHOST = /^localhost|(127|192)[\.\d+]+$/i;
  var RE_DOMAIN = /^http(?:s)?:\/\/([\w\.-]+)/i;
  var RE_TRUSTED = /^moonlander.scalingo.io$/i;

  var READY_MESSAGE = 'moonlander:ready';
  var GAME_REMOTE = 'http://moonlander.scalingo.io';
  var GAME_LOCAL = '//' + window.location.hostname + ':3000';

  //------------------------------
  // Variables
  //------------------------------

  var local = RE_LOCALHOST.test(window.location.hostname);
  var gameURL = local ? GAME_LOCAL : GAME_REMOTE;
  var loader = document.getElementById('loader');
  var frame = document.createElement('iframe');
  var logo = document.getElementById('logo');
  var game = document.getElementById('game');

  var animationReady = false;
  var frameReady = false;

  //------------------------------
  // Methods
  //------------------------------

  function init() {
    
    listenForMessage();

    setTimeout(function() {
      animationReady = true;
      embedGame();
    }, 2000);

    setTimeout(function() {
      loader.classList.add('show');
      logo.classList.add('show');
    }, 250);
  }

  function checkReady() {

    if (animationReady && frameReady) {
      
      loader.classList.remove('show');
      logo.classList.remove('show');
      game.classList.add('show');
      
      setTimeout(function() {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 3000);
    }
  }

  function listenForMessage() {

    window.addEventListener('message', function(event) {

      var message = event.data;
      var origin = event.origin;
      var domain = origin.match(RE_DOMAIN);

      if (domain) {

        var trusted =
          RE_LOCALHOST.test(domain[1]) ||
          RE_TRUSTED.test(domain[1]);

        if (trusted && message === READY_MESSAGE) {
          console.log('iframe ready');
          frameReady = true;
          checkReady();
        }
      }
    }, false);
  }

  function embedGame() {

    console.log('embed game');

    game.appendChild(frame);

    frame.classList.add('frame', 'fill');
    frame.height = '100%';
    frame.width = '100%';

    frame.onload = function(event) {
      console.log('iframe loaded');
      ga('send', 'event', 'embed', 'loaded', gameURL);
    };

    ga('send', 'event', 'embed', 'load', gameURL);
    frame.src = gameURL;
  }
  
  //------------------------------
  // Bootstrap
  //------------------------------  

  init();

})();
