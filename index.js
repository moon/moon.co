(function() {

  var url = 'http://moonlander.meteor.com/';
  var frame = document.querySelector('.frame');
  var iframe = document.createElement('iframe');

  frame.appendChild(iframe);

  iframe.onload = function(event) {

    ga('send', 'event', 'embed', 'loaded', url);

    frame.classList.add('show');

  };

  ga('send', 'event', 'embed', 'load', url);

  iframe.src = url;

})();
