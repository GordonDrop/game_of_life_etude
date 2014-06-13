var GAME = (function ( GAME ){
    // neighboursAmount optimize
    //          => look for ways to replace FORs
    //          => look for ways to replace _.isUndefined

    var self = GAME.calc = GAME.calc || {};
    GAME.matrix = [];

    self.getMatrix = function() {
        return GAME.matrix;
    };

    self.setMatrix = function( mArray ) {
        return GAME.matrix = mArray;
    };

    self.clearMatrix = function () {
        return GAME.matrix = [];
    };

    self.initMatrix = function ( width, height, isRandom ) {
        isRandom = isRandom || false;
        var newMatrix = [];
        var i, j;
        var cell = 0;

        for ( i = 0; i < height; i += 1 ) {
            newMatrix[i] = [];
            for ( j = 0; j < width; j += 1 ) {
                newMatrix[i][j] = ( isRandom ) ? Math.floor( Math.random() * 2 ) :  cell;
            }
        }
        return self.setMatrix( newMatrix );
    };

    self.updateData = function() {
        var m = self.getMatrix();
        var neighbours;
        var nextStatus;
        var newMatrix = [];

        _.each( m, function (v, k) {
            newMatrix[k] = [];
            _.each( v, function ( value, key ) {
                neighbours = self.neighboursAmount( k, key, m );
                nextStatus = self.nextCellStatus( m[k][key], neighbours );
                newMatrix[k][key] = ( nextStatus ) ? 1 : 0;
            })

        })
        return self.setMatrix( newMatrix );
    };

    self.nextCellStatus = function( cell, neighbours ) {
        var status;
        if ( neighbours < 2 ) {
            status = false;
        } else if ( neighbours > 3 ) {
            status = false;
        } else if ( neighbours === 2 ) {
            status = cell;
        } else if ( neighbours === 3 ) {
            status = true;
        }

        return status;
    };

    self.neighboursAmount = function( cellY, cellX, mArray ) {
        var dy = dx = 0;
        var cnt = 0;

        for( var diffY = -1; diffY < 2; diffY += 1 ) {
            dy = cellY + diffY;
            if ( _.isUndefined(mArray[dy]) ) continue;

            for( var diffX = -1; diffX < 2; diffX += 1 ) {
                dx = cellX  + diffX;
                // check if key out of the array range,
                // dead or it has ke Y, key X
                if ( _.isUndefined(mArray[dy][dx]) || ( diffX == 0 && diffY == 0 )) continue;
                if ( mArray[dy][dx] === 1 ) cnt++;
            }
        }
        return cnt;
    };
    return GAME;
}( GAME || {} ));