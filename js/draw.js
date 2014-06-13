var GAME = (function ( GAME ){
    var self = GAME.draw = GAME.draw || {};

    self.render = function( elem ) {
        var m = GAME.calc.getMatrix();
        var html = '<table id=field cellspacing=0>';

        _.each( m, function ( value ) {
            html +=  '<tr>';

            _.each( value, function ( v ) {
                html += ( v ) ? '<td class=alive></td>' : '<td></td>' ;
            });
            html +=  '</tr>';
        });
        html += '</table>';

        return elem.innerHTML = html;
    };

    return GAME;
}( GAME || {} ))