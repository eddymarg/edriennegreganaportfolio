var velocity = 0.1;
var maxMove = 50;

    function update(){ 
        var pos = window.scrollY; 
        var img = document.querySelector('.mockup');
        var move = Math.min(pos * velocity, maxMove)
        img.style.transform = 'translateY(' + (-20 + move) + 'px)';
    }

window.addEventListener('scroll', update);