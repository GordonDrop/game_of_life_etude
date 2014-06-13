// requestAnimation polyfill
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback, element){
        window.setTimeout(callback, 1000 / 60);
    };
})();

// Fix javascript Modulo
// Example: -1 % 3 = 2
function mod ( m, n ) {
    return (( m % n ) + n ) % n;
}
