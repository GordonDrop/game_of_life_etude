var GAME = (function ( GAME ){
    var self = GAME = GAME || {};

    self.options = {
        elem: '',
        exampleElem: 'example-list',
        uiElem: 'ui',
        rows: '50',
        cols: '50'
    };

    self.initGame = function ( elem ) {
        self.options.elem = document.getElementById( elem );
        self.calc.initMatrix( self.options.rows, self.options.cols );
        self.draw.render( self.options.elem );
        self.showExample( self.options.exampleElem );
        self.delegateEvents( self.options.uiElem );
    };

    self.loop = function () {
        self.request = requestAnimationFrame( self.loop );
        self.calc.updateData();
        self.draw.render( self.options.elem );
    };

    self.delegateEvents = function ( elem ) {
        var elemUi = document.getElementById( elem );

        elemUi.onclick = function(e) {
            e.preventDefault();
            var event = e || window.event;
            var target = event.target;
            var action = target.getAttribute( 'data-action' );

            if ( action ) self[action]();
        }
    };

    self.createRandom = function () {
        self.pause();
        self.calc.initMatrix( self.options.rows, self.options.cols, true );
        self.draw.render( self.options.elem );
    };

    self.play = function () {
        self.loop();
    };

    self.pause = function () {
        cancelAnimationFrame(self.request)
    };

    self.showExample = function ( elem ) {
        var elemUi = document.getElementById( elem );

        elemUi.onclick = function(e) {
            e.preventDefault();
            self.pause();
            var event = e || window.event;
            var target = event.target;
            var name = target.getAttribute( 'data-name' );

            if ( name ) {
                GAME.calc.setMatrix( examples[name] );
                GAME.draw.render( self.options.elem );
            }
        }
    };
    return GAME;
}( GAME || {} ));