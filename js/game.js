// Contents
// 1. Grid
// 2. Display

// TODO:
// 1. refuck to proto???
// 2. add options to change speed of animation, menu of examples and options to pause, choose random
// 3. add canvas
// 4. function to detect stable generations or dead worlds

function makeGrid( width, height, isRandom ) {
    var grid = [];

    for ( var y = 0; y < width; y++ ) {
        var gridLine = [];
        for( var x = 0; x < height; x++ ) {
            var cell = isRandom ?  Math.random() < 0.3 : false;
            gridLine.push( cell ) ;
        }
        grid.push( gridLine );
    }
    return grid;
}

function nextGen( grid ) {
    var newGrid = [];

    for ( var y = 0; y < grid.length; y++ ) {
        var line = grid[y], gridLine = [];
        for( var x = 0; x < line.length; x++ ) {
            var neighborsCnt = countNeighbors( x, y, grid );
            var cell = isAlive( neighborsCnt, line[x] );
            gridLine.push( cell );
        }
        newGrid.push( gridLine );
    }
    return newGrid;
}

function countNeighbors( x, y, grid ) {
    var cnt = 0;
    var dy = y - 1;

    for ( var i = 0; i < 3; i++, dy++ ) {
        var line = grid[dy], dx = x - 1;
        if ( !line ) continue;
        for( var j = 0; j < 3; j++, dx++ )
            if( ( dx !== x || dy !== y ) && line[dx] ) cnt++;
    }
    return cnt;
}

function isAlive( neighbors, cell ) {
    var status;
    if ( cell )
        status = ( neighbors === 2 || neighbors === 3 );
    else
        status = ( neighbors === 3 );
    return status;
}

function isStable() {

}

// Display
function element( tagName, className ) {
    var element = document.createElement( tagName );
    if ( className ) element.className = className;
    return element;
}

function drawFrame( parent, grid ) {
    var wrap = document.getElementById( parent );
    var gridTable = element( 'table' );

    grid.forEach( function( gridLine ) {
        var tableRow = element( 'tr' );
        gridTable.appendChild( tableRow );

        gridLine.forEach( function( cell ) {
            var className = cell ? 'alive' : '';
            tableRow.appendChild( element( 'td', className ) );
        })
    });
    wrap.appendChild( gridTable );
}

function clearFrame( parent ) {
    document.getElementById( parent ).innerHTML = '';
}

function runAnimation( fps, frameFunc ) {
    var fpsInterval = 1000 / fps;
    var now, deltaTime ,then = Date.now();
    var stop = false;

    function frame() {
        now = Date.now();
        deltaTime = now - then;

        if ( deltaTime > fpsInterval ) {
            stop = frameFunc() === false;
            then = now - ( deltaTime % fpsInterval );
        }
        if( !stop )
        requestAnimationFrame( frame );
    }
    requestAnimationFrame( frame );
}

function runGame( grid, fps ) {
    var grid = grid || makeGrid( 50, 50 );
    var fps = fps || 30;
    var pause = true;

    function animation() {
        // !!! HARDCODE
        clearFrame( 'game' );
        drawFrame( 'game', grid );
        grid = nextGen( grid );
        if ( pause ) return false;
    }
    runAnimation( fps, animation );
}
runGame( gliderGun, 4 );