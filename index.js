(function() {

    var el = document.querySelector('.space');
    var bg = new Image();
    
    bg.onload = function() {
        el.style.backgroundImage = 'url(' + bg.src + ')';
        el.className += ' animate';
    };

    bg.src = 'nebula.jpg';

})();